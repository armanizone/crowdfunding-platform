import {http} from './Auth'

const getPosted = () => {
  return http().get("api/v1/posted_projects") // App.jsx
}

const getByIdPosted = id => {
  return http().get(`api/v1/posted_project/${id}`) // routes/Project.jsx
}

const getRewardByProjectId = (id) => {
  return http().get(`/api/v1/reward/${id}`) // routes/Project.jsx, routes/editProject, 
}

const usersByProjectId = id => {
  return http().get("api/v1/users/list", {  
    params: {project_id: id}
  })
}

const getCities = () => {
  return http().get("api/v1/city")
}

const getClosed = () => {
  return http().get("api/v1/closed_projects")
}

const getClosedById = id => {
  return http().get(`api/v1/closed_projects/by/${id}`)
}

const getCarousel = () => {
  return http().get("api/v1/carousel/get")
}

// sanctuom
const cookie = () => {
  return http().get("sanctum/csrf-cookie")
}

const forgotPassword = data => {
  return http().post("api/forgot-password", data)
}

const resetPassword = data => {
  return http().post("api/reset-password", data)
}

const apiLogin = data => {
  return http().post("api/login", data)
}

const apiReg = data => {
  return http().post("api/register", data)
}
// sanctuom

export default {
  getPosted,
  getClosed,
  getClosedById,
  getByIdPosted,
  getCities,
  usersByProjectId,
  cookie,
  forgotPassword,
  resetPassword,
  apiLogin,
  apiReg,
  getCarousel,
  getRewardByProjectId,
}
