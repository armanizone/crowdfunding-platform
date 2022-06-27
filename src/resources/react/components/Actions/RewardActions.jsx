import React from 'react'
import { useLocation } from 'react-router';

export default function RewardActions({reward, handleReward, rewardCount, }) {

  const location = useLocation().pathname
  
  return (
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
  )
}
