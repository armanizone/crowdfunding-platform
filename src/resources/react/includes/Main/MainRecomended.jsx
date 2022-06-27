import React from "react";
import ProjectForm from "../../modules/ProjectForm";
import Loader from './../../modules/Loader';


export default function MainRecomended({projects, loaded}) {

  return (
    <div className="grid-layout">
      <div className="style_head">
        <hr className="main-hr" />
        <div className="text1"> Рекомендованные </div>
      </div>

      {loaded ? 
        <div className="project-form-container">
          {projects.filter(project => {
            return project.recomended === "1" 
          }).map(project => {
            return <ProjectForm project={project} key={project.id}/>
          })}
        </div> 
            : 
        <Loader/>
      }
    </div>
  );
}
