import React, { useState } from 'react'

export default function Transactions({transactions}) {

  const [search, setSearch] = useState('')

  const searched = transactions.filter(transac => {
    return String(transac?.user_id).includes(search)
  })
  

  return (
    <div>
      <div className="app-search">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по id пользователя" />
      </div>
      <table >
        <tbody>
          <tr>
            <th>Id транзакции</th>
            <th>Id пользователя</th>
            <th>Токены</th>
            <th>Сумма</th>
            <th>Баланс пользователя</th>
            <th>Дата пополнения</th>
          </tr>
          {searched.map((transac, index) => {
            return (
              <tr key={index}>
                <td>{transac.id}</td>
                <td>{transac.user_id}</td>
                <td>{transac.tokens}</td>
                <td>{transac.sum}</td>
                <td>{transac.user_wallet}</td>
                <td>{transac?.created_at?.slice(0, 10)}</td>
              </tr>
            )
          })}
        </tbody>   
      </table> 
    </div>
  )
}
