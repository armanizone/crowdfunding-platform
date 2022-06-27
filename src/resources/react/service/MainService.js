import { api } from "./Auth";

const getRole = () => {
  return api().get("api/v1/user/role")
}

const getByUserBill = () => {
  return api().get("api/v1/user/transaction")
}

const userImage = data => {
  return api().post("api/v1/user/image", data)
}

// -------------------- project actions --------------------
const createNew = () => {
  return api().post("api/v1/projects");
};

const update = data => {
  return api().post("api/v1/projects/edit", data);
};

const verify = data => {
  return api().post("api/v1/projects/verify", data)
};

const uploadImage = id => {
  return api().post(`api/v1/uploadImage/${id}`)
}

const sendToModerate = id => {
  return api().post(`api/v1/projects_to/moderate/${id}`)
};

const getOnModerationByUser = id => {
  return api().get(`api/v1/moderation_by/user/${id}`)
}

const deleteRawProjectById = id => {
  return api().delete(`api/v1/projects_delete_by/${id}`)
}

const getPostedByUser = () => {
  return api().get("api/v1/posted_projects_by/user")
}

const postProject = id => {
  return api().post(`api/v1/posted_project/post/${id}`)
}

const getProjectByUser = () => {
  return api().get("api/v1/project_by/user")
}
// -------------------- project actions end----------------------

// ------------------- reward actions ---------------------
const createReward = (data) => {
  return api().post("api/v1/reward_create", data)
}

const getRewardById = id => {
  return api().get(`api/v1/reward_get/${id}`)
}

const deleteReward = id => {
  return api().post(`api/v1/reward_delete/${id}`)
}


// const getBought = () => {
//   return api().get("reward_get/bought")
// }

// const getNotBought = () => {
//   return api().get("reward_get/notbought")
// }
// ----------------------- reward actions end ------------------


// --------------------- payment actions ----------------------
const createPayment = data => {
  return api().post("api/v1/project_payment", data)
}

const getActiveByUser = () => {
  return api().get("api/v1/project_payment/active")
}

const getEndedByUser = () => {
  return api().get("api/v1/project_payment/ended")
}

const getByProjectIdPayment = id => {
  return api().get("api/v1/payments_by/project_id", {
    params: {project_id: id}
  })
}

const getPaymentsByProjectId = id => {
  return api().get(`api/v1/payments_by/project/${id}`)
}


const deletePayment = id => {
  return api().post("api/v1/project_payment/delete", id)
}

const getByUserIdPayment = () => {
  return api().get("api/v1/project_payment_by/user")
}

const projectPayment = data => { 
  return api().post("api/v1/project_payment", data)
}

// ------------------------ payments actions end --------------------

// --------------------- notidications --------------------
const getNotiByUser = () => {
  return api().get("api/v1/noti/user")
}

const readNoti = () => {
  return api().post("api/v1/noti/read")
}

const deleteNotiById = id => {
  return api().delete(`api/v1/noti/delete/${id}`)
}
// --------------------- notidications end ----------------


const userInformation = data => {
  return api().put("api/user/profile-information", data)
}

const changePassword = data => {
  return api().put("api/user/password", data)
}


export default {
  readNoti,
  deleteNotiById,
  getNotiByUser,
  userInformation,
  changePassword,
  deleteRawProjectById,
  getPostedByUser,
  postProject,
  getProjectByUser,
  createPayment,
  getByUserIdPayment,
  deletePayment,
  getByProjectIdPayment,
  getActiveByUser,
  getEndedByUser,
  getByUserBill,
  userImage,
  getRole,
  createNew,
  update,
  verify,
  uploadImage,
  sendToModerate,
  getOnModerationByUser,
  createReward,
  getRewardById,
  deleteReward,
  projectPayment,
  getPaymentsByProjectId,
}