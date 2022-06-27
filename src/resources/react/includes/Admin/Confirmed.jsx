import React, {useState, useEffect} from 'react'
import {api} from '../../service/Auth';
import { Link } from 'react-router-dom';
import AdminService from '../../service/AdminService';

import { ImCross } from 'react-icons/im'
import { FaArrowUp, FaOutdent } from 'react-icons/fa'
import AProjectForm from '../../components/Cards/AdminForm';


import HttpService from '../../service/HttpService';
import { Modal } from "@mantine/core";
import { Project } from "../../routes";


function Confirmed({projects, setLoading, succ, fail}) {

  const [modallActive, setModallActive] = useState(false)
  const [modallDelete, setModallDelete] = useState(false)


  const [projectId, setProjectId] = useState()

  const [project, setProject] = useState({})

  const [loaded, setLoaded] = useState(false)

  const [reward, setReward] = useState([])

  const [projectView, setProjectView] = useState(false)
  const postedSorted = projects.sort((a, b) => {
    return (a.closed_at === null) - (b === null) || + (a.closed_at>b) || - (a.closed_at<b);
  })

  const handleModallActive = id => {
    setProjectId(id);
    setModallActive(true)
  }
  const handleProjectDelete = id => {
    setProjectId(id)
    setModallDelete(true)
  }
  const handleProjectView = project => {
    setProject(project)
    setProjectView(true)
    HttpService.getRewardByProjectId(project?.id)
    .then(e => {
      setReward(e.data)
      setLoaded(true)
    })
  }


  const recomend = id => {
    setLoading(true)
    AdminService.setRecomended(id.id)
    .then(e => {
    console.log(e);
      setLoading(false)
      setModallActive(false);
      alert(e.data);
    })
    .catch(e => {
      console.log(e);
      setLoading(false)
    })
  }
  const noRecomend = id => {
    setLoading(true)  
    AdminService.noRecomended(id.id)
    .then(e => {
      console.log(e);
      setLoading(false)
      setModallActive(false);
      alert(e.data)
    })
    .catch(e => {
      console.log(e);
      setLoading(false)
    })
  }

  const deletePosted = id => {
    setLoading(true)  
    AdminService.deletePostedById(id)
    .then(e => {
      console.log(e.data);
      succ()
      setLoading(false)
      document.location.reload()
    })
    .catch(e => {
      console.log(e.data);
      fail()
      setLoading(false)
      document.location.reload()
    })
  }

  const [search, setSearch] = useState('')

  const searched = postedSorted.filter(e => {
    return e?.title?.toLowerCase().includes(search)
  })

  return (
    <div className="confrimed">
      <h2>Одобренные проекты</h2>
        <div className="app-search">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="поиск по названию "/>
        </div>
      <div className="confrimed-inner">
      <div className="projectAll-form-container">  
        {searched.map(project => {
          return (
            <div className="small-form" key={project.id}>
              <AProjectForm 
                project={project} 
                key={project.id} 
                handleModallActive={handleModallActive}
                handleProjectView={handleProjectView}
                handleProjectDelete={handleProjectDelete}/> 
            </div>
          )
        })}
      </div> 
    </div>
      <Modal ModallShown={modallActive} setModallShown={setModallActive}>
        <div className="confrimed-modall">
          {projectId?.recomended === "1" ? 
            <>
              <h4>Перестать рекомендовать этот проект</h4>
              <button onClick={e => noRecomend(projectId)} className="create-btn">перестать рекомендовать</button>
            </>
            :
            <>
              <h4>Рекомендовать этот проект</h4>
              <button onClick={e => recomend(projectId)} className="create-btn">рекомендовать</button>
            </>
          }
        </div>
      </Modal>
      <Modal ModallShown={modallDelete} setModallShown={setModallDelete}>
    
        <h4>Вы действительно хотите удалить проект?</h4>
        <button onClick={e => deletePosted(projectId)} className="create-btn">удалить</button>
          
      </Modal>
      <Modal ModallShown={projectView} setModallShown={setProjectView}>
        <Project project={project} preview />
      </Modal>
    </div>
  )
}

export default Confirmed
