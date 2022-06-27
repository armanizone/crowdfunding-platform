import { Loader } from "@mantine/core";
import React from 'react';
import { ProjectForm } from '../../components'
import Stuff from "../../modules/Stuff";

function ShowCase({projects, loaded, title}) {

  if (loaded && projects?.length == 0) return <></>

  return (
    <div className="my-6">
      <div className="text-lx sm:text-2xl font-medium font-head mb-4"> 
        <span>
          {title}
        </span>
      </div>
      {loaded ? 
          <div className="projects">
            {projects.map(project => {
              return <ProjectForm project={project} key={project.id}/>
            })}
          </div> 
        : 
          <div className="w-full flex justify-center items-center h-96">
            <Loader size="xl" />
          </div>
      }
    </div>
  )
}

export default ShowCase;
