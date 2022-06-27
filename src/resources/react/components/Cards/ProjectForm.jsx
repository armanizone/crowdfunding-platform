import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'

import { IoTime, IoLocation } from 'react-icons/io5'
import ProjectActions from "../Actions/ProjectActions"
import { Progress } from "@mantine/core"

import { format } from 'date-fns'
import { ru } from "date-fns/locale"

const styles = {
  projectForm: 'w-80 shadow-md h-full bg-white rounded-md flex mx-auto overflow-hidden flex-col relative font-body hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 fade',
  status: 'text-green-600 text-sm px-4 py-3 font-medium tracking-[.07em] w-full border-b border-gray-200',
  img: 'aspect-video object-cover h-[180px]',
  imgFill: 'aspect-video w-full h-full bg-blue-400',
  body: 'px-5 py-4 flex-grow flex flex-col',
  title: 'text-lg leading-5 font-semibold font-head max-h-10 overflow-hidden',
  shortDescription: 'text-sm max-h-[80px] overflow-hidden flex-grow mt-2 mb-4 flex-grow',
  progressContainer: 'flex-shrink',
  progressLabel: 'text-sm text-slate-500',
  progressValue: 'text-sm font-medium ml-2',
  projectActions: 'px-5 pb-4 flex-shrink'
}

function ProjectForm({project, handleModal, launched, created}) {

  const location = useLocation().pathname
  const obtained = project?.total_sum ?? 0;
  const total = project?.sum_of_money ?? 1;
  const percent = obtained*100/total;

  const status = project?.confirmed === 0
    ? {
      link: 'funding',
      bar: ['rgb(0, 235, 31)', '$blue'],
      status: 'Активен'
    }
    : {
      link: 'closed',
      bar: ['#c8c8c8', '#c8c8c8'],
      status: 'Не активен'
    }

  const imgUrl = `${process.env.MIX_APP_URL}/${project?.image}`
  const link = `/project/${status.link}/${project?.id}`

  const active = project?.confirmed === 0
  const closed = project?.confirmed === 1 || project?.confirmed === 2
  const failed = project?.confirmed === 2
  const succesful = project?.confirmed === 1

  const raw = project?.confirmed == null
  const onModeration = project?.on_moderation === 1
  const confirmed = project?.category_id && !project?.closed_at
  const recomended = project?.recomended

  const projectStatus = e => {
    if (active) return "Активен"
    if (onModeration) return "На модерации"
    if (closed) return "Завершился"
    if (confirmed) return "Одобрен модерацией"
    if (recomended) return "Рекомендуемый"
    if (raw) return "Создан"
  }

  const projectImage = (
    raw ? 
      project?.image 
        ? <img className={styles.img} src={project?.image ?? imgUrl} onClick={e => handleModal('preview', true, project)}/> 
        : <div className={styles.imgFill} onClick={e => handleModal('preview', true, project)}></div>
    : 
      <Link to={link}>
        <img src={imgUrl} className={styles.img}/>
      </Link>
  )
  
  return (
    <div className={`${styles.projectForm}`}>
      <div>
        {projectImage}
      </div>
      <div className={styles.status}>
        <span>{projectStatus()}</span>
      </div>
      <div className={styles.body}>
        <div className="max-h-[140px] flex-grow">
          <div className={styles.title}>
            <span>{project?.title ?? "Название проекта"}</span>
          </div>
          <div className={styles.shortDescription}>
            <span>{project?.short_description ?? "Описание проекта"}</span>
          </div>     
        </div>
        <div className={styles.progressContainer}>
          {(active || launched) && <Active project={project} percent={percent}/>}
          {closed && <Closed project={project} percent={percent}/>}
          {(raw || created) && <Raw project={project} percent={percent}/>}
        </div>
      </div>     
      {location === "/my-projects" && (
        <div className={styles.projectActions}>
          <ProjectActions project={project}/>
        </div>   
      )}
    </div>
  )
}

const Active = ({project, percent}) => {

  const newDate = new Date();
  const now = newDate.getTime()
  const projectClosedAt = Date.parse(project?.closed_at) 
  const daysLeft = Math.ceil((projectClosedAt - now) / (1000 * 3600 * 24))
  const collect =  new Intl.NumberFormat('ru-RU').format(Number(project?.total_sum ?? 0))

  console.log(project);

  return (
    <div className="success_form">
      <div className="text-xs text-blue-400 mb-4">
        {project?.category_id}
      </div>

      <div className="flex justify-between items-end mb1">
        <div className="">
          <span className="text-sm mr-1.5">{collect}</span> 
          <span className="text-xs text-slate-500">ед.</span>
        </div>
        <div>
          <span className="text-slate-500 text-xs" style={{color: `${percent}` > 100 ? 'rgb(0, 235, 31)' : ''}}>{String(percent).substring(0, 4)}%</span>
        </div>
      </div>

      <div className='form_bar'>
        <Progress value={percent}/>
      </div>

      <div className="mt-7 flex items-center">
        <span className="text-xl text-slate-500 mr-1.5">
          <IoTime/>
        </span>
        <span className="text-xs text-slate-500">
          {isNaN(daysLeft) ? project?.days : daysLeft} день/дней осталось
        </span>
      </div>
    </div>
  )
}

const Closed = ({project, percent}) => {

  const collect =  new Intl.NumberFormat('ru-RU').format(Number(project?.collected_money))
  const sumOfMoney =  new Intl.NumberFormat('ru-RU').format(Number(project?.sum_of_money))
  const closedAt = project?.closed_at?.slice(0, 10)?.split("-").reverse().join("-");  
  const shit = format(new Date(), 'P', {locale: ru})

  return (
    <div className="success_form">
      <div className="text-xs text-slate-500 mb-4">
        {project?.category_id}
      </div>

      <div className="flex justify-between items-end mb1">
        <div>
          <span className="text-sm mr-1.5">{collect}</span> 
          <span className="text-xs text-slate-500">ед.</span>
        </div>
        <div>
          <span className="text-sm mr-1.5">{sumOfMoney}</span> 
          <span className="text-xs text-slate-500">ед.</span>
        </div>
      </div>

      <div className='form_bar'>
        <Progress value={percent}/>
      </div>

      <div className="mt-7 flex items-center">
        <span className="text-xl text-slate-500 mr-1.5">
          <IoTime/>
        </span>
        <span className="text-xs text-slate-500 ">
          {shit} завершился
        </span>
      </div>
    </div>
  )
}

const Raw = ({cities, project, sum}) => {

  const location = useLocation().pathname
  const projectCity = (
    location.includes("/admin/allProjects") || location.includes("/admin/zayavki")
    ? cities?.[project?.author_city_id - 1]?.name
    : project?.city_id
  )

  return (
    <div className="raw_form">
      <div className="mb-2">
        <span className={styles.progressLabel}>сумма ед.:</span>
        <span className={styles.progressValue}>{sum ?? "сумма не указана"}</span>
      </div>
      <div className="mb-2">
        <span className={styles.progressLabel}>город:</span>
        <span className={styles.progressValue}>{projectCity ?? "город не указан"}</span>
      </div>
      <div className="mb-2">
        <span className={styles.progressLabel}>длительность д.:</span>
        <span className={styles.progressValue}>{project?.days ?? "длительность не указана"}</span>
      </div>
      {project?.category_id != null && !project?.closed_at && (
        <div>
          <span className={styles.progressLabel}>категория</span>
          <span className={styles.progressValue}>{project?.category_id}</span>
        </div>
      )}
    </div>
  )
}

export default ProjectForm








