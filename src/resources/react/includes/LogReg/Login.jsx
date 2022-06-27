import React from 'react';
import useForm, { BackButton } from './useForm'
import { Link } from 'react-router-dom'


import { Button, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core";

export const styles = {
  login: 'w-full my-6',
  loginInner: 'relative bg-border max-w-[420px] mx-auto',
  loginBody: '',
  heading: 'mb-5 text-xl md:text-2xl lg:text-3xl font-head font-medium text-center',
  loginField: 'mb-4',
  error: 'text-red-400 mt-4',
  loginInfo: 'text-center mt-4',
  buttonField: 'pt-4',
  loginGradient: 'bg-gradient-to-r from-blue-400 to-blue-600',
  signupGradient: 'bg-gradient-to-r from-red-400 to-red-600'
}

const Login = () => {
  const {handleChange, values, errors, handleSubmit, loading } = useForm();

  const btn = React.useRef()

  const loginOnKeyPress = e => {
    if (e.key == 'Enter') btn.current.click()
  }
  
  React.useEffect(e => {
    document.body.addEventListener('keypress', loginOnKeyPress)
    return e => document.body.removeEventListener('keypress', loginOnKeyPress)
  }, [])


  return ( 
    <div className={styles.login}>
      <div className="container">
        <div className={styles.loginInner}>
          <LoadingOverlay visible={loading} />
          <div className={styles.heading}>
            <h1>Войти в профиль</h1>
          </div>
          <form onSubmit={e => handleSubmit("log", e)}>
            <div className={styles.loginField}>
              <TextInput 
                id="email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Почта"
                label="Почта"
                size="md"
                error={errors.email?.[0]}
              />
            </div>
            <div className={styles.loginField}>
              <PasswordInput 
                id="password"
                name="password"
                //  placeholder="Введите ваш пароль"
                value={values.password}
                onChange={handleChange}
                placeholder="Пароль"
                label="Пароль"
                size="md"
                error={errors.password?.[0]}
              />
              {errors.other && <p className={styles.error}>{errors.other?.[0]}</p> } 
            </div>
            <div className={styles.buttonField}>
              <Button type="submit" className={styles.loginGradient} fullWidth ref={btn}>
                Войти
              </Button>
            </div>
            <div className={styles.loginInfo}>
              <div className="signin_info">
                <span>Первый раз тут?</span> <Link to= "/registration" className="link">
                  Зарегистрируйтесь
                </Link>
                <div className="mt-3">
                  <Link to= "/forgot-password" className="link">
                    Забыли пароль?
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
   )
}
export default Login



//  className={classNames("form-input", 
//  {
//    "form-input good": values.email.includes("@mail")
//  },
//  {
//    "form-input clear": values.email === "",
//  },
//  {
//   "form-input validate": values.email.length <= 2, 
//  }
//  )}



// className={classNames("form-input", 
// {
//    "form-input good": values.password.length >= 8
// },
// {
//    "form-input clear": values.password === "",
// },
// {
//    "form-input validate": values.password.length <= 7, 
// }
// )}