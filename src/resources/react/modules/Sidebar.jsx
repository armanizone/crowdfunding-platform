import React from 'react'
import { useHistory, } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const SideBar = ({ctg, setCategory, projects, ended}) => {
    const [activeItem,setActiveItem] = useState(0);

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
      <div className="sidebar">
        {ctg ?.map((item,index) => 
          <button 
          key = {`${item}_${index}`}
          onClick={()=> onSelectItem(index)} 
          className={activeItem === index ? 'sidebar-active' : ''}
          >{item.title}</button>)}
      </div>
  )
}

export default SideBar