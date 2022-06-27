import React from 'react';
import SideBar from '../includes/AllProjects/Sidebar';
// import ProjectForm from '../modules/ProjectForm';
import { CgSearch } from 'react-icons/cg'
import {ProjectForm} from "../components";
import Stuff from "../modules/Stuff";
import HttpService from "../service/HttpService";
import { Loader, TextInput } from "@mantine/core";
// import EndedForm from './../modules/Project-Form/EndedForm';


const ctg = [
  {title: 'Все проекты', slug: 'all'},
  {title: 'Рекомендуемые', slug: 'recomended'},
  {title: 'Новые', slug: 'new'},
  {title: 'Бизнес', slug: 'bussiness'},
  {title: 'Еда', slug: 'food'},
  {title: 'Технологии', slug: 'tech'},
  {title: 'Инновации', slug: 'inv'},
  {title: 'Образование', slug: 'education'},
  {title: 'Разное', slug: 'other'},
  {title: 'Завершенные', slug: 'ended'},
]

const AllProjects = ({}) => {
  
  const [search, setSearch] = React.useState("")
  const [category, setCategory] = React.useState([])
  const [projects, setProjects] = React.useState([])
  const [ended, setEnded] = React.useState([])
  const [loader, setLoader] = React.useState(false)
  
  React.useEffect(e => {
    setCategory(projects)
  }, [projects])

  const fetchData = async e => {
    await HttpService.getPosted()
    .then(e => {
      setProjects(e.data)
    })
    await HttpService.getClosed()
    .then(e => {
      setEnded(e.data)
    })
    setLoader(true)
  }

  React.useEffect(e => {
    fetchData()
    return e => {
      setSearch("")
      setCategory([])
      setProjects([])
      setEnded([])
      setLoader(false)
    }
  }, [])

  const searched = category?.filter(project => {
    return project?.title?.toLowerCase().includes(search)
  })

  const styles = {
    all: 'w-full my-6',
    allInner: 'px-0 bg-border rounded-none',
    row: 'projects gap-y-8 min-h-[500px]',
    sort: '',
  }

   return (
      <div className={styles.all}>
        <div className={styles.allInner}>
          <div className="container">
            <div className={styles.sort}>          
              <SideBar ctg={ctg} setCategory={setCategory} projects={projects} ended={ended}/>
              <div className="max-w-xs my-6 mx-auto">
                <TextInput placeholder="Поиск" onChange={e => setSearch(e.target.value)} rightSection={<CgSearch/>} classNames={{input: 'bg-slate-50'}}/>
              </div>
            </div> 
            {loader 
              ?
                searched?.length != 0 ?
                  <div className={styles.row}>  
                    {searched?.map((project) => {
                      return (
                        <ProjectForm project={project} key={project.id}/>
                      )
                    })}
                  </div> 
                : 
                  <div className="min-h-[500px] w-full flex justify-center items-center">
                    <span className="text-lg">
                      Проекты не найдены...
                    </span>
                  </div>
              : 
                <Stuff.Loaded/>
            }
          </div>
        </div>          
      </div>
   )
}

export default AllProjects
