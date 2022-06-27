import React from "react";
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { Editor } from '@tinymce/tinymce-react';
import editorInit from "../../service/EditorInit";

import { CgDanger } from 'react-icons/cg'
import { FaArrowRight } from 'react-icons/fa'
import MainService from "../../service/MainService";
import { Button, Collapse, LoadingOverlay, NumberInput, Select, Slider, Textarea, TextInput, Tooltip } from "@mantine/core";
import { ProjectForm, TestForm } from "../../components";
import Storage from "../../service/Storage";
import { styles } from "../../routes/EditProject";
import { useDebouncedValue } from "@mantine/hooks";
import RoleService from "../../service/RoleService";
import Notify from "../../service/Notify";


function Details ({project, setProject,id, raw, posted}) {

  const {success, error} = Notify()

  const [debounced] = useDebouncedValue(project, 1000)

  const [loading, setLoading] = React.useState({
    layout: false,
    save: false,
  })

  const handleLoading = (name, value) => {
    setLoading({...loading, [name]: value})
  }

  const editorRef = React.useRef();
  const [editorValue, setEditorValue] = React.useState()
  const handleEditorChange = () => {
    const data = editorRef.current.getContent()
    setEditorValue(data)
  }
  React.useEffect(() => {
    setEditorValue(project.detail_description)
    editorInit.images_upload_url = `/api/v1/uploadImage/${id}`
  }, [id])

  
  const [days, setDays] = React.useState(30)
  const [image, setImage] = React.useState()
  const [sum, setSum] = React.useState(0)

  const handleSumChange = e => {
    const regex = /^[0-9\b]+$/
    if (!e|| regex.test(e)) setSum(e)
  }

  React.useEffect(e => {
    if (!image) return
    setProject({...project, image: URL.createObjectURL(image)})
  }, [image])
  
  React.useEffect(e => {
    setProject({...project, sum_of_money: sum})
  }, [sum])

  React.useEffect(e => {
    setProject({...project, days: days})
  }, [days])


  const handleInputChange = e => {
    const { name, value } = e.target;
    setProject({...project, [name]: value });
  };  

  const projectFormData = new FormData();
  const postedFormData = new FormData();

  const append = async e => {
    projectFormData.append('id', id);
    projectFormData.append('image', image || '');
    projectFormData.append('title', project.title || '');
    projectFormData.append('short_description', project.short_description || '');
    projectFormData.append('city_id', project.city_id || 1);
    projectFormData.append('sum_of_money', project.sum_of_money || '');
    projectFormData.append('days', days);
    projectFormData.append('video_or_animation', project.video_or_animation || '');
    projectFormData.append('detail.description', editorValue || '')
  }

  const appenPosted = async e => {
    postedFormData.append('project_id', project.id || id); 
    postedFormData.append('image', project.image || image); 
    postedFormData.append('title', project.title || ''); 
    postedFormData.append('short_description', project.short_description || ''); 
    postedFormData.append('video_or_animation', project.video_or_animation || '');
    postedFormData.append('detail.description', editorValue || '')
    postedFormData.append('collected_money', project.collected_money)
    postedFormData.append('confirmed', project.confirmed || '')
    postedFormData.append('days_left', project.days_left || days)
  }

  const updateProject = async () => {
    handleLoading('save', true)
    if (raw) {
      await append()
      await MainService.update(projectFormData)
      .then(e => {
        console.log(e.data);
        handleLoading('save', false)
        success("Детали", "Изменения сохранены успешно!")
      })
      .catch(e => {
        console.log(e);
        handleLoading('save', false)
        error("Детали", "Не удалось сохранить изменения, попробуйте перезагрузить страницу и попробовать еще раз")
      });
      return 
    }
    await appenPosted()
    RoleService.updatePosted(postedFormData)
    .then(e => {
      console.log(e);
      success("Обновление проекта", "Обновления отправлены, ожидайте ответа модератора")
      handleLoading('save', false)
    })
    .catch(e => {
      console.log(e);
      handleLoading('save', false)
    });
  };

  const cities = Storage.get('cities').map(city => {
    return {label: city.name, value: city.id}
  }) ?? []
  
  return (
    <div className={styles.row}>
      <form>
        <LoadingOverlay visible={loading.save} />
        <div className={styles.wrapper}>
          <div className={styles.inputField}>
            <label className={styles.label}>
              <span className={styles.labelName}>
                Название проекта
              </span> 
              <Tooltip 
                label="Заголовок который будет представлять ваш проект (обязательное поле)"
                withArrow
                width={280}  
                wrapLines
                transition="fade"
                transitionDuration={200}
              >
                <span className={styles.labelIcon}>
                  <CgDanger/>
                </span>
              </Tooltip>
            </label>
            <TextInput
              minLength="3"
              maxLength="70"
              classNames={{
                input: styles.input,
                error: styles.error
              }}
              placeholder="Не более 50 символов"
              type="text"
              name ="title"
              value={project.title || ''}
              onChange={handleInputChange}
              required
              variant="unstyled"
              disabled={posted}
            />
          </div>
        </div>
        <div className={styles.wrapper} >
          <div className={styles.inputField}>
            <label className={styles.label}>
              <span className={styles.labelName}>
                Главное изображение проекта 
              </span>
              <Tooltip
                withArrow
                width={280}  
                wrapLines
                transition="fade"
                transitionDuration={200}
                label="Рекомендуемое изображение (16:9)"
              >
                <span className={styles.labelIcon}>
                  <CgDanger/>
                </span>
              </Tooltip>
            </label>

            <div className="flex items-center relative overflow-hidden">
              <input 
                type="file" 
                accept="image/*"
                name="image"
                className={styles.fileInput}
                onChange={e => setImage(e.target.files[0])}
                required
                disabled={posted}
              />
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputField}>
            <label className={styles.label}>
              <span className={styles.labelName}>
                Коротко о проекте
              </span>
              <Tooltip
                withArrow
                width={280}  
                wrapLines
                transition="fade"
                transitionDuration={200}
                label="Вкратце опишите что представляет ваш проект (обязательное поле)"
              >
                <span className={styles.labelIcon}>
                  <CgDanger/>
                </span>
              </Tooltip>
            </label>
        
            <Textarea
              name ="short_description"
              value={project.short_description || ''}
              onChange={handleInputChange}
              placeholder="Описание не более 146 символов"
              required
              variant="unstyled"
              classNames={{
                input: styles.textarea
              }}
            />
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputField}>
            <label className={styles.label}>
              <span className={styles.labelName}>
                Сумма сбора 
              </span>
              <Tooltip
                withArrow
                width={280}  
                wrapLines
                transition="fade"
                transitionDuration={200}
                label="Сумма которую необходимо достичь за время длительности проекта (обязательное поле)"
              >
                <span className={styles.labelIcon}>
                  <span><CgDanger/></span>
                </span>
              </Tooltip>
            </label>
            <NumberInput 
              placeholder="Сумма будет указана в единицах"
              type="text"
              name ="sum_of_money"
              value={project.sum_of_money}
              onChange={handleSumChange}
              required
              variant="unstyled"
              classNames={{
                input: styles.input
              }}
              disabled={posted}
            />
          </div>
        </div>
        <div className={styles.wrapper} >
          <div className={styles.inputField}>
            <label className={styles.label}>
              <span className={styles.labelName}>
                Длительность проекта
              </span>
              <Tooltip
                withArrow
                width={280}  
                wrapLines
                transition="fade"
                transitionDuration={200}
                label="Длительность указана в днях (в среднем проекты длятся 30 дней, минимум 10, максимум 90 дней)"
              >
                <span className={styles.labelIcon}>
                  <span><CgDanger/></span>
                </span>
              </Tooltip>
            </label>
            <Slider
              value={days}
              max={90}
              min={10}
              classNames={{
                root: styles.input
              }}
              name="days"
              onChange={setDays}
              disabled={posted}
            />
          </div>
        </div>
        <div className={styles.wrapper} >
          <div className={styles.inputField}>
            <label className={styles.label}>
              <span className={styles.labelName}>
                Город проекта
              </span>
            </label>
              <Select
                searchable
                name="city_id"
                onChange={e => setProject({...project, city_id: e})}
                data={cities}
                placeholder={cities[project.city_id ?? 0]?.label}
                variant="unstyled"
                classNames={{
                  input: styles.input,
                  item: 'text-sm'
                }}
                disabled={posted}
              />
          </div>
          
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inputField}>
            <label className={styles.label}>
              <span className={styles.labelName}>
                Видео или анимация
              </span>
              <Tooltip     
                withArrow
                width={280}  
                wrapLines
                transition="fade"
                transitionDuration={200}
                label="Выбранное видео будет на странице проекта"
              >      
                <span className={styles.labelIcon}>
                  <CgDanger/>
                </span>
              </Tooltip>
            </label>
            <div>
              <TextInput 
                type="text"
                name="video_or_animation"
                value={project.video_or_animation || ''}
                onChange={handleInputChange}
                placeholder="Вставьте ссылку на видео (https://www.youtube.comwatch/?v=cIwRQwAS_YY)"
                variant="unstyled"
                classNames={{
                  input: `${styles.input} border-b border-slate-200`
                }}
              />
              <Collapse in={project?.video_or_animation}>
                <div className="p-4 text-center">
                  <ReactPlayer
                    className='aspect-video'
                    url={project.video_or_animation}
                    controls={true}
                    width="inherit"
                    height="inherit"
                  />
                </div>
              </Collapse>
            </div>
      
          </div>
        </div>
                
        <div className={`${styles.wrapper} border-b`}>
          <div className={styles.inputField}>
            <label htmlFor="editor" className={`${styles.label} max-w-[275px]`} >
              <span className={styles.labelName}>
                Детальное описание
              </span>
              <Tooltip
                withArrow
                width={280}  
                wrapLines
                transition="fade"
                transitionDuration={200}
                label="Подробно опишите ваш проект, желательно добавить изображения и фото отчеты деятельности. 
                Укажите ваши сроки реализации денежных средств или пошаговый бизнес план.
                В данном пункте пользователи должны понимать что представляет ваш проект. 
                (Заполняемые данные будут отображаться на главной странице проекта) Ширина поля: 750px,
                Высота максимальная: 10'000px."
              >
                <span className={styles.labelIcon}>
                  <CgDanger/>
                </span>
              </Tooltip>
            </label>

            <div className="pos-abs">
            <Editor
              initialValue={project.detail_description}
              onInit={(evt, editor) => editorRef.current = editor}
              init={(editorInit)}
              onChange={handleEditorChange}
          />

            </div>
          </div>
        </div>
      
        <div className="flex justify-center items-center mt-8">
          <Button  
            className="red" 
            onClick = {updateProject} 
            type="button" 
          > 
            Сохранить
          </Button>
        </div> 
      </form>
      <div className="ml-0 sm:ml-11">
        <TestForm project={debounced} launched created={false} />
      </div>
    </div>
  );
}



export default Details;
