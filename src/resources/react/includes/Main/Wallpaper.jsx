import React from 'react'
import { Link } from 'react-router-dom'

function Wallpaper ({projects}) {

  const wallpaper = `${process.env.MIX_APP_URL}/images/main-wallpaper.jpg`

  return (
    <div className="wallpaper">
    <div className="wallpaper-inner">
      <img src={wallpaper} alt="" />
      <div className="wallpaper-title">
        <h1>Наши проекты</h1>
      </div>
      <div className="wallpaper-links">
        {projects.map(project => {
          return (
            <div key={project.id} className="wallpaper-link"><Link to={`/project/${project.id}`} className="wallpaper-Link">{project.title}</Link></div>
          )
        })}
      </div>
    </div>
  </div>
  )
}

export default Wallpaper