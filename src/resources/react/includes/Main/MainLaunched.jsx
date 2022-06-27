import React from "react";
import ProjectForm from "../../modules/ProjectForm";
import Loader from './../../modules/Loader';



export default function MainLaunched({projects, loaded}) {
    return (
        <div className="grid-layout">
           <div className="style_head">
              <hr className="main-hr" />
              <div className="text1"> Только что запустились </div>
            </div>
            {loaded ? 
              <div className="project-form-container">
                {projects.slice(-3).map(project => {
                return <ProjectForm project={project} key={project.id}/>
              }).reverse()}
              </div> 
            : 
              <Loader/>
            }
        </div>
    );
}
