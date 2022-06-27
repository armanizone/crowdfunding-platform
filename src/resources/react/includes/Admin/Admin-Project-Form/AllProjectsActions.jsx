import React from 'react'

import { FaUserEdit } from 'react-icons/fa'
import { MdDeleteSweep } from 'react-icons/md'
import { ImEye } from 'react-icons/im'

export default function AllProjectsActions({project, handleModallActive, handleDelete, }) {
  return (
    <>
    <section className="raw-actions">
      <abbr title="Предосмотр">
        <button onClick={e => handleModallActive(project)}>
          <i><ImEye/></i>
        </button>
      </abbr>
      <abbr title="Удалить" onClick={e => handleDelete(project?.id)}>
        <button  className="project-delete-btn">
          <i><MdDeleteSweep/></i>
        </button>
      </abbr>
    </section>
    </>
  )
}
