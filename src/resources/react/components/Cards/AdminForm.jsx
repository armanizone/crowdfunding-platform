import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import ZayavkiActions from '../Actions/ZayavkiActions';
import AllProjectsActions from '../Actions/AllProjectsActions';
import ReadyActions from '../Actions/ReadyActions';
import ConfirmedActions from '../Actions/ConfirmedActions';


function AdminForm({
  project, 
  handleModallActive,
  cities ,
  handlePass, 
  handleDelete,
  handleUser,  
  handleProjectView,
  handleProjectDelete}) {

  const location = useLocation().pathname

  // ------------------------------incidator--------------------------
  const obtained = project?.total_sum ?? 0;
  const total = project?.sum_of_money ?? 0;
  const percent = obtained*100/total;
  
  // ------------------------------incidator--------------------------
  // ------------------------------days------------------------------
  const newDate = new Date();
  const now = newDate.getTime()
  const projectClosedAt = Date.parse(project?.closed_at) 
  const daysLeft = Math.ceil((projectClosedAt - now) / (1000 * 3600 * 24)) 
  const collect =  new Intl.NumberFormat('ru-RU').format(Number(project?.total_sum ?? 0))

  // ------------------------------days------------------------------

  return (
    <>
    <div className="project-form-item">
      <div className="project-form-img">

        {project?.recomended === "1" 
          ? <div className="form-recomend">рекоменендуемый</div>
          : null
        }
        <Link to= {`/project/${project?.id}`}>
          <img src= {`${process.env.MIX_APP_URL}/${project?.image}`} />
        </Link>
      </div>

           
      <div className="project-item-body">
        <p className="project-title">
          {project?.title}
        </p>
        <div className="project-description">
          {project?.short_description}
        </div>

        <div className="project-progress-container">

          <div className="project-progress">
            <div>
              <span className="project-progress-big">
                {typeof project?.city_id == "number" 
                  ? cities?.[project?.city_id - 1]?.name
                  : project.city_id} 
              </span>
            </div>

            <div>
              <span className="project-progress-small" >{project?.category_id}</span>
            </div>
          </div>

          <div className= 'barBody'>
            <div className='indicator' 
              style={{width:`${percent}%`, backgroundColor: `${percent}` > 100 ? 'rgb(0, 235, 31)' : '$blue' }}>
              <p style={{color: `${percent}` > 100 ? 'rgb(0, 235, 31)' : ''  }}>{String(percent).substring(0, 4)}%</p>
            </div>
          </div>

          <div className="project-progress">
            <div>
              <span>{collect}</span>
              <span>собрано</span>
            </div>
            <div>
              <span>
                {project?.days}  
              </span>
              <span>д. Длительность</span>
            </div>
          </div>
        </div>
      </div>
      <div className="projectForm-actions">
        {location === "/admin/allProjects" && 
          <AllProjectsActions 
            project={project}
            handleModallActive={handleModallActive}
            handleDelete={handleDelete}
          />
        }

        {location === "/admin/zayavki" &&             
          <ZayavkiActions 
            project={project} 
            handleDelete={handleDelete} 
            handlePass={handlePass} 
            handleModallActive={handleModallActive}
            handleUser={handleUser}
          />
        }

          {location === "/admin/readytogo" &&
            <ReadyActions
              project={project}
              handleDelete={handleDelete}
              handleUser={handleUser}
              handleModallActive={handleModallActive}
            />
          }
          {location === "/admin/confirmed" && 
            <ConfirmedActions
              project={project}
              handleModallActive={handleModallActive}
              handleProjectView={handleProjectView}
              handleProjectDelete={handleProjectDelete}
            />
          }
      </div>
  </div>
</>

  )
}

export default AdminForm








