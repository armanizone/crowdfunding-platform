import React  from 'react'
import { Link } from 'react-router-dom'
import { loggedIn, User, logIn } from '../service/Auth.js';
import Settings from './Settings'
import { FiMenu } from 'react-icons/fi'

import { Button } from '@mantine/core';

const logoCpnet = (process.env.MIX_APP_URL + '/images/cpnetLogo.png')
const logoCpnetMobile = (process.env.MIX_APP_URL + '/images/cpnetLogo-mobile.png')

const NavBar = ({noti}) => {

  const [menu, setMenu] = React.useState(false)


  const styles = {
    header: 'shadow-sm bg-white',
    headerInner: 'flex justify-between items-center gap-x-4',
    headerBlock1: 'flex items-center gap-x-5 py-4',
    headerBlock2: 'flex items-center gap-x-3',
    headerLink: 'font-body text-lg hover:text-red-400 transition-colors duration-100 whitespace-nowrap hidden md:block',
    mobileLink: 'font-body text-lg hover:text-red-400 transition-colors duration-100 whitespace-nowrap block md:hidden',
    headerCreate: 'font-body text-lg text-red-400 hover:text-blue-400 transition-colors duration-100 whitespace-nowrap hidden md:block',
    mobileCreate: 'font-body text-lg text-red-400 hover:text-blue-400 transition-colors duration-100 whitespace-nowrap block md:hidden',
    headerDivider: 'h-full border-l-gray',
    logo: 'max-w-40 max-h-10 object-cover object-bottom',
    divider: 'border-l-gray-200 border h-full py-4 mx-2 hidden md:block',
    burger: 'block md:hidden text-2xl',
    menu: 'flex flex-col gap-y-2 pb-2 '
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerInner}>
          <div className={styles.headerBlock1}>
            <Link to= "/" className="hidden md:block">
              <picture>
                <source media="(max-width: 500px)" srcSet={logoCpnetMobile}/>
                <img src={logoCpnet} className={styles.logo}/>
              </picture>
            </Link> 
            <span className={styles.burger} onClick={e => setMenu(menu => !menu)}>
              <FiMenu/>
            </span>
            <Link to="/how-it-works" className={styles.headerLink} >Как это работает</Link>
            <Link to= "/all-projects" className={styles.headerLink}> Все проекты</Link>
            <Link to= "/all-projects" className={styles.headerLink}> Новости</Link>
          </div>
            <Link to= "/" className="block md:hidden">
              <picture>
                <source media="(max-width: 500px)" srcSet={logoCpnetMobile}/>
                <img src={logoCpnet} className={styles.logo}/>
              </picture>
            </Link> 
          <div className={styles.headerBlock2}>
            <Link to="/create-project" className={styles.headerCreate}>Создать проект</Link>
            <div className={styles.divider}></div>
            {loggedIn() ? 
              <Settings 
                noti={noti ?? []}
              />
              :
                <Link to="/login" className={styles.headerLink}>Войти</Link>
            } 
          </div>
        </div>  
        {menu && (
          <nav className={styles.menu}>
            <Link to="/create-project" className={styles.mobileCreate}>Создать проект</Link>
            <Link to="/how-it-works" className={styles.mobileLink} >Как это работает</Link>
            <Link to="/all-projects" className={styles.mobileLink}> Все проекты</Link>
            <Link to="/login" className={styles.mobileLink}>Войти</Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default NavBar


