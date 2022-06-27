import React from 'react'


import { MdDeleteSweep } from 'react-icons/md'
import { FaUserEdit } from 'react-icons/fa'
import { ImEye } from 'react-icons/im'

export default function ZayavkiActions({project, handleDelete, handlePass, handleUser, handleModallActive }) {
  
  return (
    <section className="raw-actions">
      <div>
      <abbr title="Предосмотр">
        {/* <Link to={`/preview/${project.id}`}> */}
          <button onClick={e => handleModallActive(project)}>
            <i><ImEye/></i>
          </button>
        {/* </Link> */}
      </abbr>
      <abbr title="Данные пользователя" onClick={e => handleUser(project)}>
        <button>
          <i><FaUserEdit/></i>
        </button>
      </abbr>

      <button onClick={e => handlePass(project)} style={{marginLeft: '10px'}}>
        Одобрить
      </button>
    
      </div>
      <abbr title="Удалить" onClick={e => handleDelete(project)}>
        <button  className="project-delete-btn">
          <i><MdDeleteSweep/></i>
        </button>
      </abbr>
    </section>
  )
}
