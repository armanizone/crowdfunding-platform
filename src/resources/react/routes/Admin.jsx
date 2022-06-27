import React, { useState, useEffect }  from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import Zayavki from "./../includes/Admin/Zayavki";
import Updates from "./../includes/Admin/Updates";
import Invest from "./../includes/Admin/Invest";
import Slider from "./../includes/Admin/Slider";
import AddUser from './../includes/Admin/AddUser';
import AddCity from './../includes/Admin/AddCity';
import ProjectsAll from './../includes/Admin/ProjectsAll';
import Confirmed from '../includes/Admin/Confirmed';
import AdminService from '../service/AdminService';
import HttpService from '../service/HttpService';
import ReadyToGo from './../includes/Admin/ReadyToGo';
import Transactions from '../includes/Admin/Transactions';
import Ended from './../includes/Admin/Ended';
import Cookies from 'js-cookie';
import Stuff from "../modules/Stuff";


import "../../sass/admin.scss"
import { Modal } from "@mantine/core";

const Admin = () => {

  const history = useHistory()

  const [loading, setLoading] = useState(false)

  const [projects, setProjects] = useState([])
  const [postedProjects, setPostedProjects] = useState([])
  const [notPostedProject, setNotPostedProjects] = useState([])
  const [rawProjects, setRawProjects] = useState([])
  const [deletedClosed, setDeletedClosed] = useState([])

  const [updates, setUpdates] = useState([])

  const [users, setUsers] = useState([])

  const [cities, setCities] = useState([])
  const [payments, setPayments] = useState([])
  const [transactions, setTransactions] = useState([])

  const [slider, setSlider] = useState([])

  const [succModall, setSuccModall] = useState(false)
  const [failModall, setFailModall] = useState(false)

  const succ = e => {
    setSuccModall(true)
    setTimeout(e => {
      setSuccModall(false)
    }, 1000)
  }
  const fail = e => {
    setFailModall(true)
    setTimeout(e => {
      setFailModall(false)
    }, 1000)
  }


  const fetchData = async e => {
    const getModarateAll = async e => {
      await AdminService.getAllOnModeration()
      .then(e => {
        setProjects(e.data)
      })
      .catch(e => {
        history.push('/')
        Cookies.remove('admin')
        history.go(0)
      })
    }
    const getUsers = e => {
      AdminService.getAllUsers()
      .then(e => {
        setUsers(e.data);
      })
    }
    const getCities = e => {
      HttpService.getCities()
      .then(e => {
        setCities(e.data)
      })
    }
    const getPayments = e => {
      AdminService.getPaymentsAll()
      .then(e => {
        setPayments(e.data)
      })
    }
    const getUpdates = e => {
      AdminService.getAllUpdates()
      .then(e => {
        setUpdates(e.data)
      })
    }
    const getPostedProjects = e => {
      HttpService.getPosted()
      .then(e => {
        setPostedProjects(e.data)
      })
    }
    const getNotPosted = e => {
      AdminService.getNotPostedAll()
      .then(e => {
        setNotPostedProjects(e.data)
      })
    }
    const getAllProjects = e => {
      AdminService.getAllRawProjects()
      .then(e => {
        setRawProjects(e.data)
      })
    }
    const getAllTransactions = e => {
      AdminService.getTransactions()
      .then(e => {
        setTransactions(e.data)
      })
    }
    const getSlider = () => {
      HttpService.getCarousel()
      .then(e => {
        console.log(e.data);
        setSlider(e.data)
      })
    };
    const getAllClosed = () => {
      AdminService.getAllDeletedOrClosed()
      .then(e => {
        console.log(e);
        setDeletedClosed(e.data)
      })
    }
    getModarateAll();
    getUpdates();
    getUsers();
    getPayments();
    getCities();
    getPostedProjects();
    getNotPosted();
    getAllProjects();
    getAllTransactions();
    getSlider();
    getAllClosed();
  }
  
  useEffect(e => {
    fetchData()
  }, [])


  const location = useLocation().pathname

  return (
    <>
      <div className="admin-panel">
        <div className="admin-tabs">

          <Link to= "/admin/allProjects"
            className={location === "/admin/allProjects" ? "tabs active-tabs" : "tabs"}> 
            Все проекты
          </Link>

          <Link to= "/admin/zayavki"
            className={location === "/admin/zayavki" ? "tabs active-tabs none-link" : "tabs none-link"}>
            Заявки
          </Link> 
          
          <Link to= "/admin/readytogo"
            className={location === "/admin/readytogo" ? "tabs active-tabs" : "tabs"}> 
            Одобренные
          </Link>

          <Link to= "/admin/confirmed"
            className={location === "/admin/confirmed" ? "tabs active-tabs" : "tabs"}> 
            Начатые проекты
          </Link>

          <Link to= "/admin/updates"
            className={location === "/admin/updates" ? "tabs active-tabs none-link" : "tabs none-link"}>
            Обновления
          </Link> 
          <Link to= "/admin/invest"
            className={location === "/admin/invest" ? "tabs active-tabs" : "tabs"}>
            Инвестиции
          </Link>

          <Link to= "/admin/AddUser"
            className={location === "/admin/AddUser" ? "tabs active-tabs none-link" : "tabs none-link"}> 
            Пользователи
          </Link>


          <Link to= "/admin/transaction"
            className={location === "/admin/transaction" ? "tabs active-tabs" : "tabs"}> 
            Транзакции
          </Link>

          <Link to= "/admin/slider"
            className={location === "/admin/slider" ? "tabs active-tabs" : "tabs"}> 
            Карусель
          </Link>

          <Link to= "/admin/AddCity"
            className={location ===  "/admin/AddCity" ? "tabs active-tabs" : "tabs"}> 
            Города
          </Link>

          <Link to= "/admin/ended"
            className={location === "/admin/ended" ? "tabs active-tabs" : "tabs"}> 
            Завершенные проекты
          </Link>
    

        </div>

        <div className="admin-content"> 
          <Switch>
            <Route path="/admin/zayavki" render = {e => <Zayavki succ={succ} fail={fail} projects={projects} setLoading={setLoading} cities={cities}/>}/>
            <Route path="/admin/updates" render = {e => <Updates succ={succ} fail={fail} updates={updates} projects={postedProjects} setLoading={setLoading}/> }/>
            <Route path="/admin/invest" render = {e => <Invest succ={succ} fail={fail} payments={payments}/>}/>
            <Route path="/admin/transaction" render = {e => <Transactions succ={succ} fail={fail} payments={payments} transactions={transactions}/>}/>
            <Route path="/admin/slider" render = {e => <Slider succ={succ} fail={fail} setLoading={setLoading} sliderData={slider}/>}/>
            <Route path="/admin/addUser" render= {e => <AddUser succ={succ} fail={fail} users={users} cities={cities} setLoading={setLoading}/>} />
            <Route path="/admin/addCity" render = {e => <AddCity succ={succ} fail={fail} cities={cities} setLoading={setLoading}/>}/>
            <Route path="/admin/allProjects" render = {e => <ProjectsAll succ={succ} fail={fail} raw={rawProjects} posted={postedProjects} setLoading={setLoading} notPosted={notPostedProject} cities={cities}/>}/>
            <Route path="/admin/confirmed" render={e => <Confirmed succ={succ} fail={fail} projects={postedProjects} setLoading={setLoading}/>}/>
            <Route path="/admin/readytogo" render={e => <ReadyToGo succ={succ} fail={fail} projects={notPostedProject} cities={cities} setLoading={setLoading}/>}/>
            <Route path="/admin/ended" render={e => <Ended succ={succ} fail={fail} projects={deletedClosed} cities={cities}/>}/>
          </Switch>
        </div>
                
      </div>
      {loading ? <Stuff.Loading/> : null}
      <Modal ModallShown={succModall} setModallShown={setSuccModall}>
        <h4>Успешно</h4>
      </Modal>
      <Modal ModallShown={failModall} setModallShown={setFailModall}>
        <h4>Что-то пошло не так</h4>
      </Modal>
    </>
  )
}

export default Admin
