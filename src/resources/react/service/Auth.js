import axios from 'axios'
import Cookies from 'js-cookie'


function api() {
  const api = axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: true
  })

  api.interceptors.response.use(response => response, error => {
    const errors = error.response.status 
    if(errors === 401 && loggedIn()) {
      logOut()
    }
      return Promise.reject(error)
  })
  return api
}

function http() {
  const http = axios.create({
    baseURL: "http://localhost:8080/",
  })
  return http
}

const User = async () => {
  let User = await  api().get('/api/user')
  .then(response => {
    return response
  })
  return User
}

const localUser = e => {
  const user = localStorage.getItem('user')
  return JSON.parse(user)
}

const loggedIn = () => {
  const reqCookies = Cookies.get('user_logged_in')
  return !! reqCookies
}


let new_hour = new Date();
new_hour.setHours(new_hour.getHours() + 24);
const expiry = { expires: new_hour, sameSite: 'lax' }

const logIn = async () => {
  Cookies.set('user_logged_in', true , expiry);
  console.log('Cookie установлено успешно')
}

const setUserId = id => {
  Cookies.set('user_id', id, expiry)
}

const userId = e => {
  const user_id = Cookies.get('user_id')
  return user_id
}


const setRole = () => {
  Cookies.set('role', true, expiry)
}

const role = () => {
  const role = Cookies.get('role')
  return !! role
}

const isAdmin = e => {
  const reqCookies = Cookies.get('admin')
  return !! reqCookies
}

const setAdmin = e => {
  Cookies.set('admin', true, expiry)
}


const logOut = () => {
  if (typeof window !== 'undefined') {
    Cookies.remove('user_logged_in')
    Cookies.remove('admin')
    Cookies.remove('user_id')
    Cookies.remove('role')
    localStorage.removeItem('user')
    console.log('Cookie удален')
    document.location.reload()
  }
}

export {
  api, 
  http,
  User,
  logIn,
  logOut,
  loggedIn,
  setUserId,
  setRole,
  setAdmin,
  isAdmin,
  role,
  userId,
  localUser
}