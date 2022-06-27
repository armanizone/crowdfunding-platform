import { api } from "./Auth";


// --------------- curator -------------------
const getAllOnModeration = () => {
  return api().get("api/v1/projects_on_moderation/all")
}

const getByIdOnModeration = id => {
  return api().get(`api/v1/projects_on_moderation/${id}`)
}

const getAllUpdates = () => {
  return api().get("api/v1/updates/all")
}

const getByIdUpdates = id => {
  return api().get(`api/v1/updates/by/id`, {
    params: {project_id: id}
  })
}

const getAllRawProjects = () => {
  return api().get("api/v1/projects/all")
}

const getProjectById = id => {
  return api().get(`api/v1/project/${id}`)
}
// --------------- curator end -------------------

const getAllUsers  = () => {
  return api().get("api/v1/users/all")
}

const getUserBy = param => {
  return api().get(`api/v1/user_get_by/${param}`)
}

const toWallet = (data) => {
  return api().post("api/v1/user/add_wallet", data)
}

const moderatePost = (id, category) => {
  return api().post(`api/v1/moderate_to/post/${id}`, {category})
}

const setRecomended = id => {
  return api().post(`api/v1/set_recomended/${id}`)
}

const noRecomended = id => {
  return api().post(`api/v1/no_recomended/${id}`)
}

const getNotPostedAll = () => {
  return api().get("api/v1/posted_not/all")
}

const sendToReject = data => {
  return api().post(`api/v1/projects_reject` , data)
}

const deleteRawById = id => {
  return api().delete(`api/v1/projects_delete_by/${id}`)
}

const deletePostedById = id => {
  return api().post(`api/v1/posted_project_delete/${id}`)
}

const authorData = id => {
  return api().get(`api/v1/author/data/${id}`, )
}

const confrimUpdate = id => {
  return api().post(`api/v1/updates/confirm/${id}`,)
}

const deleteByIdUpdates = id => {
  return api().delete(`api/v1/updates/delete/by/${id}`)
}

const getTransactions = () => {
  return api().get("api/v1/transactions/all")
}

const getPaymentsAll = () => {
  return api().get("api/v1/payments/all")
}

const getRoleByUser = id => {
  return api().get(`api/v1/user/role/${id}`)
} 

const setRole = (data) => {
  return api().post(`api/v1/user/role_set`, data)
} 

const removeRole = id => {
  return api().post(`api/v1/user/role/remove/${id}`)
}

const addNoti = (data) => {
  return api().post("api/v1/noti/add", data)
}


const updateCarousell = data => {
  return api().post("api/v1/carousel/update", data)
}

const addCity = data => {
  return api().post("api/v1/city", data)
}

const updateCity = (id, data) => {
  return api().put(`api/v1/city/${id}`, data)
}

const deleteCity = id => {
  return api().delete(`apu/v1/city${id}`)
}

const getAllDeletedOrClosed = () => {
  return api().get("api/v1/deleted_closed")
}





export default {
  getAllOnModeration,
  moderatePost,
  getAllUpdates,
  getByIdOnModeration,
  deleteByIdUpdates,
  getNotPostedAll,
  sendToReject,
  getAllUsers,
  authorData,
  confrimUpdate,
  setRole,
  removeRole,
  getPaymentsAll,
  addNoti,
  updateCarousell,
  setRecomended,
  noRecomended,
  getAllRawProjects,
  getByIdUpdates,
  getTransactions,
  toWallet,
  getAllDeletedOrClosed,
  getRoleByUser,
  getProjectById,
  getUserBy,
  deleteRawById,
  addCity,
  updateCity,
  deleteCity,
  deletePostedById
}