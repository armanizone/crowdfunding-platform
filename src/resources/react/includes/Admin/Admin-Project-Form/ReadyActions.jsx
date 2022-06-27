import React from 'react'

import { ImEye } from 'react-icons/im'
import { MdDeleteSweep } from 'react-icons/md'
import { FaUserEdit } from 'react-icons/fa'

export default function ReadyActions({project, handleModallActive, handleDelete, handleUser}) {
  return (
    <section className="raw-actions">
      <abbr title="Предосмотр">
        <button onClick={e => handleModallActive(project)}>
          <i><ImEye/></i>
        </button>
      </abbr>
      <abbr title="Данные пользователя" onClick={e => handleUser(project?.id)}>
        <button>
          <i><FaUserEdit/></i>
        </button>
      </abbr>
      <abbr title="Удалить" onClick={e => handleDelete(project?.id)}>
        <button  className="project-delete-btn">
          <i><MdDeleteSweep/></i>
        </button>
      </abbr>
    </section>
  )
}
