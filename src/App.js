import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Link
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Formulario from './Rutas/Formularios';
import Principal from './Rutas/Principal';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Principal</Link>
                </li>
                <li>
                  <Link to="/Login">Login</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <PrivateRoute path="/Login" logged={false}>
                <Formulario />
              </PrivateRoute>
              <PrivateRoute path="/" logged={true}>
                <Principal />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
