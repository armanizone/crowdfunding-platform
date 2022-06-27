import React, { useState, useEffect } from 'react'
import HttpService from '../../service/HttpService'
import { Link, useHistory } from 'react-router-dom'
import Stuff from "../../modules/Stuff"

import { BsArrowLeft } from 'react-icons/bs'
import useForm from "./useForm"

import { styles } from "./Login"
import { TextInput, Button, LoadingOverlay } from "@mantine/core"

const ForgotPassword = () => {

  const history = useHistory()

  const { sendToEmail, values, handleChange, errors, loading } = useForm()

  return (
    <>
    <div className={styles.login}>
      <div className="container">
        <div className={styles.loginInner}>
          <LoadingOverlay visible={loading} />
          <div className={styles.heading}>
            <h1>Восстановление</h1>
          </div>
            {values.send
              ? 
                <div className="text-center"> 
                  <p>Восстановление отправлено на почту</p>
                  <span className="link">
                    {values.email}
                  </span>
                </div>
              : 
                <form onSubmit={sendToEmail}>
                  <div className={styles.loginField}>
                    <TextInput 
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Введите свою почту"
                      value={values.email}
                      onChange={handleChange}
                      size="md"
                      label="Почта"
                      error={errors.email?.[0] || errors.other?.[0]}
                    />
    
                  </div>
                  <div className={styles.buttonField}>
                    <Button type="submit" className={styles.loginGradient} fullWidth loading={loading}>
                      Восстановить
                    </Button>
                  </div>
                  <div className={styles.loginInfo}>
                    <div className="inline">
                      <p className="link inline-flex items-center justify-center" onClick={e => history.goBack()}>
                        <span>
                          <BsArrowLeft/> 
                        </span>
                        <span>Назад</span>
                      </p>
                    </div>
                  </div>
                </form>
            }
        </div>
      </div>
    </div>
      {/* <div className="reg__inner">
        <div className="reg">
          <form className="regform">
            <div className="reg-line3">
              <hr style={{
                border: 'black solid 1px',
                marginLeft: '15px',
                marginRight: '15px',
              }}/>

              <h1>Восстановление</h1>
            </div>

            {emailSent ? (
              <div className="reset-password-message">Восстановление пароля отправлено на почту {email}.</div>
            ) : (
              <div>
                <div className="regform-inputs">
           
                </div>

                <div className="form-create">
                    <button className="form-input-btn" type="button" onClick= {reset}>
                      Восстановить
                    </button>

                    <span className="form-input-login">
                      <br/> Еще не зарегистрированы? " 
                      <Link to= "/registration">
                          Зарегистрироваться
                      </Link>".
                    </span>
                </div>
              </div>
            )}

            {loading ? <Stuff.Loading/> : null}
          </form>
        </div>
      </div> */}
    </>
  )
}

export default ForgotPassword
