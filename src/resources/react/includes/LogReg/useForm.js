import { showNotification } from "@mantine/notifications";
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { logIn } from '../../service/Auth.js';
import HttpService from '../../service/HttpService.js';
import { forgotPasswordSchema, loginSchema, merged } from "../../service/Validation.js";


import { ImCross } from "react-icons/im";
import { AiOutlineCheck } from 'react-icons/ai' 

const useForm = () => {

  const history = useHistory()
  const [modallActive, setModallActive] = React.useState(false)


  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    send: false
  })

  const [errors, setErrors] = React.useState({
    name: [],
    email: [],
    password: [],
    password_confirmation: [],
    other: []
  })

  const [loading, setLoading] = React.useState(false)

    
  const handleChange = e => {
    const { name, value } = e.target;
    setValues ({...values,[name]: value});
    setErrors({...errors, [name]: null, other: null})
  };

  function login() {
    history.push('/')
    history.go(0)
  }

  React.useEffect(e => {
    if (modallActive) logIn()
  }, [modallActive])

  const yupErrorToErrorObject = (err) => {
    const object = {};
    err.inner.forEach((x) => {
      if (x.path !== undefined) {
        object[x.path] = x.errors;
      }
    });
    return setErrors(object);
  }


  const handleSubmit = (name, e) => {
    e.preventDefault()
    setLoading(true)
    if(name === "reg") {
      const reg = merged.validate(values, { abortEarly: false })
      reg.then(e => {
        HttpService.cookie()
        .then(e => {
          HttpService.apiReg(values)
          .then(response => {
            setLoading(false)
            if (response.status === 201){
              setModallActive(true)}
          }) 
          .catch(error => {
            setLoading(false)      
            if (error.response.data.errors.email == "The email has already been taken.") {
              setErrors({...errors, other: ["Пользователь с такой почтой уже существует"]})
            }
          })
        })
      })
      .catch(e => {
        yupErrorToErrorObject(e)
        setLoading(false)
      })
    }
    if (name === "log") {
      const log = loginSchema.validate({email: values.email, password: values.password}, { abortEarly: false })
      log.then(e => {
        HttpService.cookie()
        .then(e => {
          HttpService.apiLogin(values)
          .then(response => {
            setLoading(false)
            login()
          })
          .catch(error => {
            console.log(error.response);
            setLoading(false)
            if (error.response.data.errors.email == "These credentials do not match our records.") {
              setErrors({...errors, other: ["Неверная почта или пароль"]}) 
            }
          }) 
        })
      })
      .catch(e => {
        yupErrorToErrorObject(e)
        setLoading(false)
      })
    }
  };

  const sendToEmail = (e) => {
    e.preventDefault()
    setLoading(true)
    const res = forgotPasswordSchema.validateAt('email', {email: values.email}, { abortEarly: false })
    res.then(e => {
      HttpService.cookie()
      .then(() => {
        HttpService.forgotPassword({email: values.email})
        .then ((e) => {
          setValues({...values, send: true})
          setLoading(false)
        })
        .catch(e => {
          setLoading(false)
          if (e.response.data.errors.email[0] === "We can't find a user with that email address.") {
            setErrors({...errors, other: ["Не удалось найти пользователя"]})
          }
          // alert(errors[0])
        })
      })
      .catch(e => {
        setLoading(false)
      })
    })
    .catch(e => {
      yupErrorToErrorObject(e)
      setLoading(false)
      console.log(e);
    })
  }

  
  const resetPassword = (token, e) => {
    e.preventDefault()
    setLoading(true)
    const res = forgotPasswordSchema.validate({email: values.email, password: values.password, password_confirmation: values.password_confirmation}, {abortEarly: false})
    res.then(e => {
      HttpService.cookie()
      .then(() => {
        HttpService.resetPassword({
          email: values.email, 
          password: values.password, 
          password_confirmation: values.password_confirmation, 
          token
        })
        .then (e => {
          console.log(e, "reseted");
          setLoading(false)
          showNotification({
            title: 'Изменение пароля',
            message: 'Пароль успешно изменен!',
            color: 'teal',
          })
          history.push("/login")
        })
        .catch(e => {
          setLoading(false)
          console.log(e, "not reseted");
        })
      })
      .catch(e => {
        setLoading(false)
      })
    })
    .catch(e => {
      yupErrorToErrorObject(e)
      setLoading(false)
      console.log(e);
    })
  }
  
  return {
    handleChange, 
    setValues,
    values,
    errors, 
    loading, 
    handleSubmit, 
    setErrors, 
    modallActive, 
    setModallActive,
    login,
    sendToEmail,
    resetPassword,
  }
};

export default useForm;


export const BackButton = e => {

  const history = useHistory()

  return (
    <div className="login-close">
      <span onClick={e => history.goBack()}>
        <ImCross/>
      </span>
    </div>
  )
}
