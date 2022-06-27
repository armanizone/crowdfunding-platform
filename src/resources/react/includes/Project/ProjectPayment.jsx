import { Button, Loader, LoadingOverlay, NumberInput, Radio, RadioGroup, Select, TextInput } from "@mantine/core"
import React from 'react'
import { useHistory, useParams } from "react-router-dom"

import MainService from '../../service/MainService'
import Notify from "../../service/Notify"
import Storage from "../../service/Storage"

function ProjectPayment() {

  const {id, projectId, count} = useParams()

  const {success, error} = Notify()

  const history = useHistory()

  const [reward, setReward] = React.useState({})

  const user = Storage.get('user')

  React.useEffect(e => {
    if (!user) history.push('/login')
  }, [])

  const [payment, setPayment] = React.useState({
    FIO: '',
    phone: user?.telephone || '',
    region: '',
    city: '',
    street: '',
    house_number: '',
    apartment: '',
    mail_index: '',
    response: '',
    comment: '',
    project_id: projectId,
    user_id: user?.id,
    how_to_get: '',
    count: count,
    reward_id: reward?.id,
    user_id: user?.id,
    sum: count * reward?.cost,
  })

  React.useEffect(e => {
    setPayment({...payment, reward_id: reward?.id, sum: count * reward?.cost})
  }, [reward])

  const [loading, setLoading] = React.useState({
    layout: false,
    pay: false,
  })

  const handleLoading = (name, value) => {
    setLoading({...loading, [name]: value})
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setPayment({...payment, [name]: value})
  }

  const fetchData = async e => {
    await MainService.getRewardById(id)
    .then(e => {
      setReward(e.data)
      console.log(e);
    })
    .catch(e => {
      console.log(e);
    })
    handleLoading('layout', true)
  }

  const [errors, setErrors] = React.useState({
    name: '',
    phone: '',
  })

  const buy = async e => {
    if (payment.FIO && payment.phone && user?.wallet >= reward?.cost) {
      handleLoading('pay', true);
      MainService.projectPayment(payment)
      .then(e => {
        console.log(e);
        handleLoading('pay', false)
        success("Приобретение", `Вы успешно прибрели вознаграждение ${reward?.name}, отслеживайте статус проекта во вкладке "Мои инвестиции"`)
        history.push('/my-investions')
      })
      .catch(e => {
        console.log(e);
        error("Приобретение", `Не удалось приобрести вознаграждение, перезагрузите страницу и попробуйте еще раз`)
        handleLoading('pay', false)
      })
    } 
    else {
      const string = 'Это поле обазятельно для заполнения'
      if (!payment.FIO && !payment.phone) {
        setErrors({name: string, phone: string})
        return
      }
      if (!payment.phone && payment.FIO) {
        setErrors({phone: string, name: ''})
        return
      }
      if (!payment.FIO && payment.phone) {
        setErrors({name: string, phone: ''})
        return
      }
    }
  }

  React.useEffect(e => {
    fetchData()
    return e => {
      setReward({})
      setLoading({})
    }
  }, [])

  const [type, setType] = React.useState({
    send: false,
    take: false,
    letter: false,
  })

  const handleType = e => {
    if (e === "take") setType({take: true, send: false, letter: false})
    if (e === "send") setType({send: true, take: false, letter: false})
    if (e === "letter") setType({letter: true, take: false, letter: false})
  }

  const handleName = e => {
    setPayment({...payment, FIO: e.target.value})
    setErrors({...errors, name: '',})
  }

  const handlePhone = e => {
    setPayment({...payment, phone: e.target.value})
    setErrors({...errors, phone: ''})
  }

  const cities = Storage.get('cities').map(city => {
    return {label: city.name, value: city.id}
  }) ?? []

  return (
    <div className="w-full my-6">
      <div className="container max-w-5xl">
        <div className="bg-border">
          {loading.layout
            ?
              <div className="grid grid-cols-1 md:grid-cols-[60%_40%] relative">
                <LoadingOverlay visible={loading.pay} />
                <div className="pr-0 pb-8 md:pb-0 md:pr-8">
                  <div className="mb-6 flex flex-col">
                    <span className="text-slate-400 text-2xl ">Вы собираетесь приобрести вознаграждение</span>
                    <span className="block mt-4 text-2xl font-head font-medium">{reward?.name}</span>
                  </div>
                  <div className="border border-slate-300 p-4 flex flex-col sm:flex-row gap-x-4">
                    <div className="w-full">
                      <TextInput
                        value={payment.FIO}
                        name="FIO"
                        onChange={handleName}
                        label="Инициалы получателя"
                        required
                        placeholder="Имя"
                        classNames={{
                          input: 'bg-slate-50',
                          error: 'text-xs'
                        }}
                        error={errors.name}
                      />
                    </div>
                    <div className="w-full">
                      <TextInput
                        value={payment.phone}
                        name="phone"
                        onChange={handlePhone}
                        label="Номер телефона"
                        required
                        placeholder="Телефон"
                        classNames={{
                          input: 'bg-slate-50',
                          error: 'text-xs'
                        }}
                        icon={<span>+7</span>}
                        error={errors.phone}
                      />
                    </div>
                  </div>
                  <RadioGroup
                    label="Способ получения"
                    description="Выберите способ получения"  
                    orientation="vertical"
                    onChange={handleType}
                    className="mt-6"
                  >
                    <Radio value="send" label="Доставка" disabled={reward?.send == 0}/>
                    <Radio value="take" label="Самовывоз" disabled={reward?.take_city == null}/>
                    <Radio value="letter" label="Письмо" disabled={reward?.letter == null}/>
                  </RadioGroup>
                  {type.send && (
                    <>
                      <div className="mt-4">
                        <span>
                          Адрес доставки
                        </span>
                      </div>
                      <form className="border border-slate-300 p-4 mt-2">
                        <div className="w-full">
                          <TextInput
                            value={payment.region}
                            name="region"
                            onChange={handleInputChange}
                            label="Область"
                            classNames={{
                              input: 'bg-slate-50'
                            }}
                          />
                        </div>
                        <div className="w-full">
                          <Select
                            value={payment.city}
                            name="city"
                            onChange={e => setPayment({...payment, city: e})}
                            label="Город"
                            data={cities}
                            required
                            classNames={{
                              input: 'bg-slate-50'
                            }}
                          />
                        </div>
                        <div className="w-full">
                          <NumberInput
                            value={payment.mail_index}
                            name="mail_index"
                            onChange={e => setPayment({...payment, mail_index: e})}
                            label="Почтовый индекс"
                            classNames={{
                              input: 'bg-slate-50'
                            }}
                            hideControls
                          />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-x-4">
                          <div className="w-full">
                            <TextInput
                              value={payment.street}
                              name="street"
                              onChange={handleInputChange}
                              label="Улица"
                              classNames={{
                                input: 'bg-slate-50'
                              }}
                            />
                          </div>
                          <div className="w-full">
                            <TextInput
                              value={payment.house_number}
                              name="house_number"
                              onChange={handleInputChange}
                              label="Дом"
                              classNames={{
                                input: 'bg-slate-50'
                              }}
                            />
                          </div>
                          <div className="w-full">
                            <TextInput
                              value={payment.apartment}
                              name="apartment"
                              onChange={handleInputChange}
                              label="кв/офис"
                              classNames={{
                              input: 'bg-slate-50'
                            }}
                            />
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                  {type.take && (
                    <>
                      <div className="mt-4">
                        <span>Детали самовывоза</span>
                      </div>
                      <div className="mb-2">
                        <p className="text-slate-500 text-xs">Детали будут уточнены</p>
                      </div>
                      <div>
                        <div className="border border-slate-300 p-4 mb-3">
                          <span className="text-slate-500 text-xs uppercase">Город самовывоза:</span>
                          <p className="font-semibold text-sm">{reward.take_city}</p>
                        </div>
                        <div className="border border-slate-300 p-4 mb-3">
                          <span className="text-slate-500 text-xs uppercase">Адрес:</span>
                          <p className="font-semibold text-sm">{reward.take_adress}</p>
                        </div>
                        <div className="border border-slate-300 p-4 mb-3">
                          <span className="text-slate-500 text-xs uppercase">Телефон:</span>
                          <p className="font-semibold text-sm">{reward.take_phone}</p>
                        </div>
                      </div>
                    </>
                  )}
                  {type.letter && (
                    <div>Письмо</div>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between gap-x-2 border-b border-slate-400 pb-4">
                    <div className="flex items-center">
                      <img src={`${process.env.MIX_APP_URL}${reward?.image}`} alt="" className="w-12 mr-4" />
                      <span className="text-lg text-slate-400">{count} шт. </span>
                    </div>
                    <span className="text-xl font-semibold">{count * reward?.cost} ед.</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-slate-400 text-lg">Общая стоимость</span>
                    <span className="text-xl font-semibold">{count * reward?.cost} ед.</span>
                  </div>
                  <div className="p-4 mt-6 border border-slate-300">
                    <span className="text-lg font-semibold block mb-4">Lorem, ipsum dolor.</span>
                    <p className="text-sm text-slate-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum fugiat dolor possimus est 
                      inventore qui facilis impedit voluptatibus dolorem voluptates magnam in veritatis, corrupti voluptatem, quae, consequatur commodi quod tempore.</p>
                  </div>
                  <div className="mt-6">
                    <Button color="red" fullWidth onClick={buy} >
                      Приобрести
                    </Button>
                  </div>
                </div>
              </div>
            : 
              <div className="w-full flex justify-center items-center h-96">
                <Loader size="xl"/>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ProjectPayment