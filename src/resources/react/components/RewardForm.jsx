import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Modall from '../includes/Project/Modall';


function RewardForm({reward, handleReward, payment,}) {

  const location = useLocation().pathname

  const [rewardCount, setRewardCount] = useState(reward?.total - reward?.bought)
  useEffect(e => {
    setRewardCount(reward?.total - reward?.bought)
  }, [reward?.bought, reward?.total])

  const [modallActive, setModallActive] = useState(false)

  const dateSending = reward?.date_sending?.slice(0, 10)?.split("-").reverse().join("-")


  return (
    <>
    <div className="reward-form">
      <img 
        className="reward-img"  
        src={reward?.image ? `${process.env.MIX_APP_URL}/${reward?.image}` : "https://www.colorhexa.com/20c4f4.png"} alt=""/>
      <div className = "children-reward-form">
        <div className="reward-count">
          <div>
            <p className="reward-imp">
              {reward?.cost} ед.
            </p>
            <p>
              стоимость
            </p> 
          </div>
          <div>
            <p className="reward-imp"> 
              {rewardCount}/{reward?.total}
            </p> 
            <p>
              осталось 
            </p>
          </div>
        </div>
          <h3 className="reward-name">
            {reward?.name}
          </h3>

          <div className="reward-form-description">
            {reward?.description}
          </div>

          <div className="reward-date">
            <div className="reward-date-column">
              <p>Дата отправки:</p>
              <p className="reward-imp">
                {dateSending}
              </p>
            </div>
            <div className="reward-date-column">
              <p>Тип получения:</p>
              {reward?.send == "1" && reward?.take_city ? 
                <>
                  <p className="reward-imp">доставка</p>
                  <p className="reward-imp">самовызов</p>
                </>
              : null}
              {reward?.send == "1" && reward.take_city === null ? 
                <p className="reward-imp">доставка</p>
              : null}
              {reward?.send == "0" && reward.take_city ? 
                <p className="reward-imp">самовызов</p>
              : null}
              {reward?.letter == "1" ? 
                <p className="reward-imp">письмо</p>
              : null}
            </div>
          </div>
      </div>
      
    
      <div className="reward-btn-container">
        <div className="reward-project-actions">
          {location.includes("/closed")
            ?
            rewardCount === 0 ?
            <p className="no-reward" style={{backgroundColor: 'gray'}}>
              Вознаграждения закончились
            </p>
            :
            <button 
              onClick={e => handleReward(reward?.id, reward?.cost, reward?.name, reward?.date_sending)}
              style={{backgroundColor: 'gray'}}>
              Приобрести
            </button>
            : 
            rewardCount === 0 ?
            <p className="no-reward">
              Вознаграждения закончились
            </p>
            :
            <button onClick={e => handleReward(reward)}>
              Приобрести
            </button>
          }
        </div>
      </div>

    </div>
  <Modall ModallShown={modallActive} setModallShown={setModallActive}>
    <div className="reward-modall-check">
      {/* <h3>Детали приобретения</h3> */}
      <div className="modall-check-inner">
        
        <div className="check-item-container">
          <div className="check-item">
            <div className="check-description">Название проекта</div>
            <div className="check-body">{payment?.project?.title}</div>
          </div>
          <div className="check-item">
            <div className="check-description right">ID проекта</div>
            <div className="check-body right">{payment?.project.id}</div>
          </div>
        </div>

        <div className="check-item-container">
          <div className="check-item">
            <div className="check-description">Вознаграждение</div>
            <div className="check-body">{payment?.reward.name}</div>
          </div>
          <div className="check-item">
            <div className="check-description right">ID вознаграждения</div>
            <div className="check-body right">{payment?.reward.id}</div>
          </div>
        </div>


        <div className="check-item-container">
          <div className="check-item">
            <div className="check-description">ID транзакции</div>
            <div className="check-body">{payment?.id}</div>
          </div>
        </div>

        <div className="check-hr">
          <hr />
          <div className="check-hr-title">
            Детали транзакции
          </div>
        </div>

        <div className="check-item-container">
          <div className="check-item">
            <div className="check-description">Инициалы получателя</div>
            <div className="check-body">{payment?.FIO}</div>
          </div>
          <div className="check-item">
            <div className="check-description right">Телефон</div>
            <div className="check-body right">{payment?.phone}</div>
          </div>
        </div>

        <div className="check-item-container">
          <div className="check-item">
            <div className="check-description">Область</div>
            <div className="check-body">{payment?.region}</div>
          </div>
          <div className="check-item">
            <div className="check-description right">Город</div>
            <div className="check-body right">{payment?.city}</div>
          </div>
        </div>

        <div className="check-item-container">
          <div className="check-item">
            <div className="check-description">Улица</div>
            <div className="check-body">{payment?.street}</div>
          </div>
          <div className="check-item">
            <div className="check-description right">Дом/Офис</div>
            <div className="check-body right">{payment?.house_number}</div>
          </div>
        </div>

        <div className="check-item-container">
          <div className="check-item">
            <div className="check-description">Стоимоть</div>
            <div className="check-body">{payment?.sum} ед.</div>
          </div>
          <div className="check-item">
            <div className="check-description">Количество</div>
            <div className="check-body">{payment?.count}</div>
          </div>
          <div className="check-item">
            <div className="check-description right" >Общая сумма </div>
            <div className="check-body right">{payment?.total_sum} ед.</div>
          </div>
        </div>

        <div className="check-item-container">
          <div className="check-item">
            <div className="check-description">Дата приобретения</div>
            <div className="check-body">{payment?.created_at?.slice(0,19)}</div>
          </div>
          <div className="check-item">
            <div className="check-description right">Дата отправки</div>
            <div className="check-body right">{payment?.reward?.[0]?.date_sending}</div>
          </div>
        </div>

      </div>
    </div>
  </Modall>
  </>
  )
}

export default RewardForm
