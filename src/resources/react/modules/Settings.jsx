import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import {api, logOut} from '../service/Auth';
import Storage from "../service/Storage";

import { MdAccountCircle } from 'react-icons/md'
import { RiBilliardsLine } from 'react-icons/ri'
import { AiFillCopyrightCircle } from 'react-icons/ai'
import { FaHandshake  } from 'react-icons/fa'
import { FaPowerOff } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { GoVerified } from 'react-icons/go'
import { MdNotifications } from 'react-icons/md'
import { HiDotsCircleHorizontal } from 'react-icons/hi'
import { Avatar, Button } from "@mantine/core";


export default function ({noti}){

  const user = Storage.get('user')

  const history = useHistory()
  const defaultAvatar = (process.env.MIX_APP_URL + '/images/default-avatar.jpg')

  const handleLogOut = () => {
    api().post('/api/logout').then(()=>{
      logOut()
      console.log('Вы теперь не авторизованы!')
      history.push('/')
      history.go(0)
    })
  };

  const notReaded = noti.filter(noti => {
    return noti.read === 0
  })

  const styles = {
    settings: 'relative cursor-pointer p-0 m-0 z-50 whitespace-nowrap font-body transition-transform duration-200 group md:w-52',
    profile: 'flex justify-between items-center',
    profileImg: 'flex items-center',  
    name: 'mr-2 hidden md:block relative font-medium',
    nameBadge: 'absolute -right-10 -top-10',
    avatar: 'mr-2',
    arrowIcon: 'text-lg transition-transform duration-200 rotate-0 group-hover:rotate-180 hidden md:block',
    menu: 'w-56 shadow-lg rounded-md divide-y invisible opacity-0 bg-white list-none absolute -left-[180px] md:-left-5 top-10 z-50 group-hover:visible group-hover:opacity-100 transition-all duration-200 ',
    menuItem: `relative flex items-center px-5 py-2 hover:bg-gray-50 transition-all duration-100`,
    menuLink: 'flex relative items-center text-sm font-medium text-stone-900 leading-7 mx-3',
    menuIcon: 'block text-blue-400 text-xl',
    linkIcon: 'inline-flex items-center justify-center rounded-full bg-gray-300 px-2 py-1 text-xs font-semibold',
  }

  return (
    <div className={styles.settings}>
      <div className={styles.profile}>
        <div className={styles.profileImg}>
          <Avatar src={user.image || defaultAvatar} alt="" size="md" className={styles.avatar} /> 
          <Link to="/profile" className="block md">
            <span className={styles.name}>
              Профиль            
              {notReaded.length > 0 && (
                <span className={styles.nameBadge}><HiDotsCircleHorizontal/></span>
              )
              } 
            </span>
          </Link>
        </div>
        <IoIosArrowDown className={styles.arrowIcon}/>
      </div>
    
      <ul className={styles.menu}>
        <li className={`${styles.menuItem} block md:hidden`}>
          <span className={styles.menuIcon}><MdAccountCircle/></span>

          <Link to="/profile" className={styles.menuLink}>
            <span>
              Мой профиль
            </span>
          </Link> 
        </li>

        <li className={styles.menuItem}>  
          <span className={styles.menuIcon}><RiBilliardsLine/></span>

          <Link to="/bill" className={styles.menuLink}>
            <span>
            Мой счет
            </span>
          </Link> 
          <span className={styles.linkIcon}>{user?.wallet} ед.</span> 
        </li>

        <li className={styles.menuItem}>  
        <span className={styles.menuIcon}><MdNotifications /></span>
          <Link to="/my-notifications" className={styles.menuLink}> 
          <span>
            Мои уведомления
          </span>
          </Link> 
          {true && (
              <span className={styles.linkIcon}>
                {notReaded.length}
              </span>
            )
          }
        </li>

        <li className={styles.menuItem}>
          <span className={styles.menuIcon}><AiFillCopyrightCircle/></span> 

          <Link to="/my-projects" className={styles.menuLink}> 
            <span>
              Мои проекты
            </span> 
          </Link> 
        </li>

        <li className={styles.menuItem}>
          <span className={styles.menuIcon}><FaHandshake/></span> 

          <Link to="/my-investions"  className={styles.menuLink}> 
            <span>
              Мои инвестиции
            </span>  
          </Link> 
        </li>

        <li className={styles.menuItem}>
          <span className={styles.menuIcon}><FaPowerOff/></span> 

          <a className={styles.menuLink} onClick={handleLogOut}>
            <span>
              Выйти
            </span>  
          </a>
        </li>
      </ul>
    </div>
  )
}


