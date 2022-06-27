import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Modall from '../Project/Modall';
import PaymentActions from './PaymentActions';


function ClosedReward ({reward, handleModallActive, payment, handleModallRefuse}) {

  // const [rewardCount, setRewardCount] = useState(reward?.total - reward?.bought)

  // useEffect(e => {
  // setRewardCount(reward?.total - reward?.bought)
  // }, [reward?.bought, reward?.total])

  const closedAt = payment?.project?.closed_at?.slice(0, 10)?.split("-").reverse().join("-");  
  const dateSending = payment?.reward?.[0].date_sending?.slice(0, 10)?.split("-").reverse().join("-")

  return (
  
    <div className="reward-form failed-payment">
      <Link to={`/project/${reward?.project_id}`}>
        <img className="reward-img"  src={`${process.env.MIX_APP_URL}/${reward?.image}`} alt=""/>
      </Link>

      <div className = "children-reward-form">
        <div className="reward-count">
          <div>
            <p className="reward-imp">
              {payment?.total_sum} ед.
            </p>
            <p>
              общая стоимость
            </p> 
          </div>
          <div>
          <p className="reward-imp"> 
            {payment?.count}
          </p> 
          <p>
            приобретено 
          </p>
          </div>
        </div>
          <h3 className="reward-name" style={{marginBottom: '10px'}}>
            {reward?.name}
          </h3>

    
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

        <div className="reward-date" style={{marginTop: '18px'}}>
            <div className="reward-date-column">
              <p>Дата завершение</p>
              <p className="reward-imp">
                {closedAt}
              </p>
            </div>
            <div className="reward-date-column">
    
            
              <p>Статус проекта</p>
              <p className="reward-imp">Не успешно</p>
          
          </div>
        </div>

        <div className="reward-count" style={{marginTop: '18px'}}>
          {payment.project?.deleted_at
            ? <p className="reward-imp">Проект удален автором</p>
            : <p className="reward-imp">Не активный</p>
          }
         
        </div>

      </div>

      <div className="reward-btn-container">
        <div className="reward-invest-actions">
          <button onClick={e => handleModallRefuse(payment)}  className="pay-details-btn" style={{maxWidth: "100%"}}>
            Вернуть {payment.total_sum} ед.
          </button>
          <button className="pay-refuse-btn"onClick={e => handleModallActive(payment)} >
            детали
          </button>
        </div>
      </div>

    </div>
  )
}

export default ClosedReward
