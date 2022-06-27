import React from 'react'
import { Link } from 'react-router-dom'

import { ImEye } from 'react-icons/im'
import { MdDeleteSweep } from 'react-icons/md'

import { IoMdRocket } from 'react-icons/io'
import { Button } from "@mantine/core"
import { ActionContext } from "../../routes/MyProjects"

function ProjectActions({project}) {

  const {handleModal} = React.useContext(ActionContext)

  const created = project?.on_moderation === 0
  const onModeration = project?.on_moderation === 1
  const confirmed = project?.category_id && !project?.closed_at
  const launched = project?.category_id && project?.closed_at && project?.confirmed === 0
  const failed = project?.confirmed === 2 
  const succesful = project?.confirmed === 1

  if (created) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            component={Link}
            to={`/edit-project/details/${project?.id}`}
            className="mr-2" 
            variant="outline"
          >
            Редактировать
          </Button> 
  
          <Button 
            onClick={e => handleModal('preview', true, project)} 
            title="предпросморт"
          >
            <span className="text-lg"><ImEye/></span>
          </Button>
        </div>
  
  
        <Button
          onClick={e => handleModal('delete', true, project)} 
          title="удалить"
          color="red"
        >
          <span className="text-lg"><MdDeleteSweep/></span>
        </Button>
      </div>
    )
  } 
  if (onModeration) {
    return (
      <div className="flex items-center justify-between">
        <Button 
          onClick={e => handleModal('preview', true, project)} 
          title="предпросмотр"
        >
          <span className="text-lg"><ImEye/></span>
        </Button>
      </div>
    )
  } 
  if (confirmed) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            onClick={e => handleModal('launch', true, project)}
            leftIcon={<IoMdRocket/>}
            variant="outline"
            color="green"
            className="mr-2"
          >
            Запустить
          </Button>
  
          <Button 
            onClick={e => handleModal('preview', true, project)}
            title="предпросмотр"
            radius="md"
          >
            <span className="text-lg"><ImEye/></span>
          </Button>
        </div>
  
  
        <Button 
          onClick={e => handleModal('delete', true, project)} 
          className="project-delete-btn" 
          title="удалить"
          radius="md"
        >
          <span className="text-lg"><MdDeleteSweep/></span>
        </Button>
      </div>
    ) 
  } 
  if (launched) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            component={Link}
            to={`/edit-project/details/${project?.id}`}
            className="mr-2" 
            variant="outline"
          >
            Редактировать
          </Button> 
          
          <Button 
            component={Link}
            to= {`/project/funding/${project?.id}`} 
            title="просмотр"
          >
            <span className="text-lg"><ImEye/></span>
          </Button>
        </div>

        <Button 
          onClick={e => handleModal('delete', true, project)} 
          title="удалить"
          color="red"
        >
          <span className="text-lg"><MdDeleteSweep/></span>
        </Button>
      </div>
    )
  }
  if (failed) {
    return (
      <div className="flex items-center justify-between">
        <Button 
          component={Link}
          to= {`/project/closed/${project?.id}`} 
          title="смотреть"
        >
          <span className="text-lg"><ImEye/></span>
        </Button>
        <Button 
          onClick={e => handleModal('delete', true, project)} 
          title="Удалить"
          color="red"
        >
          <span className="text-lg"><MdDeleteSweep/></span>
        </Button>
      </div>
    )
  }
  if (succesful) {
    return (
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Button 
            component={Link}
            to={`/project-users/${project?.id}`} 
            className='mr-2'
            variant="outline"
          >
            Детали доставки
          </Button>

          <Button 
            component={Link}
            to= {`/project/closed/${project?.id}`} 
            title="Cмотреть"
          >
              
            <span className="text-lg"><ImEye/></span>
          </Button>
        </div>
        <p className="text-sm mt-3">
          Поздравляем проект завершился успешно!
        </p>
      </div>
    )
  }
  return null
}

export default ProjectActions