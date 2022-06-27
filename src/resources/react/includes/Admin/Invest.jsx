import React,{ useState, useEffect} from 'react'
import { api } from './../../service/Auth';
import { Link } from 'react-router-dom';
import { RewardForm } from "../../components";
import { Modal } from "@mantine/core";

const Invest = ({payments}) => {
  const [search, setSearch] = useState('')
  
  const [searching, setSearching] = useState({
    user: '',
    project: '',
    reward: ''
  })

  const searched = payments.filter(pay => {
    return (
      String(pay.id).toLowerCase().includes(search) &&
      String(pay.id).includes(searching.user) && 
      pay.project.title.includes(searching.project) && 
      pay.reward.name.includes(searching.reward)
    )
  })

  const [modallEdit, setModallEdit] = useState(false)

  const [pay, setPay] = useState([])


  const handleSearchChange = e => {
    const {name, value} = e.target
    setSearching({...searching, [name]: value})
  }

  const handleMore = (pay) => {
    setPay(pay)
    setModallEdit(true)
  }


  const handleClick = id => {
    api().get("api/v1/payments_by/project/id", {
      params: {id: id}
    })
    .then(e => {
      console.log(e.data);
    })
  }



  return (
    <div className="investment">
      <h2>
        Транзакции пользователей
      </h2>
      <div className="investment-inner">
        <div className="app-search">
          <input type="text" placeholder="Поиск по id транзакции" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        
        <table style={{margin: '20px'}}>
        <tbody>
          <tr>
            <th>Id Транзакции</th>
            <th>Имя пользователя</th>
            <th>Дата</th>
            <th>Вознаграждение</th>
            <th>Сумма</th>
            <th>Из проекта</th>
            <th>Подробнее</th>
          </tr>
          <tr>
            <th>Id Транзакции</th>
            <th>
              <input type="number" name="user" value={searching.user || ''} onChange={handleSearchChange}  placeholder="Поиск по ID пользователя"/>
            </th>
            <th>Дата</th>
            <th>
              <input type="text" name="reward" value={searching.reward || ''} onChange={handleSearchChange} placeholder="Поиск по названию вознаграждения" /> 
            </th>
            <th>Сумма</th>
            <th>
              <input type="text" name="project" value={searching.project || ''} onChange={handleSearchChange} placeholder="Поиск по названию проекта" />
            </th>
            <th>Подробнее</th>
          </tr>
         
          {searched.map((pay, index) => {
            return (
              <tr key={index} style={{opacity: pay?.deleted_at != null ? .5 : 1}}>
                <td>{pay.id}</td>
                <td onClick={e => handleClick(pay.project.id)}>{pay.user.name}</td>
                <td>{pay.updated_at?.slice(0, 10)}</td>
                <td>{pay.reward.name}</td>
                <td>{pay.total_sum}</td>
                <td>
                  <Link to={`/project/${pay.project_id}`}>
                    {pay.project.title}
                  </Link> 
                </td>
                <td><button onClick={e => handleMore(pay)}>подробнее</button></td>
              </tr>
            )
          })}
        </tbody>   
      </table> 
        <Modal ModallShown={modallEdit} setModallShown={setModallEdit}>
            <div className="admin-invest-page">
              <div className="prev-project">
                <RewardForm reward={pay?.reward}/>
              </div>
              <div className="updated-project">
              <div className="reward-modall-check">
                {/* <h3>Детали приобретения</h3> */}
                <div className="modall-check-inner">
                  
                  <div className="check-item-container">
                    <div className="check-item">
                      <div className="check-description">Название проекта</div>
                      <div className="check-body">{pay?.project?.title}</div>
                    </div>
                    <div className="check-item">
                      <div className="check-description right">Номер проекта</div>
                      <div className="check-body right">{pay?.project?.id}</div>
                    </div>
                  </div>

                  <div className="check-item-container">
                    <div className="check-item">
                      <div className="check-description">Вознаграждение</div>
                      <div className="check-body">{pay?.reward?.name}</div>
                    </div>
                    <div className="check-item">
                      <div className="check-description right">Номер вознаграждения</div>
                      <div className="check-body right">{pay?.reward?.id}</div>
                    </div>
                  </div>


                  <div className="check-item-container">
                    <div className="check-item">
                      <div className="check-description">Id транзакции</div>
                      <div className="check-body">{pay?.id}</div>
                    </div>
                  </div>

                  <div className="check-hr">
                    <div className="check-hr-title">
                      Детали транзакции
                    </div>
                  </div>

                  <div className="check-item-container">
                    <div className="check-item">
                      <div className="check-description">Инициалы получателя</div>
                      <div className="check-body">{pay?.FIO}</div>
                    </div>
                    <div className="check-item">
                      <div className="check-description right">Телефон</div>
                      <div className="check-body right">{pay?.phone}</div>
                    </div>
                  </div>

                  <div className="check-item-container">
                    <div className="check-item">
                      <div className="check-description">Область</div>
                      <div className="check-body">{pay?.region}</div>
                    </div>
                    <div className="check-item">
                      <div className="check-description right">Город</div>
                      <div className="check-body right">{pay?.city}</div>
                    </div>
                  </div>

                  <div className="check-item-container">
                    <div className="check-item">
                      <div className="check-description">Улица</div>
                      <div className="check-body">{pay?.street}</div>
                    </div>
                    <div className="check-item">
                      <div className="check-description right">Дом/Офис</div>
                      <div className="check-body right">{pay?.house_number}</div>
                    </div>
                  </div>

                  <div className="check-item-container">
                    <div className="check-item">
                      <div className="check-description">Стоимоть</div>
                      <div className="check-body">{pay?.sum} ед.</div>
                    </div>
                    <div className="check-item">
                      <div className="check-description">Количество</div>
                      <div className="check-body">{pay?.count}</div>
                    </div>
                    <div className="check-item">
                      <div className="check-description right" >Общая сумма </div>
                      <div className="check-body right">{pay?.total_sum} ед.</div>
                    </div>
                  </div>

                  <div className="check-item-container">
                    <div className="check-item">
                      <div className="check-description">Дата приобретения</div>
                      <div className="check-body">{pay?.created_at?.slice(0,19)}</div>
                    </div>
                    <div className="check-item">
                      <div className="check-description right">Дата отправки вознаграждения</div>
                      <div className="check-body right">{pay?.reward?.date_sending}</div>
                    </div>
                  </div>

                </div>
              </div>
              </div>
            </div>
        </Modal>
      </div>
 
    </div>
  )
}

export default Invest
