import React from 'react';
import{BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import './App.css';
import NavBar from './components/layout/NavBar';
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/AuthState'

function App() {
  return (
    <AuthState>
     <ContactState>
    <Router>
       <>
      <NavBar/>
      <div className = "container">
        <Switch>
          <Route exact path= '/' component = {Home}/>
          <Route exact path= '/about' component = {About}/>
          <Route exact path= '/register' component = {Register}/>
          <Route exact path= '/login' component = {Login}/>
        </Switch>

      </div>

    </>
    </Router>
    </ContactState>
    </AuthState>
   
  );
}

export default App;
