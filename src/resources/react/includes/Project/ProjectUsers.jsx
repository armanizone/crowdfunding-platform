import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import MainService from '../../service/MainService';



function ProjectUsers() {

  const defaultAvatar = (process.env.MIX_APP_URL + '/images/default-avatar.jpg')

  const {id} = useParams()
  const [payments, setPayments] = useState([])

  const userPayments = () => {
    console.log(id);
    MainService.getByProjectIdPayment(id)
    .then(e => {
      console.log(e, "payment");
      setPayments(e.data)
    })
  }

  useEffect(e => {
    userPayments()
  }, [])



  const Send = ({pay}) => {
    return (
      <table >
        <tbody>
          <tr>
            <th>Доставка</th>
          </tr>
          <tr>
            <th>Название вознаграждения</th>
            <th>ID вознаграждения</th>
            <th>Количество</th>
            <th>Общая стоимость</th>
            <th>ФИО</th>
            <th>Телефон</th>
            <th>Почтовый индекс</th>
            <th>Область</th>
            <th>Город</th>
            <th>Улица</th>
            <th>Дом</th>
            <th>Комментари</th>
          </tr>
          <tr>
            <td className='resizeble'>{pay.reward.name}</td>
            <td className='resizeble'>{pay.reward.id}</td>
            <td className='resizeble'>{pay.count}</td>
            <td className='resizeble'>{pay.total_sum}</td>
            <td className='resizeble'>{pay.FIO}</td>
            <td className='resizeble'>{pay.phone}</td>
            <td className='resizeble'>{pay.mail_index}</td>
            <td className='resizeble'>{pay.region}</td>
            <td className='resizeble'>{pay.reward?.take_city}</td>
            <td className='resizeble'>{pay.street}</td>
            <td className='resizeble'>{pay.apartment}</td>
            <td className='resizeble'>{pay.comment}</td>
          </tr>
        </tbody>   
      </table> 
    )
  }

  const Take = pay => {
    return (
      <table >
        <tbody>
          <tr>
            <th>Доставка</th>
          </tr>
          <tr>
            <th>Название вознаграждения</th>
            <th>ID вознаграждения</th>
            <th>Количество</th>
            <th>Общая стоимость</th>
            <th>ФИО</th>
            <th>Телефон</th>
          </tr>
          <tr>
            <td>{pay.reward.name}</td>
            <td>{pay.reward.id}</td>
            <td>{pay.count}</td>
            <td>{pay.total_sum}</td>
            <td>{pay.FIO}</td>
            <td>{pay.phone}</td>
          </tr>
        </tbody>   
      </table> 
    )
  }

  return (
    <div className="project_users">
      <h2>Пользователи</h2>
      <hr />
      <div className="project_users_inner">
          {payments.map(pay => {
            return (
              <div className="mrb" key={pay.id}>
                <div className="project_users_head">
                  <div className="users_head_item">
                    <img src={pay.user.image ?? defaultAvatar} alt="" />
                  </div>
                  <div className="users_head_item">
                    {pay.user.name}
                  </div>
                  <div className="users_head_item">
                    {pay.user.email}
                  </div>
                </div>
                {pay?.reward?.send == 1 && pay?.reward?.take_city === null
                  ? <Send pay={pay}/>
                  : null
                }
                {pay?.reward?.take_city && pay?.reward?.send == 0
                  ? <Take pay={pay}/>
                  : null
                }
                {pay?.reward?.take_city && pay?.reward?.send == 1
                  ? <Send pay={pay}/>
                  : null
                }
              </div>
            )
          })}

      </div>
    </div>
  )
}

export default ProjectUsers



// <div className="admin-table" key={pay.id}>
// <div className="admin-table-inner">
//   <div className="admin-table-head">
//     <div className="admin-table-head-item">
//       <img src="" alt="" />
//     </div>
//     <div className="admin-table-head-item">
//       имя
//     </div>
//     <div className="admin-table-head-item">
//       почта
//     </div>
//   </div>
//   <div className="admin-table-head">
//     <div className="admin-table-head-item">ФИО</div>
//     <div className="admin-table-head-item">Телефон</div>
//     <div className="admin-table-head-item">Область</div>
//     <div className="admin-table-head-item">Почтовый индекс</div>
//     <div className="admin-table-head-item">Город</div>
//     <div className="admin-table-head-item">Улица</div>
//     <div className="admin-table-head-item">Дом</div>
//     <div className="admin-table-head-item">Количество</div>
//     <div className="admin-table-head-item">Общая стоимость</div>
//   </div>
//   <div className="admin-table-body">
//     <div className="admin-table-item">{pay.FIO}</div>
//     <div className="admin-table-item">{pay.phone}</div>
//     <div className="admin-table-item">{pay.region}</div>
//     <div className="admin-table-item">{pay.mail_index}</div>
//     <div className="admin-table-item">{pay.city}</div>
//     <div className="admin-table-item">{pay.street}</div>
//     <div className="admin-table-item">{pay.apartment}</div>
//     <div className="admin-table-item">{pay.count}</div>
//     <div className="admin-table-item">{pay.total_sum}</div>
//   </div>
//   <div className="admin-table-head">
//     <div className="admin-table-head-item">ФИО автора</div>
//     <div className="admin-table-head-item">ИИН</div>
//     <div className="admin-table-head-item">Город</div>
//     <div className="admin-table-head-item">Телефон</div>
//     <div className="admin-table-head-item">Документы</div>
//   </div>
//   <div className="admin-table-body">
//     <div className="admin-table-item">{project.author} {project.author_last_name} {project.author_patronymic}</div>
//     <div className="admin-table-item">{project.iin}</div>
//     <div className="admin-table-item">{cities?.[project.author_city_id - 1]?.name}</div>
//     <div className="admin-table-item">{project.phone}</div>
//     <div className="admin-table-item" onClick={e => handleView(project.document_front, project.document_back)}><a href="#">Смотреть</a></div>
//   </div>
// </div>
// </div>