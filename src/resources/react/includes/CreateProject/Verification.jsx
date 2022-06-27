import React from "react";
import {Link} from 'react-router-dom'
import { useHistory } from "react-router";

import { FaArrowLeft } from 'react-icons/fa'
import MainService from "../../service/MainService";
import Storage from "../../service/Storage";
import { Button, LoadingOverlay, Modal, NumberInput, Select, TextInput } from "@mantine/core";

import { showNotification } from "@mantine/notifications";

import Notify from "../../service/Notify"

import { styles } from "../../routes/EditProject";

function Verification({id, author, posted, raw}) {

  const {success, error} = Notify()
  
  const history = useHistory() 

  const [verification, setVerification] = React.useState({
    id: id,
    author: '',
    author_last_name: '',
    author_patronymic: '',
    author_city_id: '',
    iin: '',
    phone: '',
    document_back: '', 
    document_front: '',
  })

  const [document, setDocument] = React.useState({
    front: '',
    back: ''
  })

  const [loading, setLoading] = React.useState({
    verify: false,
    moderate: false,
  })

  const [modal, setModal] = React.useState({
    moderate: false
  })


  const handleLoading = (name, value) => {
    setLoading({...loading, [name]: value})
  }
  
  React.useEffect(e => {
    setVerification(author)
  }, [author])

  React.useEffect(e => {
    if (posted) history.goBack()
  }, [posted])

  React.useEffect(() => {
    if (document.front) setVerification({...verification, document_front: URL.createObjectURL(document.front)})
    if (document.back) setVerification({...verification, document_back: URL.createObjectURL(document.back)})
  }, [document]);


  const verifyData = new FormData()

  const append = async e => {
    verifyData.append("id", verification.id || id)
    verifyData.append("author", verification.author)
    verifyData.append("author_last_name", verification.author_last_name)
    verifyData.append("author_patronymic", verification.author_patronymic)
    verifyData.append("author_city_id", verification.author_city_id - 1 || 1)
    verifyData.append("iin", verification.iin || '')
    verifyData.append("phone", verification.phone || '')
    verifyData.append("document_back", document.back) 
    verifyData.append("document_front", document.front)
  }

  const handleInput = e => {
    const { name, value } = e.target
    setVerification({...verification, [name]: value})
  }
  
  const handleDocument = e => {
    const {name, files} = e.target
    setDocument({...document, [name]: files[0]})
  }

  const verify = async e =>  {
    e.preventDefault();
    await append()
    handleLoading('verify', true)
    await MainService.verify(verifyData)
    .then(e => {
      console.log(e, "response"); 
      handleLoading('verify', false);
      success("Верификация", "Данные верификации отправлены успешно!")
    })
    .catch(e => {
      handleLoading('verify', false)
      error("Верификация", "Ошибка! Возможно вы ввели некорректные данные или размер выбранного документа слишком большой")
    });
  }

  const toModerate = async (e) => {
    e.preventDefault();
    handleLoading("moderate", true)
    await append()
    await MainService.verify(verifyData)
    .then(e => {        
      MainService.sendToModerate(verification.id)
      .then(e => {
        handleLoading("moderate", false)
        history.push('/my-projects')
        success("Проект", "Поздравляем вы отправили проект на модерацию, ожидайте одобрения")
      })
      .catch(e => {
        console.log(e);
        handleLoading("moderate", false)
        error("Проект", "Не удалось отправить проект на модерацию, попробуйте еще раз")
      }) 
    })
    .catch(e => {
      error("Проект", "Не удалось отправить проект на модерацию, заполните все поля проекта")
      handleLoading("moderate", false)
    });
  }
  
  const cities = Storage.get('cities').map(city => {
    return {label: city.name, value: city.id}
  }) ?? []

  return (
    <>
      <div className={styles.row}>
        <LoadingOverlay visible={loading.verify} />
        <form>
          <div className={styles.wrapper}>
            <div className={styles.inputField}>
              <label className={styles.label}>
                <span className={styles.labelName}>
                  Автор проекта
                </span>
              </label>
              <div>          
                <TextInput
                  required
                  placeholder="Введите ваше имя"
                  type="text"
                  name="author"
                  value={verification.author || ''}
                  onChange={handleInput} 
                  variant="unstyled"
                  classNames={{
                    input: styles.input
                  }}
                  className="border-b border-slate-200"
                  disabled={posted}
                />
                <TextInput
                  required
                  placeholder="Введите вашу Фамилию"
                  type="text"
                  name="author_last_name"
                  value={verification.author_last_name || ''}
                  onChange={handleInput} 
                  variant="unstyled"
                  classNames={{
                    input: styles.input
                  }}
                  className="border-b border-slate-200"
                  disabled={posted}
                />
                <TextInput
                  required
                  placeholder="Введите ваше отчество"
                  type="text"
                  name="author_patronymic"
                  value={verification.author_patronymic || ''}
                  onChange={handleInput} 
                  variant="unstyled"
                  classNames={{
                    input: styles.input
                  }}
                  disabled={posted}
                />
              </div>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.inputField}>
              <label className={styles.label}>
                <span className={styles.labelName}>
                  Местонахождение
                </span>
              </label>
              <Select
                searchable
                name="city_id"
                onChange={e => setVerification({...verification, author_city_id: e})}
                data={cities}
                placeholder={cities[verification.author_city_id ?? 0]?.label}
                variant="unstyled"
                classNames={{
                  input: styles.input,
                  item: 'text-sm'
                }}
                disabled={posted}
              />
            </div>
          </div>

          <div className={styles.wrapper}>
            <div className={styles.inputField}>
              <label className={styles.label}>
                <span className={styles.labelName}>
                  ИИН/Номер паспорта
                </span>
              </label>
              <NumberInput
                required
                name="iin"
                value={verification.iin || ''}
                onChange={e => setVerification({...verification, iin: e})}
                placeholder="Удостоверение личности или Паспорт"
                variant="unstyled"
                classNames={{
                  input: styles.input
                }}
                disabled={posted}
              />
            </div>
          </div>

          <div className={styles.wrapper}>
            <div className={styles.inputField}>
              <label className={styles.label}>
                <span className={styles.labelName}>
                  Номер телефона
                </span>
              </label>
              <NumberInput
                required
                placeholder="+7-707..."
                name="phone"
                value={Number(verification.phone) || ''}
                onChange={e => setVerification({...verification, phone: e})}
                variant="unstyled"
                classNames={{
                  input: styles.input
                }}
                disabled={posted}
              />
            </div>
          </div>

        <div className={styles.wrapper}>
          <div className={styles.inputField}> 
            <label className={styles.label}>
              <span className={styles.labelNameWrap}>
                Фото уд.личности или паспорта (лицевая сторона)
              </span>
            </label>
            <input
              placeholder="Загрузить фото уд. личности"
              type="file"
              required
              name="front"
              onChange={handleDocument}
              className={styles.fileInput}
              disabled={posted}
            />
          </div>
        </div>
        <div className={`${styles.wrapper} border-b`}>
          <div className={styles.inputField}> 
            <label className={styles.label}>
              <span className={styles.labelNameWrap}>
                Фото уд.личности или паспорта (обратная сторона)
              </span>
            </label>
            <input
              placeholder="Загрузить фото уд. личности"
              type="file"
              required
              name="back"
              onChange={handleDocument}
              className={styles.fileInput}
              disabled={posted}
            />
          </div>
        </div>

          <div className="flex justify-center items-center mt-8">
            <Button 
              onClick={verify} 
              type="button" 
              className="mr-4"
              disabled={posted}>
              Сохранить
            </Button>

            <Button 
              onClick={e => setModal({...modal, moderate: true})} 
              color="green"
              type="button"
              disabled={posted}> 
              Отправить на модерацию
            </Button>
          </div>
        </form>

        <div className="ml-0 sm:ml-11">
          <div className="h-auto">
            <div className="mb-4">
              {(verification.document_front || document.front) && (
                <>
                  <span className="text-xs text-slate-600 uppercase">Лицевая сторона</span>
                  <img src={verification.document_front} alt="" />
                </>
              )}
            </div>
            <div>
              {(verification.document_back || document.back) && (
                <>
                  <span className="text-xs text-slate-600 uppercase">Обратная сторона</span>
                  <img src={verification.document_back} alt="" />
                </>
              )}
            </div>
          </div>
        </div>

      </div>  
      <Modal
        centered
        withCloseButton={false}
        opened={modal.moderate}
        onClose={e => setModal({...modal, moderate: false})}
        size="md"
      >
        <LoadingOverlay visible={loading.moderate}/>
        {verification.on_moderation === 0
          ?
            <div className="flex flex-col text-center">
              <p className="mb-5">Вы собираетесь отправить проект на рассмотрение в модерацию. Среднее время рассмотрения 7 дней, 
                для получения дополнительной информации куратор вашего проекта свяжется по вашему номеру телефона или по почте.
              </p>
              <div className="">
                <Button className="text-xs uppercase" color="green" onClick={toModerate}>
                  Отправить
                </Button>
              </div>
            </div>
          : 
            <div>
              <p>Ваш проект успешно отправлен на модерацию. Отслеживайте статус вашего проекта в профиле <Link to="/my-projects" className="link">"Мои проекты".</Link></p>
            </div>
        }
      </Modal>
    </>
  );
}

export default Verification;
