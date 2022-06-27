import React from 'react'
import { ProjectContext } from "../../routes/Project"


function History() {

  const {lore} = React.useContext(ProjectContext)

  return (
    <div>
      {lore.map((history, index) => {
        return (
          <div className="project_history" key={history.id}>
            <div className="history_date">
              <p>Дата редактирования</p> 
              <span>{createAt?.[index]}</span>
            </div>
            <div className="history_main">
              <div className="history_img">
                <img src={history.image} alt="" />
              </div>
              <div className="history_body">
                <div className="history_body_title">
                  {history.title}
                </div>
                <div className="history_body_description">
                  {history.short_description}
                </div>
                <div className="history_progress">
                  <div className="head__score" style={{marginTop: '15px'}}>

                    <div className="head__count">
                      <div className="head__count__item">
                        <span className="head__big__text">{history.collected_money}</span> ед.
                      </div>
                    </div>
                    
                    <div className="head__count">
                      <div className="head_patreons_item">
                        <span className="head__big__text">{history.days_left}</span> д. осталось
                      </div>
                    </div>

                  </div>

                  <div className= 'barBody' style={{marginBottom: '0px'}}>
                    <div className={percent?.[index] >= 100 ? 'indicator ' : 'indicator' }
                      style={{width:`${percent?.[index]}%`, backgroundColor: `${percent?.[0]}` > 100 ? 'rgb(0, 235, 31)' : '$blue' }}>
                      <p style={{color: `${percent?.[index]}` > 100 ? 'rgb(0, 235, 31)' : ''  }}>{Math.floor(percent?.[index])}%</p>
                    </div>
                  </div>

                  <div className="head__score">
                    <div className="head__count">
                      <div className="head_count__of">
                        собрано из  <span className="head__big__text">{sumOfMoney}</span> ед.
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="history_details" dangerouslySetInnerHTML = {{__html: (history.detail_description) }} >

            </div>
          </div>
        )
      })}
    </div>
  )
}

export default History