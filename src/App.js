import React from 'react';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Formulario from './Rutas/Formulario';
import Library from './Rutas/Library';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Inicializer/temaConfig';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <PrivateRoute path="/Dashboard" logged={true} component={Library} />
          <PrivateRoute path="/" logged={false} component={Formulario} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
