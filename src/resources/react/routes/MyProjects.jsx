import React from 'react'

import MainService from "../service/MainService";
import HttpService from "../service/HttpService";
import RoleService from "../service/RoleService";

import { ProjectForm } from "../components";


import { Stuff } from "../modules";
import { LoadingOverlay, Modal, Button, Loader } from "@mantine/core";
import Project from "./Project";
import Notify from "../service/Notify";

export const ActionContext = React.createContext()

function MyProjects () {

  const {success, error} = Notify()

  const [posted, setPosted] = React.useState([])
  const [projects, setProjects] = React.useState([])
  const [closed, setClosed] = React.useState([])
  const [successful, setSuccessFul] = React.useState([])

  const postedSorted = posted.sort((a, b) => {
    return (a.closed_at === null) - (b === null) || + (a.closed_at>b) || - (a.closed_at<b);
  }).filter(project => {
    return project?.confirmed === 0
  })  

  
  const projectSorted = projects.sort((a, b) => {
    return parseFloat(b.on_moderation) - parseFloat(a.on_moderation)
  })  

  React.useEffect(e => {
    setClosed(posted?.filter(project => {
      return project?.confirmed == 2
    }))
    setSuccessFul(posted?.filter(e => {
      return e.confirmed == 1
    }))
  }, [posted])



  const [project, setProject] = React.useState({})
  const [reward, setReward] = React.useState([])

  const [loading, setLoading] = React.useState({
    button: false,
    layout: false,
  })

  const [modal, setModal] = React.useState({
    preview: false,
    delete: false,
    confirmDelete: false,
    launch: false,
  })

  const [modalCondition, setModalCondition] = React.useState({
    launch: false,
    delete: false,
  })

  const handleCondition = (name, value) => {
    return setModalCondition({...modalCondition, [name]: value})
  }

  const handleLoading = (name, value) => {
    return setLoading({...loading, [name]: value})
  }

  const handleModal = (modalName, value, projectData) => {
    if (projectData?.id != project.id) setReward([])
    if (modalName === 'preview' && projectData?.id != project.id) {
      HttpService.getRewardByProjectId(projectData?.id)
      .then(e => {
        console.log("fetched");
        setReward(e.data.filter(reward => {
          return reward.name != 'Благотворительная поддержка'
        }))
      })
    }
    setModal({...modal, [modalName]: value})
    setProject(projectData ?? {...project})
  }

  const deleteProject = id => {
    handleLoading('button', true)
    if (project?.confirmed != 0 && project?.confirmed != 1 && project?.confirmed != 2) {
      console.log("raw");
      RoleService.deleteRawProjectById(project?.id)
      .then(e => {
        MainService.getProjectByUser()
        .then(e => {
          setProjects(e.data)
          handleLoading('button', false)
          handleModal('delete', false)
          success("Проект", `Проект ${project?.title} успешно удален`)
        })
      })
      .catch(e => {
        handleLoading('button', false)
        error("Проек", "Не удалось удалить проект, попробуйте еще раз")
      })
    } else {
      console.log("posted");
      RoleService.endPostedById({project_id: project?.id})
      .then(e => {
        console.log(e);
        MainService.getPostedByUser()
        .then(e => {  
          setPosted(e.data) 
          handleLoading('button', false)
          handleModal('delete', false)
          success("Проект", `Проект ${project?.title} успешно удален`)
        })
      })
      .catch(e => {
        handleLoading('button', false)
        error("Проек", "Не удалось удалить проект, попробуйте еще раз")
      })
    }
  }
  
  const launchProject = id => {
    handleLoading('button', true)
    MainService.postProject(id)
    .then(e => {
      MainService.getPostedByUser()
      .then(e => {  
        setPosted(e.data) 
        handleLoading('button', false)
        handleModal('launch', false)
        success("Проект", `Поздравляем! Ваш проект успешно запущен`)
      })
    })
    .catch(e => {
      handleLoading('button', false)
      error("Проект", "Не удалось запустить проект, попробуйте позже")
    })
  }

  const fetchData = async e => {
    await MainService.getPostedByUser()
    .then(e => {  
      setPosted(e.data)
      console.log(e.data, "posted");
    })
    await MainService.getProjectByUser()
    .then(e => {
      setProjects(e.data)
      console.log(e.data, "projects");
    })
    handleLoading('layout', true)
  }

  React.useEffect(()  => {
    fetchData()
    return e => {
      setPosted([])
      setProjects([])
      setModal({})
      setProject({})
      setReward([])
    }
  }, [])  

  const styles = {
    projects: 'w-full my-6',
    projectsInner: 'bg-border mb-6',
    row: 'gap-x-2 gap-y-6 projects',
  }

  const launched = postedSorted?.map((project, index) => {
    return <ProjectForm project={project} key={index} handleModal={handleModal} />
  })

  const raw = projectSorted?.map((project, index) => {
    return <ProjectForm project={project} key={index} handleModal={handleModal} />
  })

  return (
    <>
      <ActionContext.Provider value={{handleModal, project}}>
        <div className={styles.projects}>
          <div className="container">
            <div className={styles.projectsInner}>
              {loading.layout 
                ? 
                  <>
                    {projects?.length < 1 ? 
                        <div className="w-full h-96 flex justify-center items-center">
                          <p>У вас еще нет созданных проектов</p>
                        </div>
                      : 
                        <>
                          <div className="mb-6">
                            <span className="font-head font-medium text-2xl sm:text-3xl">
                              Ваши проекты
                            </span>
                          </div>
                          <div className={styles.row}>
                            {launched}
                            {raw}
                          </div>
                        </>
                    }
                    {closed?.length != 0 &&
                      <>
                        <div className="my-6">
                          <span className="font-head font-medium text-2xl sm:text-3xl">
                            Не активные проекты
                          </span>
                        </div>
                        <div className={styles.row}>
                          {closed?.map((project, index) => {
                            return <ProjectForm project={project} key={index} handleModal={handleModal}/>
                          })}
                        </div>
                      </>
                    }
                    {successful?.length != 0 &&
                      <>
                        <div className="my-6">
                          <span className="font-head font-medium text-2xl sm:text-3xl">
                            Успешные проекты
                          </span>
                        </div>
                        <div className={styles.row}>
                          {successful?.map((project, index) => {
                            return <ProjectForm project={project} key={index} handleModal={handleModal}/>
                          })}
                        </div>
                      </>
                    }
                  </>
                : 
                  <Stuff.Loaded/>
              }
            </div>
          </div>
        </div>
        <Modal 
          opened={modal.preview}
          onClose={e => setModal({...modal, preview: false})}
          centered
          radius="md"
          withCloseButton={false}
          size="100%"
          overflow="inside"
        >
          <Project projectData={project} preview/>
        </Modal>
        
        <Modal 
          opened={modal.delete}
          onClose={e => handleModal('delete', false)}
          centered
          withCloseButton={false}
          size="lg"
        >
          <LoadingOverlay visible={loading.button} />
          {modalCondition.delete 
            ? 
              <p className="">проект успешно удален</p>
            : (
              <div className="">
                <p>Удалить проект {project?.title}, это действие не обратимо</p> 
                <div className="text-center mt-6">
                  <Button onClick={deleteProject} className="mr-4">
                    Удалить
                  </Button>
                  <Button color="red" onClick={e => handleCondition('delete', true)}>
                    Назад
                  </Button>
                </div>
              </div>
            )
          }
        </Modal>
        <Modal 
          opened={modal.launch}
          onClose={e => setModal({...modal, launch: false})}
          centered
          size="lg"
          withCloseButton={false}
        >
          <LoadingOverlay visible={loading.button} />
          <div className="text-center">
            <p>
              Вы готовитесь к запуску, начиная с этого момента ваш проект начнет сбор средств, и отобразится 
              в общей вкладке 'Все проекты' и любой желающий сможет его посетить
            </p>
            <Button className="mt-4" color="green" onClick={e => launchProject(project?.id)}>Запустить</Button>
          </div>
          
        </Modal>
      </ActionContext.Provider>
    </>
  )
}

export default MyProjects