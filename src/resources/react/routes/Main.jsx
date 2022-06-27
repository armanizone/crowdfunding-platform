import React from "react";
import Kraud from "../includes/Main/Kraud";
import ShowCase from "../includes/Main/ShowCase";
import HttpService from "../service/HttpService";
import Carousell from './../includes/Main/Carousel';


const Main = () => {

  const [projects, setProjects] = React.useState([])
  const [carousel, setCarousel] = React.useState([])
  const [loaded, setLoaded] = React.useState(false)


  const recomended = projects.filter(project => {
    return project.recomended === "1" 
  })

  const launched = projects.slice(-3).reverse()

  const fetchData = async e => { 
    HttpService.getCarousel()
    .then(e => {
      setCarousel(e.data)
    })
    await HttpService.getPosted()
    .then(e => {
      setProjects(e.data)
    })
    setLoaded(true)
  }

  React.useEffect(e => {
    fetchData()
    return e => {
      setProjects([])
      setCarousel([])
      setLoaded(false)
    }
  }, [])

  return ( 
    <main>
      <Carousell carousell={carousel}/>
      <div className="container">
        <ShowCase projects={recomended} loaded={loaded} title="Рекомендованные" />
      </div>

      <div className="container">
        <ShowCase projects={launched} loaded={loaded} title="Только что запустились" />
      </div>

      {/* <Wallpaper projects={projects}/> */}

      <Kraud />
  
    </main>
  );
};

export default Main;
