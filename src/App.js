// App.js
// Menu handle redirect


import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>

        {/* <>Thanh menu cua web crud</> */}
        <div className="container" style={{ width: "100%", maxWidth: "none", margin: "0", padding: "0" }}>
          {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
          {/* <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#f0f0f0" }}> */}
          <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundImage: "linear-gradient(to right, #D8BFD8, #f0f0f0)", width: "100%" }}>
            <Link to={'/'} className="navbar-brand" style={{ fontWeight: 'bold', position: 'relative', left: '5%' }}>Rumi CRUD</Link>
            <div className="collapse navbar-collapse justify-content-start" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/'} className="nav-link" style={{position: 'relative', right: '10%' }}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link" style={{position: 'relative', right: '10%' }}>Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link" style={{position: 'relative', right: '10%' }}>Index</Link>
                </li>
              </ul>
            </div>
          </nav>

          <br />
            <h2 style={{ fontWeight: 'bold', position: 'relative', left: '5%' }}>Page for handling products</h2> 
          <br />

          {/* <> Xu ly redirect giua cac trang</> */}
          <Switch>
            <Route exact path='/create' component={Create} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/index' component={Index} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;