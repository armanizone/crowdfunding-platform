import React, {useState, useEffect} from 'react'
import AdminService from '../../service/AdminService';
import {api} from './../../service/Auth';
import ReactPlayer from 'react-player';
import { Modal } from "@mantine/core";
import { Project } from "../../routes";



function Updates  ({updates, projects, setLoading, succ, fail}) {
  // console.log(updates, "updates");
  // console.log(projects, "projects");

  

  const [modallPass, setModallPass] = useState(false); 
  const [modallDelete, setModallDelete] = useState(false);
  const [modallEdit, setModallEdit] = useState(false)

  const [prevProject, setPrevProject] = useState([])
  const [updatedProject, setUpdatedProject] = useState([])

  const [userId, setUserId] = useState()
  const [updateId, setUpdateId] = useState()
  const [updateProjectId, setUpdateProjectId] = useState()

  const [loaded, setLoaded] = useState(false)



  const handleEditBtn = (project) => {
    setUpdatedProject(project)
    setModallEdit(true)
    setLoaded(true)
    setPrevProject(projects.filter(update => {
      return update.id == project.project_id
    })?.[0])
  }


  const [search, setSearch] = useState('')

  const searched = updates.filter(update => {
    return update?.title.toLowerCase().includes(search  )
  })



  const handlePassBtn = (projectId, userId) => {
    setModallPass(true)
    setUpdateProjectId(projectId)
    setUserId(userId)
    console.log(userId);
  }
  const handleDeleteBtn = (id) => {
    setModallDelete(true)
    setUpdateId(id)
  }
  
  
  const notiData = {
    user_id: userId,
    title: 'Проект',
    definition: 'Ваши обновления приняты!',
  } 

  const addNoti = e => {
    AdminService.addNoti(notiData)
    .then(e => {
      succ()
      console.log(e.data, "data");
    })
    .catch(e => { 
      fail()
    })
  }

  const confirmUpdates = id => {
    setLoading(true)
    AdminService.confrimUpdate(id)
    .then(e => {
      setLoading(false)
      addNoti()
      succ()
      document.location.reload()
    })
    .catch(e => {
      fail()
      setLoading(false)
    })
  }
  const deleteUpdate = id => {
    setLoading(true)
    AdminService.deleteByIdUpdates(id)
    .then(e => {
      console.log(e);
      setLoading(false)
      succ()
      document.location.reload()
    })
    .catch(e => {
      fail()
      setLoading(false)
    })
  }

  const Prev = ({update}) => {
    const prev = projects.filter(project => {
      return project.id === update.project_id
    })?.[0]
    return (
      <div className="update_project">
        <div className="update_img">
          
          <img src= {prev?.image} alt="" />
        </div>
        <div className="update_body">
          <div className="update_title">
            {prev?.title}
          </div>
          <div className="update_description">
            {prev?.short_description}
          </div>
          <div className="update_video">
            <a 
              href={prev?.video_or_animation} 
              arget="_blank">ссылка на видео</a>
          </div>
        </div>
      </div>
    )
  }
  
  const Updated = ({update}) => {
  
    const prev = projects.filter(project => {
      return project.id === update.project_id
    })?.[0]
    
    return (
      <div className="update_project">
        <div className="update_img">
          <img src={update?.image ?? prev?.image} alt=""/>
        </div>
        <div className="update_body">
          <div className="update_title">
            {update.title ?? prev?.title}
          </div>
          <div className="update_description">
            {update.short_description ?? prev?.title}
          </div>
          <div className="update_video">
            <a href={update.video_or_animation ?? prev?.video_or_animation}>ссылка на видео</a>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="applications">
      <h2>Заявки на обновление проекта</h2>
      <div className="applications-inner">
        <div className="app-search"> 
          <input type="text" placeholder="Поиск по обновлениям" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {searched.map((update, index) => {
          return (
            <div className="application" key={update.id}>
              <div className="project-app">
                <div className="updates_container">
                  <Prev update={update}/>
                  <Updated update={update}/>
                </div>
                <div className="app-buttons">
                  <div style={{display: 'flex'}}>
                    <button className="action-button" onClick={e => handleEditBtn(update)}>
                      Показать обновление
                    </button>
                    <button className="action-button" onClick={e => handlePassBtn(update.project_id, update.user_id)}>
                      Обновить
                    </button>
                  </div>
 
                  <button className="action-button delete-updates" onClick={e => handleDeleteBtn(update.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )
        })}
          <Modal ModallShown={modallEdit} setModallShown={setModallEdit}>
            <div className="preview-update">
              <div className="admin-edit-page">
              <div className="create-btn" onClick={e => setModallEdit(false)}>закрыть</div>
              <div className="preview-update-hr">
                  <hr />
                  <div className="preview-update-title">
                    Проект
                  </div>
                </div>

                <Project project={prevProject} preview />

                <div className="preview-update-hr">
                  <hr />
                  <div className="preview-update-title">
                    Обновление проекта
                  </div>
                </div>
                <Project project={updatedProject} preview />
              </div>
            </div>

            {/* <div className="preview-project">
              <button className="create-btn" onClick={e => setModallActive(false)} style={{marginTop: '30px'}}>Закрыть</button>
            </div> */}
          </Modal>
          <Modal ModallShown={modallPass} setModallShown={setModallPass}>
            <div className="pass-modal">
              Вы действительно хотите принять обновления?
            <button className="create-btn" onClick={e => confirmUpdates(updateProjectId)}>Принять</button>
            </div>
          </Modal>
          <Modal ModallShown={modallDelete} setModallShown={setModallDelete}>
            <div className="pass-modal">
              Вы действительно хотите удалить обновления?
              <button className="create-btn" onClick={e => deleteUpdate(updateId)}>Удалить</button>
            </div>
          </Modal>
      </div>
    </div>
  )
}

export default Updates

