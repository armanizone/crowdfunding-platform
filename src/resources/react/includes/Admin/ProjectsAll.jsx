import { Modal } from "@mantine/core";
import React, {useState, useEffect} from 'react'
import AProjectForm from '../../components/Cards/AdminForm';
import { Project } from "../../routes";
import AdminService from '../../service/AdminService';

function ProjectsAll({raw, cities, succ, fail, setLoading }) {
  
  const [modallActive, setModallActive] = useState(false)
  const [modallDelete, setModallDelete] = useState(false); 
  const [modallUser, setModallUser] = useState(false)
  const [projectData, setProjectData] = useState({})
  const [projectDocuments, setProjectDocuments] = useState([])
  const [search, setSearch] = useState('')


  const handleModallActive = project => {
    setProjectData(project)
    setModallActive(true)
    console.log(project);
  }

  const handleDelete = id => {
    setProjectData(id)
    setModallDelete(true)
    console.log(id);
  }

  const searched = raw.filter(e => {
    return e?.title?.toLowerCase().includes(search)
  })

  const deleteRawProject = id => {
    setLoading(true)
    AdminService.deleteRawById(id)
    .then(e => {
      console.log(e);
      succ()
      document.location.reload()
    })
    .catch(e => {
      setLoading(false)
      fail()
      console.log(e.error)
    })
    }

  return (
    <div className= "allProjects admin-projects">
      <h1>
        Все проекты 
      </h1> 
      <div className="app-search">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по названию проекта" />
      </div>

      <div className="projectAll-form-container admin-projects-inner">  
        {searched.map(project => {
          return (
            <AProjectForm 
              project={project} 
              key={project.id} 
              cities={cities} 
              handleModallActive={handleModallActive} 
              handleDelete={handleDelete}
              />
          )
        })}
      </div>
      <Modal ModallShown={modallActive} setModallShown={setModallActive}>

        <Project project={projectData} preview />
      </Modal>
      <Modal ModallShown={modallDelete} setModallShown={setModallDelete}>
          <div className="pass-modal">
            Вы действительно хотите удалить проект?
            <button className="create-btn delete-btn" onClick={e => deleteRawProject(projectData)} >Удалить</button>
          </div>
      </Modal>
      <Modal ModallShown={modallUser} setModallShown={setModallUser}>
        <div className="reward-modall-check">
          <div className="modall-check-inner">
          <div className="admin-table">
            <div className="admin-table-inner">
              <div className="admin-table-head">
                <div className="admin-table-head-item">Id проекта</div>
                <div className="admin-table-head-item">название проекта</div>
                <div className="admin-table-head-item">фото пользователя</div>
                <div className="admin-table-head-item">Имя пользователя</div>
                <div className="admin-table-head-item">почта пользователя</div>
                <div className="admin-table-head-item">дата добавления</div>
              </div>
              <div className="admin-table-body">
                <div className="admin-table-item">{projectData?.id}</div>
                <div className="admin-table-item">{projectData?.title}</div>
                <div className="admin-table-item user-image-preview">
                  <img src={projectData?.user?.image} alt="" /> 
                </div>
                <div className="admin-table-item">{projectData?.user?.name}</div>
                <div className="admin-table-item">{projectData?.user?.email}</div>
                <div className="admin-table-item">{projectData?.created_at?.slice(0, 10)}</div>
              </div>
              <div className="admin-table-head">
                <div className="admin-table-head-item">имя</div>
                <div className="admin-table-head-item">фамилия</div>
                <div className="admin-table-head-item">отчество</div>
                <div className="admin-table-head-item">ИИН</div>
                <div className="admin-table-head-item">город автора</div>
                <div className="admin-table-head-item">телефон</div>
              </div>
              <div className="admin-table-body">
                <div className="admin-table-item">{projectData?.author}</div>
                <div className="admin-table-item">{projectData?.author_last_name}</div>
                <div className="admin-table-item">{projectData?.author_patronymic}</div>
                <div className="admin-table-item">{projectData?.iin}</div>
                <div className="admin-table-item">{cities?.[projectData?.author_city_id - 1]?.name}</div>
                <div className="admin-table-item">{projectData?.phone}</div>
              </div>
            </div>
          </div>

            <div className="check-hr">
              <hr />
              <div className="check-hr-title">
                Документы 
              </div>
            </div>

            <div className="check-item-container check-documents">
              <div className="check-item">
                <div className="check-description">Лицевая сторона</div>
                <img src={`${process.env.MIX_APP_URL}/${projectDocuments?.[0]?.document_front}`} alt="" />
              </div>
              <div className="check-item">
                <div className="check-description">Обратная сторона</div>
                <img src={`${process.env.MIX_APP_URL}/${projectDocuments?.[1]?.document_back}`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProjectsAll
