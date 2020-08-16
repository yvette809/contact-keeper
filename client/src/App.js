import React from 'react';
import{BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import './App.css';
import NavBar from './components/layout/NavBar';
import Home from './components/pages/Home'
import About from './components/pages/About'

import ContactState from './context/contact/ContactState'

function App() {
  return (
    <ContactState>
    <Router>
       <>
      <NavBar/>
      <div className = "container">
        <Switch>
          <Route exact path= '/' component = {Home}/>
          <Route exact path= '/about' component = {About}/>
        </Switch>

      </div>

    </>
    </Router>
    </ContactState>
   
  );
}

export default App;
