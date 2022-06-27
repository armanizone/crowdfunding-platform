import React from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { Redirect } from 'react-router';

import { loggedIn, User, isAdmin, setAdmin, userId, setUserId, setRole, logIn } from './service/Auth.js';
import Storage from "./service/Storage.js";
import HttpService from "./service/HttpService.js";

// Импорты страниц routes
import { Main, Admin, AllProjects, HowItWorks, Project, EditProject, CreateProject, Profile, Bill, MyNotifications, MyProjects, MyInvestions, Job } from './routes'
import { Footer, NavBar } from './modules'

import SignUp from './includes/LogReg/SignUp';
import Login from './includes/LogReg/Login.jsx';

import ForgotPassword from './includes/LogReg/ForgotPassword.jsx';
import ResetPassword from './includes/LogReg/ResetPassword';
import MainService from './service/MainService.js';
import ProjectUsers from './includes/Project/ProjectUsers';

import { Stuff } from "./modules";

import ProjectPayment from "./includes/Project/ProjectPayment.jsx";

import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals'
import Cookies from "js-cookie";


const theme = {
  colors: {
    blue: ['#eff6ff','#dbeafe','#bfdbfe','#93c5fd','#60a5fa','#60a5fa','#60a5fa','#1d4ed8','#1e40af','#1e3a8a',],
    red: ['#fef2f2','#fee2e2','#fecaca','#fca5a5','#f87171','#ef4444','#dc2626','#b91c1c','#991b1b','#7f1d1d',],
    green: ['#f0fdf4','#dcfce7','#bbf7d0','#86efac','#4ade80','#22c55e','#16a34a','#15803d','#166534','#14532d',],
    yellow: ['#fefce8','#fef9c3','#fef08a','#fde047','#facc15','#eab308','#ca8a04','#a16207','#854d0e','#713f12',]
  },
  defaultRadius: 'md',
  primaryColor: 'blue',
}

function Home() {


  const fetchData = async e => {
    if(loggedIn()){
      MainService.getRole()
      .then(e => {
        if (e.data.name == "Admin") setAdmin()
        if (e.data.name) setRole()
      })
    }
    await User().then(e => {
      Storage.set('user', e.data)
      if (!loggedIn()) {
        logIn()
        window.location.reload()
      }
      if (!userId()) setUserId(e.data.id)
    })
    .catch(e => {
      Cookies.remove('user_logged_in')
    })
    if (!Storage.get('cities')) {
      HttpService.getCities()
      .then(e => {
        Storage.set('cities', e.data)
      })
    } 
  }

  React.useEffect(() => {
    fetchData() 
  }, [])


  return (
    <BrowserRouter>
        <ModalsProvider>
          <NotificationsProvider position="top-right">
            <div className="h-screen grid grid-rows-[auto_1fr_auto]">
              <MantineProvider theme={theme}
              >
                <NavBar noti={[]} />
                  <ScrollToTop/>
                  <Switch>
                  <Route exact path="/" render={() => <Main />}/>
                    <Route path="/all-projects" render={() => <AllProjects/>}/>
                    <Route path="/how-it-works" component = {HowItWorks}/>
                    <Route path="/create-project" render = {e => <CreateProject />}/>
                    <Route path="/project/:status/:id" render = {e => <Project /> }/>
                    <Route path="/payment/:id/:projectId/:count" render={e => loggedIn() ? <ProjectPayment/> : <Login/>} />
                    <Route path="/admin" render = {e => loggedIn() && isAdmin() ?  <Admin /> : <Redirect to="/notfound"/>}/>
                    <Route path="/edit-project/:name/:id" component = {EditProject}/>
                    <Route path="/profile" render={e => loggedIn() ? <Profile loaded={true} /> : <Login/>}/>
                    <Route path="/bill" render={e => loggedIn() ? <Bill/> : <Login/>}/>
                    <Route path="/my-notifications" render={e => loggedIn() ? <MyNotifications  /> : <Login/>}/>
                    <Route path="/my-projects" render={e => loggedIn() ? <MyProjects /> : <Login/>}/>
                    <Route path="/my-investions" render={e => loggedIn() ? <MyInvestions/> : <Login/>}/>
                    <Route path="/job" component = {Job}/>
                    <Route path="/registration" render = {e => loggedIn() ? <Redirect to="/"/> : <SignUp/> }/>
                    <Route path="/login" render = {e => loggedIn() ? <Redirect to="/"/> : <Login/> }/> 
                    <Route path="/forgot-password" render = {e => loggedIn() ? <Redirect to="/"/> : <ForgotPassword/> }/> 
                    <Route path="/reset-password/:token/:email" render = {e => loggedIn() ? <Redirect to="/"/> : <ResetPassword/> }/> 
                    <Route path="/update-project/:name/:id" render={e => loggedIn() ? <UpdateProject/> : <Login/> } />
                    <Route path="/project-users/:id" render={e => loggedIn() ? <ProjectUsers /> : <Login/> }/>
                    <Route render={() => <Stuff.ErrorPage/>}/>
                  </Switch>
                <Footer />
              </MantineProvider>
            </div>
          </NotificationsProvider>
        </ModalsProvider>
    </BrowserRouter>
  )
}


function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default Home
