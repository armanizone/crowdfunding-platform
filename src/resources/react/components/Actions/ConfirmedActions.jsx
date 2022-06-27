import React from 'react'

import { ImCross } from 'react-icons/im'
import { ImArrowUp } from 'react-icons/im'
import { ImEye } from 'react-icons/im'
import { BsThreeDotsVertical } from 'react-icons/bs'

export default function ConfirmedActions({project, handleModallActive, handleProjectView, handleProjectDelete}) {
  return (
    <section className="raw-actions">
      <abbr title="Предосмотр">
        <button onClick={e => handleProjectView(project)}>
          <i><ImEye/></i>
        </button>
      </abbr>
      {project.recomended === "1" 
        ? 
          <abbr onClick={e => handleModallActive(project)}>
            <button>
              <i><ImCross/></i>
            </button>
          </abbr>
        : 
        <>
          <abbr onClick={e => handleModallActive(project)}>
            <button>
              <i><ImArrowUp/></i>
            </button>
          </abbr>

          <abbr className="popup_dots">
            <i>
              <BsThreeDotsVertical/>
            </i>
            <ul className="popup_list">
              <li>остановить</li>
              <li onClick={e => handleProjectDelete(project.id)}>удалить</li>
            </ul>
          </abbr>
        </>}
    </section>
  )
}
