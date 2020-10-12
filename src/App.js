import React from 'react';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Formulario from './Rutas/Formulario';
import Library from './Rutas/Library';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute path="/Dashboard" logged={true} component={Library} />
          <PrivateRoute path="/" logged={false} component={Formulario} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
