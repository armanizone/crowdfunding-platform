import React from 'react'

import MainService from "../service/MainService";

import { MdBookmark } from 'react-icons/md'
import { Loader } from "@mantine/core";

import "../../sass/settings/notifications.scss"
import { Stuff } from "../modules";



function MyNotifications () {

  const [notifications, setNotifications] = React.useState([])
  const [loader, setLoader] = React.useState(false)

  React.useEffect(e => {
    fetchData()
    MainService.readNoti()
  }, [])

  const fetchData = async e => {
    await MainService.getNotiByUser()
    .then(e => {
      setNotifications(e.data)
      setLoader(true)
    })
  }

  const styles = {
    notifications: 'w-full my-6',
    notificationsInner: 'bg-border'
  }

  return (
    <div className={styles.notifications}>
      <div className="container">
        {loader ? 
          notifications.length < 1 ? 
          <div className="bg-border w-full h-96 flex justify-center items-center">
            <p>У вас еще нет уведомлений</p>
          </div>
          :
          <div className={styles.notificationsInner}>       
            <div className="notification-inner">
              {notifications.map(not => {
                const date = new Date(not.created_at)
                return (
                  <div className="user-notifications" key={not.id}>
                    <div className="notification shadow-md hover:bg-slate-50 transition-all duration-100" >
                      <div className="notification_title">
                        <i><MdBookmark/></i> 
                      </div>
                      <div className="notification_main">
                        <div className="notification_title">
                          <p>{not.title} <span>{date.toLocaleString().slice(0,10)}</span></p>
                        </div>
                        <div className="notification_body">
                          <p>{not.definition}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        :
          <Stuff.Loaded/>
        }     
      </div>
           
    </div>
  )
}

export default MyNotifications
