import { Button } from "@mantine/core";
import React from 'react'

const SideBar = ({ctg, setCategory, projects, ended}) => {
    const [activeItem,setActiveItem] = React.useState(0);

    const recomendedProjects = projects.filter(project => {
      return project?.recomended === "1"
    })

    const newProjects = projects?.slice().reverse()

    const bussiness = projects.filter(project => {
      return project?.category_id === "БИЗНЕС"
    }) 
    const food = projects.filter(project => {
      return project?.category_id === "ЕДА"
    }) 
    const tech = projects.filter(project => {
      return project?.category_id === "ТЕХНОЛОГИИ"
    }) 
    const inv = projects.filter(project => {
      return project?.category_id === "ИННОВАЦИИ"
    }) 
    const education = projects.filter(project => {
      return project?.category_id === "ОБРАЗОВАНИЕ"
    }) 
    const other = projects.filter(project => {
      return project?.category_id === "РАЗНОЕ"
    }) 

    const array = [
      projects,
      recomendedProjects,
      newProjects,
      bussiness,
      food,
      tech,
      inv,
      education,
      other,
      ended
    ] 

  const onSelectItem = async (index) => {
        setCategory(array[index])
        setActiveItem(index);
    };
    return (
      <div className="flex justify-between flex-wrap gap-x-2 gap-y-3">
        {ctg ?.map((item,index) => 
          <Button 
            key = {`${item}_${index}`}
            onClick={()=> onSelectItem(index)} 
            className="text-base"
            variant={activeItem === index ? "light" : "subtle"}
            >{item.title}
          </Button>
        )}
      </div>
  )
}

export default SideBar