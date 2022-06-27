import React, { useState, useEffect } from "react";
import axios from "axios";
import HttpService from "../../service/HttpService";
import AdminService from "../../service/AdminService";


const Slider = ({sliderData ,setLoading}) => {

const [slider, setSlider] = useState([])
const [slide, setSlide] = useState(
  {
    id: null,
    title: '',
    description: '',
    image: '',
    link: ''
  }
)
const handleSlide = index => {
  setSlide(slider[index])
}

useEffect(e => {
  setSlider(sliderData)
}, [sliderData])

const [message, setMessage] = useState("");

const handleInputChange = event => {
const { name, value } = event.target;
  setSlide({ ...slide, [name]: value });
};

const updateSlider = () => { 
setLoading(true)
  AdminService.updateCarousell(slide)
  .then(response => {
  console.log(response.data);
  setMessage("Карусель обновился!!!!!");
  setLoading(false)
  })
  .catch(e => {
  console.log(e);
  setLoading(false)
  });
};


  return (
    <>
      <div className="admin_slider">
        <div className="admin_slider_body">
          {slider.map((Slide, index) => {
            return (
              <div className="admin_slider_element" key={index}>
                <div className="slide_main_image">
                  <img 
                    src={slide.image != "" && slide.id === Slide.id
                      ? slide.image 
                      : Slide.image} 
                    alt="" />
                  <button onClick={e => handleSlide(index)}>Редактировать</button>
                </div>
                <div className="slide_main_body">
                  <div className="slide_body_element">
                    <div>Заголовок</div>
                    <div>{Slide.title}</div>
                  </div>
                  <div className="slide_body_element">
                    <div>Описание</div>
                    <div>{Slide.description}</div>
                  </div>
                  <div className="slide_body_element">
                    <div>Ссылка на изображение</div>
                    <div>{Slide.image}</div>
                  </div>
                  <div className="slide_body_element">
                    <div>Ссылка</div>
                    <div>{Slide.link}</div>
                  </div>
                </div>
              </div>
            )
          })}

        </div>

        <div className="slider_form" >
          <h4>{slide.id} страница карусели</h4>
          <div className="create-inner size3">
          <label className="size">Заголовок</label>
          <input
            name="title"
            className="create-input"
            placeholder="Заголовок проекта"
            type="text"
            value={slide?.title}
            onChange={handleInputChange}
          />
          </div>
          <div className="create-inner size3">
            <label className="size">Ссылка изображение</label>
            <input
              name="image"
              className="create-input"
              placeholder="Ссылка изображения из проекта /.img"
              type="text"
              value={slide?.image}
              onChange={handleInputChange}
            />
          </div>

          <div className="create-inner size3">
            <label className="size">Описание</label>
            <input 
              name="description"
              className="create-input"
              placeholder="Описание проекта"
              type="text"
              value={slide?.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="create-inner size3">
            <label className="size">Ссылка проекта</label>
            <input
              name="link"
              className="create-input"
              placeholder="Ссылка проекта на сайте"
              type="text"
              value={slide?.link}
              onChange={handleInputChange}
            />
          </div>
          <div className="slider_form_btn">
            <button onClick={updateSlider} type="button">Сохранить</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Slider


// <div className="admin-slider">
//   <form>
//     <div className="box-shadow" onClick={e => setSlideId(slide1.id)}>
//     <h4>Первая страница карусели</h4>
//     <div className="create-inner size3">
//     <label className="size">Заголовок</label>
//     <input
//       name="title"
//       className="create-input"
//       placeholder="Заголовок проекта"
//       type="text"
//       value={slide1.title}
//       onChange={handleInputChange}
//     />
//     </div>
//     <div className="create-inner size3">
//       <label className="size">Ссылка изображение</label>
//       <input
//         name="image"
//         className="create-input"
//         placeholder="Ссылка изображения из проекта /.img"
//         type="text"
//         value={slide1.image}
//         onChange={handleInputChange}
//       />
//     </div>

//     <div className="create-inner size3">
//       <label className="size">Описание</label>
//       <input 
//         name="description"
//         className="create-input"
//         placeholder="Описание проекта"
//         type="text"
//         value={slide1.description}
//         onChange={handleInputChange}
//       />
//     </div>

//     <div className="create-inner size3">
//       <label className="size">Ссылка проекта</label>
//       <input
//         name="link"
//         className="create-input"
//         placeholder="Ссылка проекта на сайте"
//         type="text"
//         value={slide1.link}
//         onChange={handleInputChange}
//       />
//     </div>
//     <div className="create-inner size3">
//       <button onClick={updateSlider1} type="button">Сохранить</button>
//     </div>
//     </div>
//     <div className="box-shadow">
//     <h4>Вторая страница карусели</h4>
//     <div className="create-inner size3">
//     <label className="size">Заголовок</label>
//     <input
//       name="title"
//       className="create-input"
//       placeholder="Заголовок проекта"
//       type="text"
//       value={slide2.title}
//       onChange={handleInputChange2}
//     />
//     </div>
//     <div className="create-inner size3">
//       <label className="size">Ссылка изображение</label>
//       <input
//         name="image"
//         className="create-input"
//         placeholder="Ссылка изображения из проекта /.img"
//         type="text"
//         value={slide2.image}
//         onChange={handleInputChange2}
//       />
//     </div>

//     <div className="create-inner size3">
//       <label className="size">Описание</label>
//       <input 
//         name="description"
//         className="create-input"
//         placeholder="Описание проекта"
//         type="text"
//         value={slide2.description}
//         onChange={handleInputChange2}
//       />
//     </div>

//     <div className="create-inner size3">
//       <label className="size">Ссылка проекта</label>
//       <input
//         name="link"
//         className="create-input"
//         placeholder="Ссылка проекта на сайте"
//         type="text"
//         value={slide2.link}
//         onChange={handleInputChange2}
//       />
//     </div>
//     <div className="create-inner size3">
//       <button onClick={updateSlider2} type="button">Сохранить</button>
//     </div>
//     </div>
//     <div className="box-shadow">
//     <h4>Третья страница карусели</h4>
//     <div className="create-inner size3">
//     <label className="size">Заголовок</label>
//     <input
//       name="title"
//       className="create-input"
//       placeholder="Заголовок проекта"
//       type="text"
//       value={slide3.title}
//       onChange={handleInputChange3}
//     />
//     </div>
//     <div className="create-inner size3">
//       <label className="size">Ссылка изображение</label>
//       <input
//         name="image"
//         className="create-input"
//         placeholder="Ссылка изображения из проекта /.img"
//         type="text"
//         value={slide3.image}
//         onChange={handleInputChange3}
//       />
//     </div>

//     <div className="create-inner size3">
//       <label className="size">Описание</label>
//       <input 
//         name="description"
//         className="create-input"
//         placeholder="Описание проекта"
//         type="text"
//         value={slide3.description}
//         onChange={handleInputChange3}
//       />
//     </div>

//     <div className="create-inner size3">
//       <label className="size">Ссылка проекта</label>
//       <input
//         name="link"
//         className="create-input"
//         placeholder="Ссылка проекта на сайте"
//         type="text"
//         value={slide3.link}
//         onChange={handleInputChange3}
//       />
//     </div>
//     <div className="create-inner size3">
//       <button onClick={updateSlider3} type="button">Сохранить</button>
//     </div>
//     </div>
//     <div className="box-shadow">
//     <h4>Четвертая страница карусели</h4>
//     <div className="create-inner size3">
//     <label className="size">Заголовок</label>
//     <input
//       name="title"
//       className="create-input"
//       placeholder="Заголовок проекта"
//       type="text"
//       value={slide4.title}
//       onChange={handleInputChange4}
//     />
//     </div>
//     <div className="create-inner size3">
//       <label className="size">Ссылка изображение</label>
//       <input
//         name="image"
//         className="create-input"
//         placeholder="Ссылка изображения из проекта /.img"
//         type="text"
//         value={slide4.image}
//         onChange={handleInputChange4}
//       />
//     </div>

//     <div className="create-inner size3">
//       <label className="size">Описание</label>
//       <input 
//         name="description"
//         className="create-input"
//         placeholder="Описание проекта"
//         type="text"
//         value={slide4.description}
//         onChange={handleInputChange4}
//       />
//     </div>

//     <div className="create-inner size3">
//       <label className="size">Ссылка проекта</label>
//       <input
//         name="link"
//         className="create-input"
//         placeholder="Ссылка проекта на сайте"
//         type="text"
//         value={slide4.link}
//         onChange={handleInputChange4}
//       />
//     </div>
//     <div className="create-inner size3">
//       <button onClick={updateSlider4} type="button">Сохранить</button>
//     </div>
//     </div>
//   {/* <button type= "submit">
//     Обновить Карусель
//   </button> */}
//   </form>
// </div>