import React from 'react';
import { useParams } from 'react-router-dom';
import useForm from './useForm'

import { styles } from "./Login";
import { Button, LoadingOverlay, TextInput } from "@mantine/core";

const ResetPassword = () => {

  const { resetPassword, errors, values, handleChange, loading, setValues} = useForm()

  const { token, email } = useParams();
  
  React.useEffect(e => {
    setValues({...values, email: email})
  }, [email])


  return (
    <>
      <div className={styles.login}>
        <div className="container">
          <div className={styles.loginInner}>
            <LoadingOverlay visible={loading} />
            <div className={styles.heading}>
              <h1>Сброс пароль</h1>
            </div>
            <form onSubmit={e => resetPassword(token, e)}>
              <div className={styles.loginField}>
                <TextInput 
                  type="email"
                  name="email"
                  placeholder="Ваша почта"
                  value={email}
                  readOnly
                  size="md"
                  label="Почта"
                />
              </div>
              <div className={styles.loginField}>
                <TextInput 
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={values.password}
                  onChange={handleChange}
                  size="md"
                  label="Новый пароль"
                  error={errors.password?.[0]}
                />
              </div>
              <div className="login_field">
                <TextInput 
                  type="password"
                  name="password_confirmation"
                  placeholder="Подтверждение пароля"
                  value={values.password_confirmation}
                  onChange={handleChange}
                  size="md"
                  label="Подтверждение пароля"
                  error={errors.password_confirmation?.[0]}
                />
                {errors?.other && (
                  <p className={styles.error}>{errors.other?.[0]}</p>
                )}
              </div>
              <div className={styles.buttonField}>
                <Button type="submit" fullWidth className={styles.loginGradient}>
                  Обновить пароль
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword