import React, { useState } from 'react'
import { ProjectForm } from "../../components";

export default function Ended({projects, cities}) {

  
  const [search, setSearch] = useState('')

  const searched = projects.filter(e => {
    return e?.title?.toLowerCase().includes(search)
  })

  return (
    <div className= "allProjects admin-projects">
      <h1>
        Все проекты 
      </h1> 
      <div className="app-search">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по названию" />
      </div>

      <div className="projectAll-form-container admin-projects-inner">  
        {searched.map(project => {
          return <ProjectForm project={project} key={project.id} cities={cities}/>
        })}

      </div> 
  
  
    </div>
  )
}
