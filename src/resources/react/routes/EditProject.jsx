import React from "react";
import { Link, Route, Switch, useLocation, useParams, useHistory } from 'react-router-dom';

// Импорты страниц includes
import Details from '../includes/CreateProject/Details';
import Reward from '../includes/CreateProject/Reward';
import Verification from '../includes/CreateProject/Verification';


import { ImEye } from 'react-icons/im'
import HttpService from "../service/HttpService";

import RoleService from "../service/RoleService";
import Stuff from "../modules/Stuff";
import { Loader, Tabs } from "@mantine/core";
import { userId } from "../service/Auth";


export const styles = {
  create: 'my-6 w-full',
  createInner: 'bg-border',
  row: 'grid grid-cols-1 sm:grid-cols-[75%_25%] relative',
  wrapper: 'border-t border-x border-slate-200 relative',
  inputField: 'grid grid-cols-1 sm:grid-cols-[275px_auto]',
  label: ' sm:border-r border-slate-200 p-4 flex justify-between items-center',
  labelNameWrap: 'text-sm font-medium whitespace-normal',
  labelName: 'text-sm font-medium whitespace-nowrap ',
  labelIcon: 'text-lg text-blue-400',
  input: 'p-4 h-[50px]',
  fileInput: 'file:px-4 my-auto file:h-[50px] file:cursor-pointer cursor-pointer file:ml-4 block w-full text-sm text-slate-500 file:mr-2 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-400 hover:file:bg-blue-100',
  textarea: 'p-4 max-h-[120px] overflow-hidden resize-y',
  addtionalField: 'p-4 grid-cols-1 sm:grid-cols-[275px_auto]',
  checkField: 'flex flex-col w-full',
  checkLabel: 'p-4',
  error: 'px-4 pb-2 -mt-2 text-xs'
  // buttonWrapper: 'flex justify-between items-center mt-4'
}

const EditProject = (props) => {

  const history = useHistory()

  const {id, name} = useParams()
  const [current, setCurrent] = React.useState('raw')
  const raw = current === "raw"
  const posted = current === "posted"
  
  const [loader, setLoader] = React.useState(false)  
  
  const [project, setProject] = React.useState({
    id: '',
    title: '', 
    image: '',
    short_description: '',
    city_id: 1,
    sum_of_money: 0,
    video_or_animation: '', 
    detail_description: '',
  });
    
  const [rewards, setRewards] = React.useState([])

  const fetchData = async e => {
    await RoleService.getProjectById2(id)
    .then(e => {
      if (e.data.user?.id ?? e.data.user_id == userId()) {
        setProject(e.data);
        console.log(e.data);
        return
      }
      if (e.data?.on_moderation == 1) {
        history.goBack()
        return
      }
      history.goBack()
    })
    .catch(e => {
      console.log(e);
      HttpService.getByIdPosted(id)
      .then(e => {
        if (e.data.user?.id == userId()) {
          setProject(e.data);
          console.log(e);
          setCurrent("posted")
          return 
        }
        history.goBack()
      })
      .catch(e => {
        history.push('/error')
        console.log(e);
      });
    });

    await HttpService.getRewardByProjectId(id)
    .then(e => {
      setRewards(e.data.filter(reward => {
        return reward?.name != 'Благотворительная поддержка'
      }))
      console.log(e.data, "rewards");
      setLoader(true)
    })
      .catch((err) => {
      console.log(err)
      setLoader(true)
    });
  }
  
  React.useEffect(() => {
    fetchData()
    return e => {
      setProject({})
      setLoader(false)
      setRewards([])
    }
  }, []);


  const handleTabs = e => {
    switch(e) {
      case 0:
        history.push(`/edit-project/details/${id}`) 
        break
      case 1:
        history.push(`/edit-project/reward/${id}`)
        break
      case 2: 
        history.push(`/edit-project/verification/${id}`)
        break
    }
  }

  const [tab ,setTab] = React.useState(0)

  const checkTab = e => {
    switch(name) {
      case "details": return 0
      case "reward": return 1
      case "verification": return 2
    }
  }

  React.useEffect(e => {
    setTab(checkTab())
  }, [name])


  return(
    <div className={styles.create}>
      <div className="container">
        <div className={styles.createInner}>
          {loader 
            ?
              <Tabs tabPadding="md" onTabChange={handleTabs} active={tab} classNames={{
                tabLabel: 'text-lg font-medium font-head'
              }}>
                <Tabs.Tab label="Детали проекта">
                  <Details 
                    project = {project}
                    raw={raw}
                    posted={posted}
                    setProject={setProject}
                    id={id}
                    {...props}
                  />
                </Tabs.Tab>
                <Tabs.Tab label="Вознаграждения">
                  <Reward 
                    project={project}
                    rewards={rewards}
                    setRewards={setRewards}
                    id={id} 
                    raw={raw}
                    posted={posted}
                    {...props}
                  />
            
                </Tabs.Tab>
                <Tabs.Tab label="Верификация" disabled={posted}>
                  <Verification 
                    author={project}
                    id={id}
                    raw={raw}
                    posted={posted}
                    {...props}
                  />
                </Tabs.Tab>
              </Tabs> 
            : 
              <Stuff.Loaded/>
          }
        </div>
      </div>
    </div>
  )
}

export default EditProject



