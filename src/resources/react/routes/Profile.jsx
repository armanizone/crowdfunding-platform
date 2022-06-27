import React from "react";

import { api } from "../service/Auth";
import HttpService from "../service/HttpService";
import MainService from "../service/MainService";
import Storage from "../service/Storage";

import { Stuff } from "../modules";

import { AiFillEye } from 'react-icons/ai'
import { GoVerified } from 'react-icons/go'
import { BsFillExclamationOctagonFill } from 'react-icons/bs'

import { Cities } from "../modules";
import { Button, LoadingOverlay, Select, TextInput, Modal, Dialog, Group, Alert, PasswordInput, Loader } from "@mantine/core";

import { changePasswordSchema, profileSchema } from "../service/Validation";
import { showNotification } from "@mantine/notifications";

import { AiOutlineCheck, AiOutlineExclamation } from 'react-icons/ai'



const defaultAvatar = (process.env.MIX_APP_URL + '/images/default-avatar.jpg')

const styles = {
  profile: 'my-6 w-full',
  profileInner: 'grid grid-cols-1 md:grid-cols-[220px_1fr_20%] bg-border',
  avatar: 'font-body',
  avatarAction: '',
  img: 'rounded-xl object-cover w-full',
  edit: 'md:px-6',
  inputContainer: 'mb-4',
  input: 'text-sm outline-gray-300 focus:outline-blue-400 outline-1 transition-all duration-150 bg-slate-50',
  passwordChange: '',
  editButtons: 'flex justify-between items-center my-8 flex-wrap gap-3',
  passwordIcon: 'text-xl',
  savePasswordBtn: 'flex justify-center mt-8',
}

import Notify from "../service/Notify";

function Profile() {

  const {success, error} = Notify()

  const [user, setUser] = React.useState(Storage.get('user') ?? {})

  const [profile, setProfile] = React.useState(
    user ?? {
      id: null,
      city_id: '' || 1,
      name: '',
      image: '',
      email: '',
      telephone: '',
    }
  );

  const [loading, setLoading] = React.useState({
    profile: false,
    password: false,
    verify: false,
    layout: false,
  })

  const handleLoading = (name, value) => {
    setLoading({...loading, [name]: value})
  }

  const [errors, setErrors] = React.useState({
    name: [],
    number: [],
    image: [],
    password: [],
  })

  const handleErrors = (name, value) => {
    setErrors({...errors, [name]: value})
  }


  const [image, setImage] = React.useState()
  const img = new FormData()

  React.useEffect(e => {
    img.append('image', image)
  }, [image])


  const [clearImg, setClearImg] = React.useState()

  const submit = async () => {
    handleLoading('profile', true)
    MainService.userInformation({
      id: profile.id,
      city_id: profile.city_id || 1,
      name: profile.name,
      email: profile.email,
      telephone: profile.telephone,
    })
    .then(e => {
      MainService.userImage(img)
      .then(e => {
        handleLoading('profile', false)
        if (e.data !== "") Storage.set('user', {...profile, image: e.data})
        success("Изменение профиля", "Профиль изменен успешно!")
      })
      .catch(e =>{
        handleLoading('profile', false)
        if (e.response.status == 413) {
          setClearImg(null)
          error("Изменение профиля", "Ошибка! изображение слишком большое")
        }
      })
    })
    .catch(e => {
      console.log(e);
      handleLoading('profile', false)
    });
  }

  const yupErrorToErrorObject = (err, name) => {
    const object = {};
    err.inner.forEach((x) => {
      if (x.path !== undefined) {
        object[x.path] = x.errors;
      }
    });
    return setErrors({...errors, [name]: object});
  }

  React.useEffect(e => {
    if (user) {
      handleLoading('layout', true)
    }
  }, [user, profile])

  return (
    <div className={styles.profile}>
      <div className="container">
      <LoadingOverlay visible={loading.profile} />
        {loading.layout
          ?
            <div className={styles.profileInner}>
              <Avatar 
                profile={profile}
                setProfile={setProfile}
                image={image}
                setImage={setImage}
                loading={loading}
                errors={errors}
                handleErrors={handleErrors}
                handleLoading={handleLoading}
                yupErrorToErrorObject={yupErrorToErrorObject}
                clearImg={clearImg}
                />
              <ProfileEdit 
                profile={profile}
                setProfile={setProfile}
                submit={submit}
                errors={errors}
                loading={loading}
                handleErrors={handleErrors}
                handleLoading={handleLoading}
                yupErrorToErrorObject={yupErrorToErrorObject}
                />
              <Info 
                profile={profile}
                handleLoading={handleLoading}
                loading={loading}
                />
            </div> 
          : 
            <Stuff.Loaded/>
        }
      </div>
    </div>  
  )
}

