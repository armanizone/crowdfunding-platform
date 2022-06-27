import React from "react";
import { useParams } from 'react-router-dom';
import { useHistory, useLocation } from "react-router"

import HttpService from "../service/HttpService";
import RoleService from "../service/RoleService";

import { loggedIn, role, userId } from "../service/Auth";

import ProjectHead from "../includes/Project/ProjectHead";
import ProjectNav from "../includes/Project/ProjectNav";
import ProjectMain from "../includes/Project/ProjectMain";
import ProjectFee from "../includes/Project/ProjectFee";

import Cookies from "js-cookie";
import { Loader } from "@mantine/core";
import { Stuff } from "../modules";

export const ProjectContext = React.createContext()


const Project = ({projectData,  preview}) => {

  const {id, status} = useParams()

  const closed = status === 'closed'

  const history = useHistory()
  const location = useLocation().pathname

  const [project, setProject] = React.useState({});

  const [rewards, setRewards] = React.useState([])
  const [donation, setDonation] = React.useState({})

  const [loader, setLoader] = React.useState(false)

  const [lore, setLore] = React.useState([])
  const [comments, setComments] = React.useState([])

  const [premium, setPremium] = React.useState(false)

  const getReward = async id => {
    HttpService.getRewardByProjectId(id ?? projectData?.id)
    .then(response => {
      setRewards(response.data.filter(reward => {
        return reward?.name != "Благотворительная поддержка"
      }))
      setDonation(response.data.filter(reward => 
        reward.name == "Благотворительная поддержка"
      )?.[0])
    })
      .catch((err) => {
      console.log(err)
    });
  }

  const author = async () => {
    await RoleService.getByIdHistory2(id)
    .then(e => {
      setLore(e.data)
      console.log(e, "history");
      setPremium(true)
    })
    .catch(e => {
      history.push('/')
      Cookies.remove('user_id')
      history.go(0)
    })
    await RoleService.getDiary2(id)
    .then(e => {
      console.log(e, "comments");
      setComments(e.data)
    })
    .catch(e => {
      console.log(e);
    })
  }

  const roller = async () => {
    await RoleService.getByIdHistory(id)
    .then(e => {
      setProjectHistory(e.data)
      console.log(e, "history");
      setPremium(true)
    })
    .catch(e => {
      history.push('/')
      Cookies.remove('role')
      history.go(0)
    })
    RoleService.getDiary(id)
    .then(e => {
      console.log(e, "comments");
      setComments(e.data)      
    })
  }

  const getProject = async e => {
    if (!closed && !preview) {
      await HttpService.getByIdPosted(id)
     .then(e => {
       fetchData(e.data.user.id)
       setProject(e.data);
       setLoader(true)
     })
     .catch(e => {
       console.log(e);
       // history.push(`/error`)
     });
     return
    }
    if (closed && !preview) {
      await HttpService.getClosedById(id)
      .then(e => {
        setProject(e.data)
        console.log(e);
        setLoader(true)
      })
      return
    }
    if (preview) {
      setProject(projectData)
      setLoader(true)
    }
  }

  const fetchData = async e => {
    if (loggedIn()) {
      if (userId() == e) {
        author()
      }
      else if (role()) {
        roller()
      }
    }
  }


  React.useEffect(() => {
    getProject()
    getReward(id);
    return e => {
      setProject({})
      setRewards([])
      setDonation({})
      setLore([])
      setComments([])
      setPremium(false)
    }
  }, []);


  const state = status === "funding" ? 
    {
      active: true,
      status: "Активен",
      barColor: ['rgb(0, 235, 31)', '$blue'],
      buttonDisabled: false
    } 
  :
    {
      active: false,
      status: "Не активен",
      barColor: ['#c8c8c8, #c8c8c8'],
      buttonDisabled: true
    }


  const styles = {
    project: 'w-full my-6',
    projectInner: 'px-0 bg-border rounded-none',
    projectBody: 'flex flex-col',
    projectMain: 'flex flex-col md:flex-row justify-between mt-16',
  }

  const [tab, setTab] = React.useState(0)

  return (
    <div className={styles.project}>
      <div className={styles.projectInner}>
        <div className="container">
          {loader ?
            <div className={styles.projectBody}>
              <ProjectHead
                project={project}
                state={state}
                donation={donation}
                getProject={getProject}
              />
            <ProjectContext.Provider value={{project, tab, setTab, rewards, state, donation, premium, comments, lore, id}}>    
              <ProjectNav/>
              <div className={styles.projectMain}>
                <ProjectMain/> 
                <ProjectFee/>
              </div>
            </ProjectContext.Provider>
            </div>        
            : 
              <Stuff.Loaded/>
          }
        </div>
      </div>
    </div>
  );
}



export default Project;

