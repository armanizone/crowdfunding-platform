import React from 'react'
import { Loader, Tabs } from "@mantine/core"
import { RewardForm } from "../../components"
import { ProjectContext } from "../../routes/Project"
import History from "./History"
import Comments from "./Comments"


function ProjectMain() {

  const {tab, setTab, project } = React.useContext(ProjectContext)

  return (
    <div className="min-h-[500px]">
      <Tabs 
        tabPadding="xl"
        classNames={{
          tabLabel: 'text-base md:text-lg'
        }}
        className="w-full"
        active={tab}
        onTabChange={e => setTab(e)}
      >
        <Tabs.Tab label="Детали проекта">
          <div dangerouslySetInnerHTML={{__html: project.detail_description}}></div>
        </Tabs.Tab>
        <Tabs.Tab label="История проекта">
          {/* <History/> */}
        </Tabs.Tab>
        <Tabs.Tab label="Дневник автора">
          <Comments/>
        </Tabs.Tab>
        <Tabs.Tab label="Экспертное-мнение"> 
          Бизнес инкубатор
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}



export default ProjectMain