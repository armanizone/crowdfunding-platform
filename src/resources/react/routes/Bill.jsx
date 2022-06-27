import React from 'react'
import MainService from "../service/MainService"
import { Stuff } from "../modules"
import Storage from "../service/Storage"
import { Button, Loader, Table } from "@mantine/core"

function Bill () {

  const user = Storage.get('user')

  const [transactions, setTransactions] = React.useState([])

  const [loaded, setLoaded] = React.useState(false)

  const fetchData = async e => {
    await MainService.getByUserBill()
    .then((e) => {
     setTransactions(e.data)
    })
    setLoaded(true)
  }

  React.useEffect(e => {
    fetchData()
    return e => {
      setLoaded(false)
      setTransactions([])
    }
  }, [])

  React.useEffect(e => {
    if (Object.keys(user).length != 0) {
      setLoaded(true)
    }
  }, [user])

  const styles = {
    bill: 'w-full my-6',
    billInner: 'bg-border',
  }
    
  return (
    <>
    <div className={styles.bill}>
      {loaded 
        ?
          <div className="container">
            <div className={styles.billInner}>
              <div className="mb-2">
                <label>ID пользователя: </label>
                <span>{user.id}</span>
              </div>
              <div className="mb-2">
                <label>Почта: </label>
                <span> {user.email}</span>
              </div>
              <div className="mb-2">
                <label>Средства на счету: </label>
                <span className="profile-sum">{user.wallet} ед.</span>
              </div>
              <div className="mb-2 text-center">
                <p>
                  Для пополнения средств вам необходимо иметь аккаунт в системе токенов cpNet.
                </p>

                <div className = "konvert">
                  <label >
                    Конвертация:
                  </label>
                  <span>
                    1 (cpNet) = 1000 ед.
                  </span>
                </div>
                <Button variant="outline" className="text-xs uppercase mt-2" >
                  пополнить средства
                </Button>
              </div>
              {
                transactions.length >= 1 
                ?
                  <Table highlightOnHover striped className="w-full mt-6">
                      <thead>
                        <tr>
                          <th>ID транзакции</th>
                          <th>ID пользователя</th>
                          <th>Единицы</th>
                          <th>Сумма</th>
                          <th>Дата</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map(transac => {
                          const date = new Date(transac?.created_at)
                          return (
                            <tr key={transac.id}>
                              <td>{transac.id}</td>
                              <td>{transac.user_id}</td>
                              <td>{transac.tokens}</td>
                              <td>{transac.sum}</td>
                              <td>{date.toLocaleString()}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                  </Table>
                : null
              }
            </div>
          </div>
        : 
          <div className="w-full flex justify-center items-center h-96">
            <Loader size="xl" />
          </div>
      }
    </div>
    </>
  )
}

export default Bill