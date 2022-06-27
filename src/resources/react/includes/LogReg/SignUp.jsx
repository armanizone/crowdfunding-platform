import React from 'react';
import useForm, { BackButton } from './useForm'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { styles } from "./Login";


import { TextInput, Button, Modal, LoadingOverlay, PasswordInput } from "@mantine/core";

const regpng = `${process.env.MIX_APP_URL}/images/register-main.png`

const SignUp = () => {
  const {
  handleChange, 
  values, 
  errors, 
  handleSubmit, 
  loading, 
  modallActive, 
  login, 
} = useForm();


  const btn = React.useRef()

  const loginOnKeyPress = e => {
    if (e.key == 'Enter') btn.current.click()
  }
  
  React.useEffect(e => {
    document.body.addEventListener('keypress', loginOnKeyPress)
    return e => document.body.removeEventListener('keypress', loginOnKeyPress)
  }, [])

  
  return (
    <>
      <div className={styles.login}>
        <div className="container">
          <div className={styles.loginInner}>
            <LoadingOverlay visible={loading}/>
            <div className={styles.heading}>
              <h1>Регистрация</h1>
            </div>
            <form onSubmit={e => handleSubmit("reg", e)}>
              <div className={styles.loginField}>
                <TextInput
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Имя"
                  value={values.name}
                  onChange={handleChange}
                  label="Имя"
                  size="md"
                  error={errors.name?.[0] || errors.name?.[1]}
                />
              </div>
              <div className={styles.loginField}>
                <TextInput 
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  label="Почта"
                  size="md"
                  error={errors.email?.[0]}
                />
              </div>
              <div className={styles.loginField}>
                <PasswordInput 
                  name="password"
                  className="input"
                  placeholder="Пароль"
                  value={values.password}
                  onChange={handleChange}
                  label="Пароль"
                  size="md"
                  error={errors.password?.[0]}
                  />
              </div>
              <div className={styles.loginField}>
                <PasswordInput 
                  name="password_confirmation"
                  className="input"
                  placeholder="Повторите пароль"
                  value={values.password_confirmation}
                  onChange={handleChange}
                  label="Подтверждение пароля"
                  size="md"
                  error={errors.password_confirmation?.[0]}
                />
                {errors?.other && <p className={styles.error}>{errors.other?.[0]}</p>}  
              </div>
              <div className={styles.buttonField}>
                <Button type="submit" fullWidth className={styles.signupGradient} ref={btn}>
                  Создать профиль
                </Button>
              </div>
              <div className={styles.loginInfo}>
                <div className="signup_info">
                  <span>
                    Уже есть аккаунт?  
                  </span> <Link to= "/login" className="link">
                      Войти!
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal 
        opened={modallActive}
        closeOnClickOutside={false}
        closeOnEscape={false}
        centered
        radius="md"
        withCloseButton={false}
      >
        <div className="signup-modall">
          <span className="block mb-3 ">Мы выслали письмо на вашу электронную почту, пожалуйста подтвердите вашу почту, чтобы получить все возможности сайта</span>
          <Button onClick={login} className="blue" fullWidth >
            Подвердить регистрацию
          </Button>
        </div>
      </Modal>
    </>
  )
}
export default SignUp

// className={classNames("form-input",
// {"form-input validate": values.name.length <= 2},
// {"form-input clear": values.name === ""},
// {"form-input good": values.name.length > 2}
// )}

// className={classNames("form-input", 
// {"form-input good": values.email.includes("@mail")},
// {"form-input clear": values.email === ""},
// {"form-input validate": values.email.length <= 2}
// )}

// className={classNames("form-input", 
// {"form-input good": values.password.length >= 8},
// {"form-input clear": values.password === ""},
// {"form-input validate": values.password.length <= 7}
// )}

// className={classNames("form-input", 
// {"form-input good": values.password_confirmation.length >= 8},
// {"form-input clear": values.password_confirmation === ""},
// {"form-input validate": values.password_confirmation.length <= 7}
// )}