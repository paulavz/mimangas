import React from 'react';
import Login from './Login';
import { Route, Switch, Redirect } from 'react-router-dom';
import Registro from './Register';
import "./styles.css";
export default function Formulario(props) {

    return <div className="App">
        <header className="App-header">
            <div>
                <Redirect to="/Login" />
                <Switch>
                    <Route path="/Login" component={Login} />
                    <Route path="/register" component={Registro} />
                </Switch>
            </div>
        </header>
    </div>



}