const Avatar = ({profile, image, setImage, clearImg}) => {

  const [preview, setPreview] = React.useState(clearImg);
  const fileInputRef = React.useRef();

  React.useEffect(e => {
    setPreview(clearImg)
  }, [clearImg])

  React.useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } 
    else {
      setPreview(null)
    }
  }, [image]);

  const handleImageChange = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  }

  const handleChange = e => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else setImage(null);
  }

  return (
    <div className={styles.avatar}>
      <img src={preview || profile.image || defaultAvatar} className={styles.img} alt=""/>
      <div className={styles.avatarAction}>
        <input 
          type="file" style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/*"
          onChange={handleChange}
          />
        <div className="text-center mt-2">
          <p className="text-xs text-stone-500">размер не более 1мб</p>
          <Button onClick={handleImageChange} variant="subtle" compact >
            Загрузить
          </Button>
        </div>
      </div>
    </div>
  )
}
const ProfileEdit = ({profile, setProfile, submit, errors, loading, handleErrors, handleLoading, yupErrorToErrorObject}) => {

  const {success} = Notify()

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const [password, setPassword] = React.useState({
    current_password: '',
    password: '',
    password_confirmation: '' 
  })

  const [state, setState] = React.useState({
    visible: false,
    label: 'Изменить пароль',
    type: 'password'
  })

  const changePassword = async (password) => {
    handleLoading('password', true)
    console.log(password);
    const val = changePasswordSchema.validate(password, {abortEarly: false})
    val.then(e => {
      handleErrors('password', [])
      MainService.changePassword(password)
      .then(e => {
        console.log(e);
        handleLoading('password', false)
        setTimeout(e => {
          setPassword({})
          setState({...state, visible: false, label: 'Изменить пароль'})
        }, 100)
        success("Изменение пароля", "Пароль упешно изменен")
      })
      .catch(e => {
        if(e.response.data.errors.current_password[0] === 'The provided password does not match your current password.') {
          handleErrors('password', {other: ['Неверный пароль']})
        }
        handleLoading('password', false)
        console.log(e);
      })
    })  
    .catch(e => {
      yupErrorToErrorObject(e, 'password')
      handleLoading('password', false)
      console.log(e);
    })
  }

  const togglePassword = e => {
    if (state.visible) {
      setState({...state, label: 'Изменить пароль', visible: false})
      return
    }
    setState({...state, label: 'отмена', visible: true})
    handleErrors('password', [])
  }

  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
    handleErrors('password', [])
  }

  const cities = Storage.get('cities').map(city => {
    return {label: city.name, value: city.id}
  }) ?? []


  return (
    <form className={styles.edit}>
      <div className={styles.inputContainer}>
        <TextInput 
          name="name"
          type="text"
          value={profile.name || ''}
          onChange={handleInputChange}
          placeholder="Имя пользователя"
          label="Имя"
          size="md"
          radius="md"
          classNames={{
            input: styles.input
          }}
        />
      </div>
        {/* <div style={{color: "red", marginBottom: '10px'}}>{nameError}</div> */}

      <div className={styles.inputContainer}>
        <Select
          name="city_id"
          onChange={e => setProfile({...profile, city_id: e})}
          data={cities}
          placeholder={cities[profile.city_id - 1]?.label}
          size="md"
          radius="md"
          classNames={{
            input: styles.input,
            item: 'text-sm'
          }}
          label="Город"
        />
      </div>

      <div className={styles.inputContainer}>
        <TextInput
          name="email"
          type="text" 
          value={profile.email || ''}
          onChange={handleInputChange}
          placeholder="Почта"
          label="Email"
          size="md"
          readOnly
          radius="md"
          classNames={{
            input: styles.input
          }}
        />
      </div>

      <div className={styles.inputContainer} >
        <TextInput
          name="telephone"
          type="text" 
          value={profile.telephone || ''}
          onChange={handleInputChange}
          placeholder="Телефон"
          size="md"
          radius="md"
          classNames={{
            input: styles.input
          }}
          label="Номер телефона"
        />
      </div>  

      <div className={styles.passwordChange}>
        <div className={styles.editButtons}>
          
          <Button type="button" onClick={submit} className="r-gradient text-sm sm:text-base">
            Сохранить изменения
          </Button>
      
          <div 
            className="link text-sm sm:text-base"
            onClick={togglePassword}>
            <span>{state.label}</span> 
          </div>
    
        </div> 
        {state.visible && (
          <div className="relative mb-6 sm:mb-0">
            <LoadingOverlay visible={loading.password} />
            <div className={styles.inputContainer}>
              <PasswordInput
                placeholder="Введите пароль"
                name="current_password"
                value={password.current_password || ''}
                onChange={handlePasswordChange}
                size="md"
                classNames={{
                  input: styles.input
                }}
                label="Текущий пароль"
                error={errors.password?.current_password?.[0] || errors.password?.other?.[0]}
                required
                />
            </div>
            <div> 
              <div className={styles.inputContainer}>
                <PasswordInput 
                  placeholder="Введите пароль"
                  name="password"
                  value={password.password || ''}
                  onChange={handlePasswordChange}
                  size="md"
                  classNames={{
                    input: styles.input
                  }}
                  label="Новый пароль"
                  error={errors.password?.password?.[0]}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <PasswordInput 
                  placeholder="Повторите пароль" 
                  name="password_confirmation"
                  value={password.password_confirmation || ''}
                  onChange={handlePasswordChange}
                  size="md"
                  classNames={{
                    input: styles.input
                  }}
                  label="Подтверждение пароля"
                  error={errors.password?.password_confirmation?.[0]}
                  required
                /> 
              </div>
            </div>

            <div className={styles.savePasswordBtn}>
              <Button type="button" className="b-gradient" onClick={e => changePassword(password)} >
                Сохранить пароль
              </Button>
            </div>
          </div>
          ) 
        }
        </div>
    </form>
  )
}

