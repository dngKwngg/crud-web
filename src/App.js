import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';
import Login from './components/login';
import PrivateRoute from './privateRoute';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  handleLogin = () => {
    // Simulating a successful login
    this.setState({ isAuthenticated: true });
  };

  handleLogout = () => {
    // Simulating a logout
    this.setState({ isAuthenticated: false });
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Router>
        <div className="container-fluid p-0">
          <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ backgroundImage: "linear-gradient(to right, #D8BFD8, #f0f0f0)", width: "100%" }}>
            <Link to="/" className="navbar-brand" style={{ fontWeight: 'bold', position: 'relative', left: '5%' }}>
              Rumi CRUD
            </Link>
            <div className="collapse navbar-collapse justify-content-end">
              <ul className="navbar-nav">
                {isAuthenticated ? (
                  <>
                    {/* <li className="nav-item">
                      <Link to="/create" className="nav-link">
                        Create
                      </Link>
                    </li> */}
                    <li className="nav-item">
                      <Link to="/" className="nav-link" onClick={this.handleLogout} style={{ marginRight: '30px' }}>
                        Logout
                      </Link>

                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" style={{ marginRight: '30px' }}>
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
          <Switch>
            <PrivateRoute exact path="/" isAuthenticated={isAuthenticated} component={Index} />
            <PrivateRoute exact path="/create" isAuthenticated={isAuthenticated} component={Create} />
            <PrivateRoute exact path="/edit/:id" isAuthenticated={isAuthenticated} component={Edit} />
            <Route
              exact
              path="/login"
              render={() => (
                <Login
                  onLogin={this.handleLogin}
                  isAuthenticated={isAuthenticated}
                  location={{ state: { from: '/' } }}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
