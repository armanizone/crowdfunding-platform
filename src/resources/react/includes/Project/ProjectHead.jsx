import { Avatar, Button, LoadingOverlay, Modal, NumberInput, Progress } from "@mantine/core";
import React from 'react'
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import { loggedIn, userId } from "../../service/Auth";
import MainService from "../../service/MainService";
import Notify from "../../service/Notify";
import Storage from "../../service/Storage";

const styles = {
  head: 'flex w-full grid grid-cols-1 md:grid-cols-[grid-cols-[auto_450px]] 2xl:grid-cols-[auto_550px] lg:grid-cols-[auto_450px]',
  right: 'pl-0 pt-4 lg:pt-0 lg:pl-8 flex flex-col h-full',
  left: 'w-full',
  img: 'aspect-video  w-full shadow-lg object-cover rounded-lg overflow-hidden',
  imgFill: 'aspect-video  w-full shadow-lg object-cover rounded-lg overflow-hidden bg-blue-400',
  categories: 'flex justify-between items-center -mx-2',
  categoryLabel: 'p-2 text-lg font-head font-medium',
  status: 'uppercase text-green-600 text-sm md:text-base mb-2 font-medium tracking-wide',
  title: 'text-2xl md:text-3xl font-semibold font-head',
  description: 'text-base md:text-lg mt-2 mb-7',
  author: 'flex pl-3 mb-7',
  authorAbout: 'ml-3',
  authorName: 'font-head font-medium',
  authorCity: 'text-slate-600',
  progress: '',
}

function ProjectHead({project, state, donation,getProject }) {

  const {success, error} = Notify()

  const history = useHistory()

  const total = project?.sum_of_money 
  const obtained = project?.total_sum 
  const percent = obtained*100/total;

  const url = project?.video_or_animation
  const [video, setVideo] = React.useState(null)

  React.useEffect(() => {
    if (url === null) {
      setVideo(false)
    } else if (url === "null"){
      setVideo(false)
    } else if (url === undefined) {
      setVideo(false)
    } else if (url) {
      setVideo(true)
    }
  },[url])
  
  const image = (img) => {
    return `${process.env.MIX_APP_URL}/${img}`
  }

  const [modal, setModal] = React.useState(false)

  const handleModal = e => {
    if (!loggedIn()) {
      history.push("/login")
      return
    }
    setModal(e)
  }

  const user = Storage.get('user')

  
  const [donate, setDonate] = React.useState({
    user_id: userId(),
    project_id: project?.id,
    reward_id: donation?.id,
    sum: 100,
    count: 1
  })
  
  React.useEffect(e => {
    setDonate({...donate, project_id: project?.id, reward_id: donation?.id})
  }, [project, donation])

  const [err, setErr] = React.useState('')

  React.useEffect(e => {
    if (user?.wallet < donate.sum) setErr('Недостаточно средств на счету')
    else setErr('')
  }, [donate.sum])

  const handleSum = e => {
    const regex = /^[0-9\b]+$/
    if (e || regex.test(e)) setDonate({...donate, sum: e})
  }

  const [loading, setLoading] = React.useState(false)

  const pay = e => {
    setLoading(true)
    console.log(donate);
    MainService.createPayment(donate)
    .then(e => {
      console.log(e);
      getProject()
      success("Пожертвование", `Вы успешно пожертвовали проекту ${donate.sum} ед.`)
      setLoading(false)
      setModal(false)
    })
    .catch(e => {
      console.log(e);
      error("Пожертвование", "Что-то пошло не так, не удалось пожертвовать проекту")
      setLoading(false)
      setModal(false)
    })
  }

  return (
    <>
      <div className={styles.head}>
        <div className={styles.left}>
          {video ? 
            <ReactPlayer
              url={url}
              light={image(project?.image)}
              controls={true}
              className={styles.img}
              width="inherit"
              height="inherit"
            /> 
            :
              project?.image 
                ? <img src= {image(project?.image)} className={styles.img} /> 
                : <div className={styles.imgFill}></div>
            
          }
          <div className={styles.categories}>
            <span className={styles.categoryLabel}>{project?.category_id}</span>
            <span className={styles.categoryLabel}>{project?.city_id}</span> 
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.status}>
            <span>
              {state.status}
            </span>
          </div>
          <div className={styles.title}>
            <h3>
              {project?.title ?? "Название проекта"}
            </h3>
          </div>
          <div className={styles.description}>
            <p>
              {project?.short_description ?? "Описание проекта"}
            </p>
          </div>
          <div className={styles.author}>
            <Avatar src={project?.user?.image} alt="" radius="xl" size={50} />
            <div className={styles.authorAbout}>
              <p className={styles.authorName}>{project?.user?.name}</p>
              <p className={styles.authorCity}>
                Автор проекта
              </p>
            </div>
          </div>
          <div className="progress mb-7">
            <div className="flex justify-between">
              <div className="collected">
                <span className="text-xl font-medium mr-2 ">{project?.total_sum}</span>
                <span className="text-slate-500">ед.</span>
              </div>
              <div className="backers">
                <span className="text-slate-500">{project?.baked} раз </span>
                <span className="text-slate-500">поддержали</span>
              </div>
            </div>
            <Progress 
              value={percent}
              size="lg"
              className="my-2"
            />
            <div className="flex justify-between ">
              <div className="goal">
                <span className="text-slate-500">{isNaN(percent) ? 0 : percent}% из <span className="link text-black text-lg font-medium">{project?.sum_of_money}</span> </span>
                <span className="text-slate-500">ед.</span>
              </div>
              <div className="lasted">
                <span className="">{project?.days ?? 0}</span>
                <span className=""> д. осталось</span>
              </div>
            </div>
          </div>
          <div className="action">
            <Button onClick={e => handleModal(true)} className="red text-sm uppercase" size="lg" disabled={state.buttonDisabled} fullWidth>
              Пожертвовать
            </Button>
          </div>
        </div>
      </div>
      <Modal
        opened={modal}
        onClose={e => handleModal(false)}
        centered 
        withCloseButton={false}
      >
        <LoadingOverlay visible={loading} />
        <div className="relative">
          <div className="text-center">
            <span className="font-semibold text-xl">Поддержать проект на любую сумму</span>
            <p className="text-slate-400 text-sm mb-4">
              Спасибо, мне не нужно вознаграждение, я просто хочу поддержать проект.
            </p>
          </div>
          <div>
            <NumberInput 
              value={donate.sum}
              onChange={handleSum}
              error={err}
              maxLength="7"
              hideControls
            />
            <Button className="text-xs uppercase mt-4" disabled={user?.wallet < donate.sum} fullWidth onClick={pay} >
              поддержать на {donate.sum} ед.
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ProjectHead