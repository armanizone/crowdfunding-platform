import React from 'react'
import { Link } from 'react-router-dom';

import MainService from "../service/MainService";

import InvestForm from "../components/Cards/InvestForm";
import { Button, Loader, LoadingOverlay, Modal } from "@mantine/core";

import "../../sass/settings/invest-projects.scss"
import Notify from "../service/Notify";
import { Stuff } from "../modules";


const styles = {
  investions: 'w-full my-6',
  investionsInner: 'bg-border',
  row: 'projects gap-y-6'
}

export default function MyInvestions () {

  const {success, error} = Notify()

  const [investments, setInvestments] = React.useState([])
  const [endedInvesmets, setEndedInvesments] = React.useState([])
  const [payment, setPayment] = React.useState({})
  const [donations, setDonations] = React.useState([])
  const [reward, setReward] = React.useState({})

  React.useEffect(e => {
    setReward(payment.reward?.[0])
  }, [payment])
  
  const [loading, setLoading] = React.useState({
    layout: false,
    delete: false,
    refuse: false,
  })

  const handleLoading = (name, value) => {
    setLoading({...loading, [name]: value})
  }

  const [modal, setModal] = React.useState({
    delete: false,
    refuse: false,
    info: false,
  })

  const handleModal = (name, value, pay) => {
    if (pay) setPayment(pay)
    else setPayment({...payment})
    setModal({...modal, [name]: value})
  }


  const fetchData = async e => {
    await MainService.getActiveByUser() 
    .then(({data}) => {
      setInvestments(data.filter(reward => {
        return reward?.reward?.[0]?.name != "Благотворительная поддержка"
      }))
      setDonations(data.filter(reward => {
        return reward?.reward?.[0]?.name == "Благотворительная поддержка"
      }))
      console.log(data, "active");
    })
    await MainService.getEndedByUser() 
    .then(({data}) => {
      setEndedInvesments(data.filter(reward => {
        return reward?.reward?.[0]?.name != "Благотворительная поддержка"
      }))
      console.log(data, 'ended');
    })
    handleLoading('layout', true)
  }

  React.useEffect(e => {
    fetchData()
    return e => {
      setInvestments([])
      setEndedInvesments([])
      setLoading({})
    }
  }, [])



  const deleteReward = () => {
    handleLoading('delete', true)
    MainService.deletePayment({
      payment_id: payment?.id,
      project_id: payment?.project?.id,
    })
    .then(e => {
      console.log(e, "delete payment");
      handleLoading('delete', false)
      success("Инвестиции", `Вы успешно отказались от приобретения вознаграждения ${payment?.reward?.[0].name}`)
    })
    .catch(e => {
      console.log(e);
      handleLoading('delete', false)
      error("Инвестиции", `Не удалось отменить приобретение, перезагрузите страницу и попробуйте еще раз`)
    })
  }
  
  return (
    <>
      <div className={styles.investions}>
        <div className="container">
          <div className={styles.investionsInner}>
            {loading.layout ?
              investments.length < 1 ?
                <div className="w-full h-96 flex justify-center items-center">
                  <p>У вас еще нет инвестиций в проекты</p>
                </div> 
              :
                <>
                  <div className="mb-6">
                    <span className="font-head font-medium text-2xl sm:text-3xl">
                      Ваши проекты
                    </span>
                  </div>
                  <div className={styles.row}>
                    {investments.map(payment => {
                      return ( 
                        <div className="investions-item" key={payment.id}>
                          {payment?.project?.confirmed === 0 
                            ? 
                            <InvestForm 
                              reward={payment?.reward?.[0]} 
                              payment={payment} 
                              handleModal={handleModal}
                            />
                            : 
                            payment?.project?.confirmed === 1 
                            ?
                            <InvestForm 
                              reward={payment?.reward?.[0]} 
                              payment={payment} 
                              handleModal={handleModal}
                            />
              
                            : null
                          }
                        </div>
                      )
                    })}
                  </div>
                  {endedInvesmets.map(payment => {
                    return (
                      <div className="investions-item" key={payment.id}>
                        <InvestForm 
                          reward={payment?.reward?.[0]} 
                          payment={payment} 
                          handleModal={handleModal}
                        />
                      </div>
                    )
                  })}
                  <div>
                    <div className="my-6">
                      <span className="font-head font-medium text-2xl sm:text-3xl">
                        Пожертвования 
                      </span>
                    </div>
                    <div className={styles.row}>
                      {donations.map(payment => {
                        return (
                          <div key={payment.id}>
                            <InvestForm reward={payment.reward?.[0]} payment={payment} donation/>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              : 
                <Stuff.Loaded/>
            }
          </div>
        </div>
      </div>
      <Modal 
        centered
        withCloseButton={false}
        opened={modal.delete}
        onClose={e => setModal({...modal, delete: false})}
      >
        <LoadingOverlay visible={loading.delete} />
        <div className="flex flex-col items-center">
          <div className="mb-4 text-center"> 
            <span>
              Вы действительно хотите отказаться от приобретения вознаграждения {payment.reward?.[0]?.name}?
            </span>
          </div>
          <Button className="text-sm uppercase" variant="outline" onClick={deleteReward}>отказаться</Button>
        </div>
      </Modal>
      <Modal
        centered
        withCloseButton={false}
        opened={modal.refuse}
        onClose={e => setModal({...modal, refuse: false})}
      >
        <LoadingOverlay visible={loading.delete} />
        <div className="flex flex-col items-center">
          <div className="mb-4 text-center">
            <span>
              Вы действительно хотите вернуть {payment?.total_sum} ед.
            </span>
          </div> 
          <Button className="text-sm uppercase" variant="outline" onClick={deleteReward}>вернуть</Button>
        </div>
      </Modal>
      <Modal
        centered
        withCloseButton={false}
        opened={modal.info}
        onClose={e => setModal({...modal, info: false})}
        overflow="inside"
        size="md"
      >
        <div className="reward-modall-check">
          <div className="modall-check-inner">
            
            <div className="check-item-container">
              <div className="check-item ">
                <div className="check-description">Название проекта</div>
                <div className="check-body">{payment?.project?.title}</div>
              </div>
              <div className="check-item">
                <div className="check-description right">ID проекта</div>
                <div className="check-body right">{payment?.project?.id}</div>
              </div>
            </div>

            <div className="check-item-container">
              <div className="check-item" >
                <div className="check-description">Вознаграждение</div>
                <div className="check-body">{payment?.reward?.[0]?.name}</div>
              </div>
              <div className="check-item">
                <div className="check-description right">ID вознаграждения</div>
                <div className="check-body right">{payment?.reward?.[0].id}</div>
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
              {payment?.region && (
                <div className="check-item">
                  <div className="check-description">Область</div>
                  <div className="check-body">{payment?.region}</div>
                </div>
              )}
              {payment?.city && (
                <div className="check-item">
                  <div className="check-description right">Город</div>
                  <div className="check-body right">{payment?.city}</div>
                </div>
              )}
            </div>

            <div className="check-item-container">
              {payment?.street && (
                <div className="check-item">
                  <div className="check-description">Улица</div>
                  <div className="check-body">{payment?.street}</div>
                </div>
              )}
              {payment?.house_number && (
                <div className="check-item">
                  <div className="check-description right">Дом/Офис</div>
                  <div className="check-body right">{payment?.house_number}</div>
                </div>
              )}
            </div>

            <div className="check-item-container">
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
            {payment?.reward?.[0]?.take_city != null 
              ?
                <>
                  <div className="check-hr">
                    <hr />
                    <div className="check-hr-title">
                      Детали самовывоза
                    </div>
                  </div>
                  
                  <div className="check-item-container" style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="check-item" >
                      <div className="check-description">
                        Город самовывоза
                      </div>
                      <div className="check-body">
                        {payment?.reward?.[0]?.take_city}
                      </div>
                    </div>
                  </div>

                  <div className="check-item-container">
                    <div className="check-item">
                      <div className="check-description">Улица самовывоза</div>
                      <div className="check-body">{payment?.reward?.[0]?.take_adress}</div>
                    </div>
                    <div className="check-item">
                      <div className="check-description right">Номер автора</div>
                      <div className="check-body right">{payment?.reward?.[0]?.take_phone}</div>
                    </div>
                  </div>
                </>
              : null
            }

          </div>
        </div>
      </Modal>
    </>
  )
}
