import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Redirect
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Formulario from './Rutas/Formularios';
import Principal from './Rutas/Principal';

function App() {
  return (
    <Router>
      <div>
        <Redirect to="/Login" />
        <Switch>
          <PrivateRoute path="/Library" logged={true}>
            <Principal />
          </PrivateRoute>
          <PrivateRoute path="/" logged={false}>
            <Formulario />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
