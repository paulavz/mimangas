import React, { useState, useEffect } from 'react';
import { Route } from "react-router";
import { Redirect } from "react-router-dom";
import firebase from "./Inicializer/firebase";
require("firebase/firebase-firestore");

export default function PrivateRoute({ logged, children, ...otrasProps }) {

    const [isLogged, setLogged] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user.email);
                setLogged(true);
            } else {
                console.log("Sección no iniciada");
                setLogged(false);
            }
        });
    }, [logged]);

    if (isLogged === null) {
        return <Route {...otrasProps} />
    } else {
        if (isLogged === logged) {
            return <Route {...otrasProps} > {children} </Route>
        } else {
            if (isLogged) {
                return <Redirect to="/" />
            } else {
                return <Redirect to="/Login" />
            }
        }

    }

}