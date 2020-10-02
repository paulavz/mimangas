import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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
            <Route path="/Login">
              <Formulario />
            </Route>
            <Route path="/">
              <Principal />
            </Route>
          </Switch>
        </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