const Info = ({profile, handleLoading, loading}) => {

  const [random, setRandom] = React.useState({
    first: Math.round(Math.random() * 101),
    second: Math.round(Math.random() * 11)
  })
  const [answer, setAnswer] = React.useState('')

  const equal = random.first + random.second
 
  const [state, setState] = React.useState({
    sended: Storage.get('verification'),
    verificated: false,
    bought: false,
  })

  const verification = () => {
    if (equal != answer) return

    const now = new Date()
    const item = {
      value: 'sendAgain',
      expiry: now.setHours(now.getHours() + 1)}
    if (!state.sended) {
      handleLoading('verify', true)
      api().post('api/email/verification-notification')
      .then(e =>{
        handleLoading('verify', false)
        Storage.set('verification', item)
        setState({...state, sended: Storage.get('verification')})
      })
      .catch(e =>{
        console.log(e.response)
        handleLoading('verify', false)
      })
    }
  }

  function checkVerify() {
    if (!state.sended) return 
    const now = new Date()
    const expiry = Math.round((state.sended.expiry - now.getTime()) / (1000 * 60))
    if (now.getTime() > state.sended.expiry) {
      localStorage.removeItem('verification')
    }
    return expiry
  }
  
  React.useEffect(() => {
    checkVerify()
  }, [])

  const [verifyModal, setVerifyModal] = React.useState(false)

  React.useEffect(() => {
    if (profile?.email_verified_at) setState({...state, verificated: true})
  }, [profile])

  return (
    <>
      <div className="">
        {state.verificated ?
          <div>
            <h2 className="flex items-center mb-4">
              <span className="mr-2 text-green-400">
                <GoVerified/>
              </span>
              <span className="font-medium font-head text-lg sm:text-xl">
                Верифицирован 
              </span>
            </h2>

            <div className="flex items-center">
              <h2 className="mr-2">Обучение:</h2>
              {state.bought ?
                <div className="bought">
                  доступно
                </div>
                : 
                <div>
                  <span className="none-bought">
                    недоступно
                  </span> 

                  {/* <Button type="button">
                    разблокировать
                  </Button> */}
                </div>
              }
            </div>
          </div>
          : 
          <div className="profile-none-verified">
            <h5 className="flex items-center mb-4">
              <span className="mr-2 text-red-400">
                <BsFillExclamationOctagonFill/>
              </span>
              <span className="font-medium font-head text-lg sm:text-xl">
                Не верифицирован 
              </span> 
            </h5>
            <p className="text-sm text-gray-400 font-body">
              (ссылка верификации была отправлена на почту <span className="link">{profile.email}</span>, пожалуйста проверьте почту) 
              (не получили письмо? можете отправить повторно)  
              <Button variant="subtle" compact onClick={e => setVerifyModal(v => !v)}>
                 Отправить
              </Button>.
            </p>
          </div> 
        }
      </div>
      <Dialog
        opened={verifyModal}
        withCloseButton
        onClose={e => setVerifyModal(false)}
        className="w-full sm:w-[400px] ml-3"
        size="lg"
        radius="md"
      >
        <LoadingOverlay visible={loading.verify}/>
        {state.sended 
          ? 
            <div className="text-sm sm:text-base">
              <p>Письмо было отправлено на почту <span className="link">{profile.email}</span>, если вы не получили письмо пожалуйста проверьте "спам".</p>
              Отправить повторно через <b>{checkVerify()}</b> мин.
            </div>
          :
            <div>
              <div>{`${random.first}+${random.second} = ${answer}`}</div>
              <div className="flex justify-end items-center">
                <TextInput 
                  type="number" 
                  value={answer || ''} 
                  onChange={e => setAnswer(e.target.value)} 
                  radius="md"
                  placeholder={Math.round(Math.random() * 101)}
                  size="md"
                  className="flex-grow mr-3"
                />
                <Button 
                  className="red" 
                  onClick={verification} 
                  type="button" 
                  disabled={equal != answer}>Отправить
                </Button>
              </div>
            </div>
        }
      </Dialog>
    </>
  )
}

export default Profile
