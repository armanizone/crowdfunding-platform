import React from 'react'
import { RewardForm } from "../../components";
import { ProjectContext } from "../../routes/Project";

import { useClickOutside } from "@mantine/hooks";

function ProjectFee() {

  const {rewards, user, project,} = React.useContext(ProjectContext)

  const [selected, setSelected] = React.useState({
    id: null,
    value: false,
  })

  const handleSelected = (reward, value) => {
    setSelected({...selected, id: reward.id, value: value})
  }

  const ref = useClickOutside(e => setSelected({id: null, value: null}))

  return (
    <div className="relative">
      <div className="text-base md:text-lg mb-5 font-head border-b border-slate-300 pb-2">
        <span>Вознаграждения</span>
      </div>
      <div className="flex flex-col gap-y-8" ref={ref}>
        {rewards.map((item, index) => {
            return (
              <RewardForm 
                key={index} 
                reward={item} 
                selected={selected} 
                handleSelected={handleSelected} 
                buy
              />
            )
        })}
      </div>
    </div>
  )
}

export default ProjectFee

