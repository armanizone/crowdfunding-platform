import React from 'react'
import { Link } from 'react-router-dom';
import { loggedIn } from "../service/Auth";
import { useHistory } from 'react-router-dom'
import MainService from "../service/MainService";
import Storage from "../service/Storage";

import { Button, Loader, LoadingOverlay, Modal } from "@mantine/core";

const createMain = `${process.env.MIX_APP_URL}/images/create-main.png`

function CreateProject() {

  const history = useHistory();

  const [loading, setLoading] = React.useState(false)
  const [loader, setLoader] = React.useState(false)

  const createProject = async () => {
    setLoading(true)
    await MainService.createNew()
    .then(e=> {
      setLoading(false)
      console.log(e.data.id);
      setTimeout(() => {
        history.push(`/edit-project/details/${e.data.id}`);
      }, 100);
    })
    .catch(e => {
      console.log(e);
      setLoading(false)
    })
  };

  const [agree, setAgree] = React.useState(false);

  const checkboxHandler = () => {
    // if agree === true, оно поменяеться на false
    // if agree === false, оно поменяеться на true
    setAgree(!agree);
  }

  const [modal, setModal] = React.useState(false); 

  const user = Storage.get('user')

  const styles = {
    rules: 'my-6 w-full',
    rulesInner: 'grid grid-cols-1 bg-border md:grid-cols-[80%_20%] lg:grid-cols-[80%_20%] relative',
    title: 'mb-3 text-xl md:text-2xl lg:text-3xl font-head font-bold',
    imgContainer: 'relative',
    img: 'aspect-video mb-3',
    list: 'mb-4 text-sm',
    listTitle: 'text-lg md:text-xl lg:text-2xl font-bold mt-6 mx-0 mb-3',
    listBody: 'mb-4 text-sm before:h-2 before:w-2 before:rounded-full before:border-blue-400 before:border-2 before:inline-block before:mr-2',
    support: 'my-6',
    warnBody: 'text-sm opacity-90 mb-2 before:h-1 before:w-1 before:rounded-full before:border-gray-400 before:border-2 before:inline-block before:mr-2',
    right: 'pt-6 sm:pt-0 sm:pb-9 sm:pl-6',
    rightTitle: 'text-sm font-bold mb-2',
    rulesLogin: 'rounded-md border-red-500 border-l-2 bg-red-50 p-5',
    rulesWarning: 'rounded-md border-yellow-500 border-l-2 bg-yellow-50 p-5',
    rulesPassed: 'rounded-md border-blue-400 border-l-2 bg-blue-50 p-5 flex flex-wrap lg:flex-nowrap',
    passChachbox: 'sm: mx-auto my-0',
    passLabel: 'flex-grow px-2 text-sm',
    passedButton: 'red flex-shrink w-full mx-2 mt-5 lg:mt-0 lg:w-52'
  }

  React.useEffect(e => {
    if (user || loggedIn()) setLoader(true)
  }, [])

  return (
    <>
      <div className={styles.rules}>
        <div className="container">
          <div className={styles.rulesInner}>
            <LoadingOverlay visible={loading} />
            <div className="left">
              <h1 className={styles.title}>Правила создания проекта на <span className="text-blue-400">Lorem, ipsum dolor</span>.</h1>
              <div className="rules_video">
                <img src={createMain} alt="" />
              </div>
              <div className="rules_list">
                <div className="list">
                  <p className={styles.listTitle}>Ваш проект будет допущен до сбора средств, если:</p>
                  <ul>
                    <li className={styles.listBody}>цель и условия вашего проекта четко сформулированы и соответствуют <span className="link">правилам нашего сервиса</span>;</li>
                    <li className={styles.listBody}>заданы временные рамки проекта и/или его финансовая цель;</li>
                    <li className={styles.listBody}>четко определены вознаграждения участникам проекта и порядок их получения.</li>
                  </ul>
                </div>

                <div className="list">
                  <p className={styles.listTitle}>Вы можете открыть проект на Lorem, ipsum dolor., если:</p>
                  <ul>
                    <li className={styles.listBody}>вам исполнилось 18 лет;</li>
                    <li className={styles.listBody}>у вас имеется действующий счет в банке;</li>
                    <li className={styles.listBody}>вы или ваша компания отвечаете требованиям, установленным в <span className="link">правилах нашего сервиса</span>.</li>
                  </ul>
                </div>

                <div className="list">
                  <p className={styles.listTitle}>Создание проекта происходит следующим образом:</p>
                  <ul>
                    <li className={styles.listBody}>вы заполняете все необходимые поля редактора проекта, по возможности следуя инструкциям;</li>
                    <li className={styles.listBody}>проект отправляется на рассмотрение модераторам Lorem, ipsum dolor.;</li>
                    <li className={styles.listBody}>с вами связывается ваш личный куратор проекта для оформления соглашения об условиях сотрудничества с Lorem, ipsum dolor.;</li>
                    <li className={styles.listBody}>после того, как все детали вашего проекта будут согласованы, проект может быть запущен.</li>
                  </ul>
                </div>
              </div>
              <div className={styles.support}>
                Если в процессе создания проекта у вас возникнут вопросы, вы можете задать их, 
                отправив электронное письмо на адрес <span className="link">support@support.ru</span>.
              </div>
              {loader 
                ?
                  <div>
                    {!loggedIn() && (
                      <div className={styles.rulesLogin}>
                        Создать проект может только зарегистрированный пользователь. 
                        Пожалуйста,  <Link to="/login" className="link">войдите</Link> или <Link to="/registration" className="link">зарегистрируйтесь.</Link>
                      </div>
                    )}
                    {loggedIn() && !user?.email_verified_at && (
                      <div className={styles.rulesWarning}>
                        Подвердите вашу почту или перейдите в <Link to="/profile" className="link">Профиль</Link>
                      </div>
                    )}
                    {loggedIn() && user.email_verified_at && (
                      <div className={styles.rulesPassed}>
                        <input  
                          type="checkbox" 
                          readOnly 
                          name="terms" 
                          checked={agree} 
                          onClick={e => setAgree(agree => !agree)}
                          className={styles.passChachbox}
                          />
                        <label onClick={e => setAgree(agree => !agree)} className={styles.passLabel}>
                          Я принимаю положение об использовании личной (персональной) 
                          информации при размещении проектов на платформе Lorem, ipsum dolor.
                          и соглашаюсь с <span onClick={e => setModallActive(modallActive => !modallActive)} className="link"> условиями 
                            использования сервиса народного финансирования (краудфандинг)</span> 
                        </label>
                        <Button disabled={!agree} onClick={createProject} loading={loading} className={styles.passedButton}>
                          Создать проект
                        </Button>
                      </div>
                    )}
                  </div>
                : 
                  <div className="w-full flex justify-center items-center h-96">
                    <Loader size="lg"/>
                  </div>
              }

            </div>
            <div className={styles.right}>
              <p className={styles.rightTitle}>
                К сбору средств не допускаются следующие проекты:
              </p>
              <ul className="rules_list">
                <li className={styles.warnBody}>
                  преследующие личную цель и не имеющие прямой связи с творческой или общественно-полезной деятельностью;
                </li>
                <li className={styles.warnBody}>
                  имеющие в качестве основной цели сбор средств на рекламу и продвижение;
                </li>
                <li className={styles.warnBody}>
                  связанные с политической деятельностью;
                </li>
                <li className={styles.warnBody}>
                  связанные с религиозной деятельностью;
                </li>
                <li className={styles.warnBody}>
                  противоречащие морально-этическим нормам общества;
                </li>
                <li className={styles.warnBody}>
                  противоречащие законодательству Республики Казахстана;
                </li>
                <li className={styles.warnBody}>
                  размещенные на аналогичном ресурсе (крауд-площадке);
                </li>
                <li className={styles.warnBody}>
                  не соответствующие целям и задачам нашего сервиса, определенным в Правилах.
                </li>
                <li className={styles.warnBody}>
                  Администрация Портала имеет право отказать в допуске к сбору средств 
                  без объяснения причин отказа. Данное право может быть 
                  использовано на любой стадии подготовки проекта.
                </li>
              </ul>
              <div className="rules_ads">
              </div>
            </div> 
          </div>
        </div>
      </div>
      <Modal 
        opened={modal}
        onClose={e => setModal(false)}
        withCloseButton={false}
        centered
        overflow="inside"
      >
        <div className= "Terms_modal">
          <div className="terms-modal-inner">
            <div className="terms-modal-content">
              <h2>Условия соглашения.</h2>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe perspiciatis dignissimos totam beatae maiores praesentium unde eum necessitatibus, aut repellendus eaque molestiae, vero nostrum quia, debitis possimus? Vitae at sequi natus minima. Cumque culpa rerum nemo itaque aliquid eos, blanditiis excepturi debitis dolore doloribus, at, natus recusandae fuga sunt nobis non corporis ut aut? Exercitationem, nihil consequatur recusandae ex adipisci voluptate distinctio quae facere suscipit, numquam beatae qui? Non quam suscipit autem quis! Ducimus veritatis deleniti, animi ullam tenetur dolorum nulla perferendis rem cum quibusdam placeat harum quia fuga, impedit dignissimos aperiam deserunt, minima repellat reprehenderit. Non sapiente illo ullam.</p>
              <h2>Lorem ipsum dolor sit amet.</h2>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem dicta sit deleniti corporis omnis minima quae laboriosam sapiente eius ratione aliquam ullam aliquid, nisi optio dolore magnam expedita inventore quis maiores est. Eius assumenda nesciunt ab voluptate odit deserunt! Maxime impedit commodi cupiditate at sint dicta eius eveniet qui sequi.</p>
              <h2>Lorem ipsum dolor sit amet.</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, at tempore architecto unde officiis voluptatibus repudiandae nisi numquam dicta natus eos mollitia voluptas harum et qui, a doloremque. Quas veniam ad dolorem dignissimos in distinctio, alias mollitia assumenda vitae qui ullam saepe iusto architecto hic, doloremque error a. Natus asperiores consequuntur possimus optio ea eligendi commodi perferendis placeat ab provident nobis laudantium adipisci quis, repudiandae blanditiis porro ut, beatae vel esse labore earum et voluptatum, odit perspiciatis. Consequatur aperiam in recusandae. Expedita obcaecati deleniti vitae est repudiandae reiciendis quam minima id quidem eius nesciunt, itaque quisquam ratione corporis nam iusto?</p>
              <h2>Lorem ipsum dolor sit amet.</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, at tempore architecto unde officiis voluptatibus repudiandae nisi numquam dicta natus eos mollitia voluptas harum et qui, a doloremque. Quas veniam ad dolorem dignissimos in distinctio, alias mollitia assumenda vitae qui ullam saepe iusto architecto hic, doloremque error a. Natus asperiores consequuntur possimus optio ea eligendi commodi perferendis placeat ab provident nobis laudantium adipisci quis, repudiandae blanditiis porro ut, beatae vel esse labore earum et voluptatum, odit perspiciatis. Consequatur aperiam in recusandae. Expedita obcaecati deleniti vitae est repudiandae reiciendis quam minima id quidem eius nesciunt, itaque quisquam ratione corporis nam iusto?</p>
              <h2>Lorem ipsum dolor sit amet.</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, at tempore architecto unde officiis voluptatibus repudiandae nisi numquam dicta natus eos mollitia voluptas harum et qui, a doloremque. Quas veniam ad dolorem dignissimos in distinctio, alias mollitia assumenda vitae qui ullam saepe iusto architecto hic, doloremque error a. Natus asperiores consequuntur possimus optio ea eligendi commodi perferendis placeat ab provident nobis laudantium adipisci quis, repudiandae blanditiis porro ut, beatae vel esse labore earum et voluptatum, odit perspiciatis. Consequatur aperiam in recusandae. Expedita obcaecati deleniti vitae est repudiandae reiciendis quam minima id quidem eius nesciunt, itaque quisquam ratione corporis nam iusto?</p>
              <h2>Lorem ipsum dolor sit amet.</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, at tempore architecto unde officiis voluptatibus repudiandae nisi numquam dicta natus eos mollitia voluptas harum et qui, a doloremque. Quas veniam ad dolorem dignissimos in distinctio, alias mollitia assumenda vitae qui ullam saepe iusto architecto hic, doloremque error a. Natus asperiores consequuntur possimus optio ea eligendi commodi perferendis placeat ab provident nobis laudantium adipisci quis, repudiandae blanditiis porro ut, beatae vel esse labore earum et voluptatum, odit perspiciatis. Consequatur aperiam in recusandae. Expedita obcaecati deleniti vitae est repudiandae reiciendis quam minima id quidem eius nesciunt, itaque quisquam ratione corporis nam iusto?</p>
              <h2>Lorem ipsum dolor sit amet.</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, at tempore architecto unde officiis voluptatibus repudiandae nisi numquam dicta natus eos mollitia voluptas harum et qui, a doloremque. Quas veniam ad dolorem dignissimos in distinctio, alias mollitia assumenda vitae qui ullam saepe iusto architecto hic, doloremque error a. Natus asperiores consequuntur possimus optio ea eligendi commodi perferendis placeat ab provident nobis laudantium adipisci quis, repudiandae blanditiis porro ut, beatae vel esse labore earum et voluptatum, odit perspiciatis. Consequatur aperiam in recusandae. Expedita obcaecati deleniti vitae est repudiandae reiciendis quam minima id quidem eius nesciunt, itaque quisquam ratione corporis nam iusto?</p>
              <h2>Lorem ipsum dolor sit amet.</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, at tempore architecto unde officiis voluptatibus repudiandae nisi numquam dicta natus eos mollitia voluptas harum et qui, a doloremque. Quas veniam ad dolorem dignissimos in distinctio, alias mollitia assumenda vitae qui ullam saepe iusto architecto hic, doloremque error a. Natus asperiores consequuntur possimus optio ea eligendi commodi perferendis placeat ab provident nobis laudantium adipisci quis, repudiandae blanditiis porro ut, beatae vel esse labore earum et voluptatum, odit perspiciatis. Consequatur aperiam in recusandae. Expedita obcaecati deleniti vitae est repudiandae reiciendis quam minima id quidem eius nesciunt, itaque quisquam ratione corporis nam iusto?</p>
              <h2>Lorem ipsum dolor sit amet.</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, at tempore architecto unde officiis voluptatibus repudiandae nisi numquam dicta natus eos mollitia voluptas harum et qui, a doloremque. Quas veniam ad dolorem dignissimos in distinctio, alias mollitia assumenda vitae qui ullam saepe iusto architecto hic, doloremque error a. Natus asperiores consequuntur possimus optio ea eligendi commodi perferendis placeat ab provident nobis laudantium adipisci quis, repudiandae blanditiis porro ut, beatae vel esse labore earum et voluptatum, odit perspiciatis. Consequatur aperiam in recusandae. Expedita obcaecati deleniti vitae est repudiandae reiciendis quam minima id quidem eius nesciunt, itaque quisquam ratione corporis nam iusto?</p>
              <h2>Lorem ipsum dolor sit amet.</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, at tempore architecto unde officiis voluptatibus repudiandae nisi numquam dicta natus eos mollitia voluptas harum et qui, a doloremque. Quas veniam ad dolorem dignissimos in distinctio, alias mollitia assumenda vitae qui ullam saepe iusto architecto hic, doloremque error a. Natus asperiores consequuntur possimus optio ea eligendi commodi perferendis placeat ab provident nobis laudantium adipisci quis, repudiandae blanditiis porro ut, beatae vel esse labore earum et voluptatum, odit perspiciatis. Consequatur aperiam in recusandae. Expedita obcaecati deleniti vitae est repudiandae reiciendis quam minima id quidem eius nesciunt, itaque quisquam ratione corporis nam iusto?</p>
              <h2>Lorem ipsum dolor sit amet.</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, at tempore architecto unde officiis voluptatibus repudiandae nisi numquam dicta natus eos mollitia voluptas harum et qui, a doloremque. Quas veniam ad dolorem dignissimos in distinctio, alias mollitia assumenda vitae qui ullam saepe iusto architecto hic, doloremque error a. Natus asperiores consequuntur possimus optio ea eligendi commodi perferendis placeat ab provident nobis laudantium adipisci quis, repudiandae blanditiis porro ut, beatae vel esse labore earum et voluptatum, odit perspiciatis. Consequatur aperiam in recusandae. Expedita obcaecati deleniti vitae est repudiandae reiciendis quam minima id quidem eius nesciunt, itaque quisquam ratione corporis nam iusto?</p>
              <h2>Lorem ipsum dolor sit amet.</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, at tempore architecto unde officiis voluptatibus repudiandae nisi numquam dicta natus eos mollitia voluptas harum et qui, a doloremque. Quas veniam ad dolorem dignissimos in distinctio, alias mollitia assumenda vitae qui ullam saepe iusto architecto hic, doloremque error a. Natus asperiores consequuntur possimus optio ea eligendi commodi perferendis placeat ab provident nobis laudantium adipisci quis, repudiandae blanditiis porro ut, beatae vel esse labore earum et voluptatum, odit perspiciatis. Consequatur aperiam in recusandae. Expedita obcaecati deleniti vitae est repudiandae reiciendis quam minima id quidem eius nesciunt, itaque quisquam ratione corporis nam iusto?</p>
              <h2>Lorem ipsum dolor sit amet.</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, at tempore architecto unde officiis voluptatibus repudiandae nisi numquam dicta natus eos mollitia voluptas harum et qui, a doloremque. Quas veniam ad dolorem dignissimos in distinctio, alias mollitia assumenda vitae qui ullam saepe iusto architecto hic, doloremque error a. Natus asperiores consequuntur possimus optio ea eligendi commodi perferendis placeat ab provident nobis laudantium adipisci quis, repudiandae blanditiis porro ut, beatae vel esse labore earum et voluptatum, odit perspiciatis. Consequatur aperiam in recusandae. Expedita obcaecati deleniti vitae est repudiandae reiciendis quam minima id quidem eius nesciunt, itaque quisquam ratione corporis nam iusto?</p>
            </div>
            <div>
            <input type="checkbox" id="agree" onChange={checkboxHandler} style={{marginRight: '10px'}} />
              <label htmlFor="agree"> Я принимаю условия пользовательского соглашения.</label>
            </div>
              <button disabled={!agree} onClick={createProject} className= {agree ? "Terms_link" : "Terms_disabled"}>
                Создать проект
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}


export default CreateProject