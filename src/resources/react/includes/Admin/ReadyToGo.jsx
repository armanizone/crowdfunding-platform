import React, {useState} from 'react'
import { Modal } from "@mantine/core";
import AProjectForm from '../../components/Cards/AdminForm';
import { Project } from "../../routes";
import AdminService from '../../service/AdminService';
import HttpService from '../../service/HttpService';

function ReadyToGo ({projects, cities, setLoading}) {


  const [modallActive, setModallActive] = useState(false)
  const [modallDelete, setModallDelete] = useState(false)
  const [modallUser, setModallUser] = useState(false)

  const [project, setProject] = useState([])
  const [reward, setReward] = useState([]) 
  const [loaded, setLoaded] = useState(false)

  const handleModallActive = project => {
    setModallActive(true)
    setProject(project)
    HttpService.getRewardByProjectId(project?.id)
    .then(e => {
      setReward(e.data.filter(reward => {
        return reward?.name != "Благотворительная поддержка"
      }))
      setLoaded(true)
    })
  }
  const handleDelete = id => {
    setProject(id)
    setModallDelete(true)
    console.log(id);
  }

  const handleUser = project => {
    AdminService.authorData(project)
    .then(e => {
      setProject(e.data)
      console.log(e.data, "author data");
    })
    setModallUser(true)
  }

  const deleteByIdPosted = id => {
    setLoading(true)
    AdminService.deleteByIdPosted(id)
    .then(e => {
      console.log(e);
      setLoading(false)
      document.location.reload()
    })
    .catch(e => {
      setLoading(false)
    })
  }
  const [search, setSearch] = useState('')

  const searched = projects.filter(e => {
    return e?.title?.toLowerCase().includes(search)
  })

  return (
    <div className="confrimed">
    <h2>Готовые к запуску проекты</h2>
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
                handleDelete={handleDelete}
                handleUser={handleUser}
                handleModallActive={handleModallActive}/>
            </div>
          )
          
        })}
      </div> 

      <Modal ModallShown={modallActive} setModallShown={setModallActive}>

        <Project project={project} preview />
      </Modal>
      <Modal ModallShown={modallDelete} setModallShown={setModallDelete}>
        <div className="pass-modal">
          Вы действительно хотите удалить проект?
          <button className="create-btn delete-btn" onClick={e => deleteByIdPosted(project)} >Удалить</button>
        </div>
      </Modal>
      <Modal ModallShown={modallUser} setModallShown={setModallUser}>
        <div className="reward-modall-check">
          <div className="modall-check-inner">
            <table>
              <tbody>
                <tr>
                  <th>имя</th>
                  <th>фамилия</th>
                  <th>отчество</th>
                  <th>ИИН</th>
                  <th>город автора</th>
                  <th>телефон</th>
                </tr>
                <tr>
                  <td>{project?.author}</td>
                  <td>{project?.author_last_name}</td>
                  <td>{project?.author_patronymic}</td>
                  <td>{project?.iin}</td>
                  <td>{cities?.[project?.author_city_id - 1]?.name}</td>
                  <td>{project?.phone}</td>
                </tr>
              </tbody>
            </table>
            <div className="check-hr">
              <hr />
              <div className="check-hr-title">
                Документы 
              </div>
            </div>

            <div className="check-item-container check-documents">
              <div className="check-item">
                <div className="check-description">Лицевая сторона</div>
                <img src={`${process.env.MIX_APP_URL}/${project?.document_front}`} alt="" />
              </div>
              <div className="check-item">
                <div className="check-description">Обратная сторона</div>
                <img src={`${process.env.MIX_APP_URL}/${project?.document_back}`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  </div>
  ) 
}

export default ReadyToGo
