import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Redirect, Route
} from "react-router-dom";
import Library from './Rutas/Library';
import Formulario from './Rutas/Formulario';

function App() {
  return (
    <Router>
      <div>
        <Redirect to="/Login" />
        <Switch>
          <Route path="/Library" logged={true}>
            <Library />
          </Route>
          <Route path="/" logged={false}>
            <Formulario />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
