import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import store from './Store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser,logoutUser } from './actions/AuthActions'
import { clearCurrentProfile } from './actions/profileActions'

import PrivateRoute from './components/common/PrivateRoute'
import Navbar from "./components/layaout/Navbar";
import Footer from "./components/layaout/Footer";
import Landing from "./components/layaout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-Profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience"
import AddEducation from "./components/add-credentials/AddEducation"
import Profiles from "./components/profiles/Profiles"
import Profile from "./components/profile/Profile"
import Posts from "./components/posts/Posts"
import NotFound from "./components/not-found/NotFound"
import Post from './components/post/Post'
import "./App.css";



//check for token
if(localStorage.jwtToken){
//set auth token  header auth
setAuthToken(localStorage.jwtToken)
//decode token and get user info and exp
const decoded=  jwt_decode(localStorage.jwtToken)
//set user and isauthenticated
store.dispatch(setCurrentUser(decoded))
//check for expired token
const currentTime=Date.now()/1000
if(decoded.exp < currentTime){
  //logout user
  store.dispatch(logoutUser())
  //clear current profile
  store.dispatch(clearCurrentProfile())
  //redirect to login
  window.location.href='/login'
}
}

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing}/>
      <div className="container">
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/profiles" component={Profiles}/>
        <Route exact path="/profile/:handle" component={Profile}/>
        <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard}/>        
        </Switch>
        <Switch>
        <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
        </Switch>
        {/* protective route */}
        <Switch>
        <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/add-experience" component={AddExperience}/>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/add-education" component={AddEducation}/>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/feed" component={Posts}/>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/post/:id" component={Post}/>
        </Switch>
        <Route exact path="/not-found" component={NotFound}/>
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;