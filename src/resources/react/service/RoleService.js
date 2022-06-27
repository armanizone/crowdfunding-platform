import { api } from "./Auth";


// ----------------- author -------------------
const getByIdHistory2 = id => {
  return api().get(`api/v2/history/get`, {
    params: {project_id: id}
  })
}

const addDiary2 = (id, data) => {
  return api().post(`api/v2/diary/${id}`, data)
}

const getDiary2 = id => {
  return api().get(`api/v2/diary/${id}`, {
    params: {project_id: id}
  })
}

const deleteByIdDiary2 = id => {
  return api().delete(`api/v2/diary_delete/${id}`,{
    params: {project_id: id}
  })
}

const getProjectById2 = id => {
  return api().get(`api/v2/project/${id}`, {
    params: {
      raw_project: id
    }
  });
};

const getByIdPosted = id => {
  return api().get(`api/v2/posted_project/${id}`, {
    params: {
      project_id: id
    }
  });
};

const getByIdUpdates = id => {
  return api().get(`api/v2/updates/by/id`, {
    params: {project_id: id}
  })
}

const updatePosted = data => {
  return api().post("api/v2/posted_project/update", data)
}

const updateReward = (data, id) => {
  return api().post("api/v2/reward_update", data , {
    params: {project_id: id}
  })
}

const deleteRawProjectById = id => {
  return api().delete(`api/v2/projects_delete_by/${id}`, {
    params: {raw_project: id}
  })
}

const endPostedById = id => {
  return api().post(`api/v2/posted_project_end/byId`, id)
}

const deletePostedById = id => {
  return api().post(`api/v2/posted_project_delete`, {project_id: id})
}

// ----------------- author end ---------------

// ---------- admin, curator, b-angel, booster --------

const getByIdHistory = id => {
  return api().get("api/v1/history/get", {
    params: {project_id: id}
  })
}

const addDiary = (id, data) => {
  return api().post(`api/v1/diary/${id}`, data)
}

const getDiary = id => {
  return api().get(`api/v1/diary/${id}`)
}

const deleteByIdDiary = id => {
  return api().delete(`api/v1/diary_delete/${id}`)
}
// ---------- admin, curator, b-angel, booster end ----

export default {
  getByIdHistory,
  getByIdHistory2,
  getByIdUpdates,
  updatePosted,
  addDiary,
  addDiary2,
  getDiary,
  getDiary2,
  deleteByIdDiary,
  deleteByIdDiary2,
  getByIdPosted,
  getProjectById2,
  updateReward,
  deleteRawProjectById,
  endPostedById,
  deletePostedById
}