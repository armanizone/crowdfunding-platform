 import { Button } from "@mantine/core";
import React from "react";
import { Link } from 'react-router-dom';

import "../../../sass/modules/carousel-slider.scss"


export default function Carousell({carousell}) {

  const slide1 = (process.env.MIX_APP_URL + '/images/slide1.jpg') 
  const slide2 = (process.env.MIX_APP_URL + '/images/slide2.jpg')
  const slide3 = (process.env.MIX_APP_URL + '/images/slide3.jpg')
  const slide4 = (process.env.MIX_APP_URL + '/images/slide4.jpg')


   React.useEffect(() => {
      start()
      return 
   }, [])
   const [slide, setSlide] = React.useState(1)
   const handlePrevSlide = () => {

   }
   const handleNextSlide = () => {

}
  function start(){	
  let i = 1;
  function Move(){ 	
    i = (i%4)+1; // 4 is the Number of image in slider
    if (document.getElementById('i'+i)) {
      document.getElementById('i'+i).checked = true;
    } 
  }
    setInterval(Move,10000); 
  }
    return (

  <div className="slider">
    <input type="radio" id="i1" name="images" defaultChecked />
    <input type="radio" id="i2" name="images" />
    <input type="radio" id="i3" name="images" />
    <input type="radio" id="i4" name="images" />
    <div className="slide_img" id="one">			
      <div className="slide-content1">
        <img className="content-img" src={carousell?.[0]?.image} alt="" />
          <div className="content-body">
            <h2>{carousell?.[0]?.title}</h2>
            <p>{carousell?.[0]?.description}</p>
            <Button component="a" href={`${carousell?.[0]?.link}`} size="md">
              Поддержать
            </Button>
          </div>
      </div>
      <img className="slider-background-img" src={carousell?.[0]?.image} />
      <label onClick={handlePrevSlide} className="prev" htmlFor="i4"><span /></label>
      <label onClick={handleNextSlide} className="next" htmlFor="i2"><span /></label>	
    </div>
    <div className="slide_img" id="two">
    <div className="slide-content1">
      <img className="content-img" src={carousell?.[1]?.image} alt="" />
          <div className="content-body">
            <h2>{carousell?.[1]?.title}</h2>
            <p>{carousell?.[1]?.description}</p>
            <Button component="a" href={`${carousell?.[1]?.link}`} size="md">
              Перейти
            </Button>
          </div>
      </div>
      <img className="slider-background-img" src={carousell?.[1]?.image} />
      <label className="prev" htmlFor="i1"><span /></label>
      <label className="next" htmlFor="i3"><span /></label>
    </div>
    <div className="slide_img" id="three">
    <div className="slide-content1">
      <img className="content-img" src={carousell?.[2]?.image} alt="" />
            <div className="content-body">
            <h2>{carousell?.[2]?.title}</h2>
            <p>{carousell?.[2]?.description}</p>
            <Button component="a" href={`${carousell?.[2]?.link}`} size="md">
              Пожертвовать
            </Button>
          </div>
      </div>
      <img className="slider-background-img" src={carousell?.[2]?.image} />
      <label className="prev" htmlFor="i2"><span /></label>
      <label className="next" htmlFor="i4"><span /></label>
    </div>
    <div className="slide_img" id="four">
    <div className="slide-content1">
      <img className="content-img" src={carousell?.[3]?.image} alt="" />
          <div className="content-body">
            <h2>{carousell?.[3]?.title}</h2>
            <p>{carousell?.[3]?.description}</p>
            <Button component="a" href={`${carousell?.[3]?.link}`} size="md">
              Подробнее
            </Button>
          </div>
    </div>
    <img className="slider-background-img" src={carousell?.[3]?.image} />
      <label className="prev" htmlFor="i3"><span /></label>
      <label className="next" htmlFor="i1"><span /></label>
    </div>

    <div id="nav_slide">
      <label htmlFor="i1" className="dots" id="dot1" />
      <label htmlFor="i2" className="dots" id="dot2" />
      <label htmlFor="i3" className="dots" id="dot3" />
      <label htmlFor="i4" className="dots" id="dot4" />
    </div>
  </div>
  );
}

