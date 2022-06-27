import React from 'react'
import { ProjectContext } from "../../routes/Project"

function ProjectNav({tab, setTab}) {

  const {toggleState, toggleTab} = React.useContext(ProjectContext)

  return (
    <div className="project_nav">
      <div className={`flex`}>
        <button 
          className={tab === 1 ? `block` : `hidden`} 
          onClick={e => setTab(1)}>
            Детали проекта
        </button>
        <button 
          className={tab === 2 ? `block` : `hidden`}
          onClick={e => setTab(2)}>
          История проекта
        </button>
        <button 
          className={tab === 3 ? `block` : `hidden`} 
          onClick={e => setTab(3)}>
          Дневник автора
        </button>
      </div>
      <button 
        className={tab === 4 ? `block` : `hidden`} 
        onClick={e => setTab(4)}
        style={{maxWidth: 320}}
        >
        Вознаграждения
      </button>
    </div>
  )
}

export default ProjectNav