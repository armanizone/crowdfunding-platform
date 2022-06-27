import React, {useState} from 'react'
import AdminService from '../../service/AdminService';

import AProjectForm from '../../components/Cards/AdminForm';
import HttpService from '../../service/HttpService';
import { Button, Modal } from "@mantine/core";
import { Project } from "../../routes";


const Zayavki = ({projects, setLoading, cities}) => {

  const [category, setCategory] = useState(0) 


  const [modal, setModal] = React.useState({
    preview: false,
    pass: false,
    delete: false,
    user: false
  })

  const [project, setProject] = React.useState({})

  const handleModal = (name, value) => {
    setModal({...modal, [name]: value})
  }

  const handleAction = (name, value, project) => {
    setProject(project)
    handleModal(name, value) 
  }
  
  const [reward, setReward] = useState([])

  const [loaded, setLoaded] = useState(false)

  const handleModallActive = async project => {
    setProjectData(project)
    setModallActive(true)
    HttpService.getRewardByProjectId(project?.id)
    .then(e => {
      setReward(e.data.filter(reward => {
        return reward?.name != 'Благотворительная поддержка'
      }));
      setLoaded(true)
    })
    .catch(e => {
      console.log(e);
      setLoaded(false)
    })
   
  }

  const handleUser = user => {
    setProjectData(user)
    setModallUser(true)
  }

  const [search, setSearch] = useState('')
  
  const searched = projects.filter(project => {
    return (
        project?.title?.toLowerCase().includes(search) 
      )
  })

  const data = {
    project_id: project.id, 
    user_id: project.user_id
  }

  const sendToReject = () => {
    console.log(data)
    setLoading(true)
    AdminService.sendToReject(data)
    .then(e => {
      console.log(e);
      setLoading(false)
    })
    .catch(e => {
      setLoading(false)
    })
  }

  const postRawProject = (id) => {
    setLoading(true)
    console.log(category);
    AdminService.moderatePost(id, category ?? 1)
    .then(e => {
      console.log(e);
      setLoading(false)
      document.location.reload()
    })
    .catch(e => {
      setLoading(false)
    })
  }


  return (
    <div className="applications">
      <h2>Заявки на создание проекта</h2>
      <div className="applications-inner">
        <div className="app-search">
          <input type="text" placeholder="Поиск проекта" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="projectAll-form-container">
          {searched.map(project => {
            return ( 
              <div key={project.id}>
                <AProjectForm 
                  project={project}
                  key={project.id} 
                  cities={cities} 
                  handleModal={handleModal}
                />
                <Button onClick={e => handleAction('pass', true, project)}>
                  Одобрить
                </Button>
              </div>
            )
          })}
        </div>
       
      <Modal 
        opened={modal.preview}
        onClose={e => handleModal('preview', false)}
        centered
      >
        <Project project={project} preview />
      </Modal>
      <Modal
        opened={modal.pass}
        onClose={e => handleModal('pass', false)}
        centered
      >
          <div className="pass-modal">
            <p>Название проекта: {project?.title}</p>
            <b>Выберите категорию </b>
              <select name="admin-select" value={category} onChange={e => setCategory(e.target.value)}>
                <option value={0}>Название категории</option>
                <option value={1}>Бизнес</option>
                <option value={2}>Еда</option>
                <option value={3}>Технологии</option>
                <option value={4}>Иновации</option>
                <option value={5}>Образование</option>
                <option value={6}>Разное</option>
              </select>
          <button className="create-btn create-details-btn" onClick={e => postRawProject(project?.id)} disabled={category == 0} >Одобрить</button>
          </div>
      </Modal>
      <Modal 
        opened={modal.delete}
        onClose={e => handleModal('delete', false)}
        centered
      >
        <div className="pass-modal">
          Вы действительно хотите удалить проект?
          <button className="create-btn delete-btn" onClick={e => sendToReject(project.id , project.user_id)} >Удалить</button>
        </div>
      </Modal>
      <Modal 
        opened={modal.user}
        onClose={e => handleModal('user', false)}
        centered
      >
        <div className="reward-modall-check">
          <div className="modall-check-inner">
            <table>
              <tbody>
                <tr>
                  <th>Id проекта</th>
                  <th>название проекта</th>
                  <th>фото пользователя</th>
                  <th>Имя пользователя</th>
                  <th>почта пользователя</th>
                  <th>дата добавления</th>
                </tr>
                <tr>
                  <td >{project?.id}</td>
                  <td >{project?.title}</td>
                  <td className="user-image-preview">
                    <img src={project?.user?.image} alt="" /> 
                  </td>
                  <td >{project?.user?.name}</td>
                  <td >{project?.user?.email}</td>
                  <td >{project?.created_at?.slice(0, 10)}</td>
                </tr>
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

export default Zayavki



// {projects.map(project => {
//   return (
//     <table key={project.id}>
//       <caption>Statement Summary</caption>
//       <thead>
//         <tr>
//           <th scope="col">Название проекта</th>
//           <th scope="col">Имя пользователя</th>
//           <th scope="col">Дата добавления</th>
//           <th scope="col">Длительность</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td data-label="Project title">{project?.title}</td>
//           <td data-label="User name">{project?.user_name}</td>
//           <td data-label="Create at">{project?.created_at}</td>
//           <td data-label="Period">{project?.days} дней</td>
//         </tr>
//       </tbody>
//       <thead>
//         <tr>
//           <th scope="col">Название проекта</th>
//           <th scope="col">Имя пользователя</th>
//           <th scope="col">Дата добавления</th>
//           <th scope="col">Длительность</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td data-label="Project title">{project?.title}</td>
//           <td data-label="User name">{project?.user_name}</td>
//           <td data-label="Create at">{project?.created_at}</td>
//           <td data-label="Period">{project?.days} дней</td>
//         </tr>
//       </tbody>
//     </table>
//   )
// })}
