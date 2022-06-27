import React from 'react'

export default function PaymentActions({payment, confirmed, setModallActive, handleModallDelete}) {
  return (
    <div className="reward-btn-container">
      <div className="reward-invest-actions">
        <button onClick={e => setModallActive(true)} className="pay-details-btn">
          Детали
        </button>
        {confirmed === 1 || 2
          ?             
            <button className="pay-refuse-btn" onClick={e => handleModallDelete(payment?.id, payment?.project_id)}>
              отмена
            </button>
          : 
           null
        }

      </div>
    </div>
  )
}
