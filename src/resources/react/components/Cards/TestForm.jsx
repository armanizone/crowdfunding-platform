import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'

import { IoTime, IoLocation } from 'react-icons/io5'
import ProjectActions from "../Actions/ProjectActions"
import { Progress } from "@mantine/core"

import { format } from 'date-fns'
import { ru } from "date-fns/locale"

const styles = {
  projectForm: 'w-80 h-auto shadow-md h-full rounded-md flex mx-auto overflow-hidden flex-col relative font-body hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200',
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

function TestForm({project}) {

  const location = useLocation().pathname

  const obtained = project?.total_sum ?? 0;
  const total = project?.sum_of_money ?? 1;
  const percent = obtained*100/total;

  const collect =  new Intl.NumberFormat('ru-RU').format(Number(project?.total_sum ?? 0))

  const totalSum =  new Intl.NumberFormat('ru-RU').format(Number(project?.collected_money))
  const closedAt = project?.closed_at?.slice(0, 10)?.split("-").reverse().join("-");  

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
    if (closed) return "Завершился"
    if (raw) return "Создан"
    if (onModeration) return "На модерации"
    if (confirmed) return "Одобрен модерацией"
    if (recomended) return "Рекомендуемый"
  }


  const newDate = new Date();

  const now = newDate.getTime()
  const projectClosedAt = Date.parse(project?.closed_at) 

  const days = e => {
    return (
      project?.confirmed === 0 
        ? Math.ceil((projectClosedAt - now) / (1000 * 3600 * 24))
        : project?.days
    )
  }
  
  return (
    <div className={styles.projectForm}>
      <div>
        {project?.image 
          ? <img className={styles.img} src={project?.image ?? imgUrl}/> 
          : <div className={styles.imgFill}></div>
        }
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
                {days()} день/дней осталось
              </span>
            </div>
          </div>
        </div>

      </div>       
    </div>
  )
}


export default TestForm

