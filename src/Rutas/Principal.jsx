import React from 'react';
import firebase from "../Inicializer/firebase";
require("firebase/auth");

export default function Principal(props) {
    function cerrar() {
        firebase
            .auth()
            .signOut()
            .then(function () {
                console.log("Se ha cerrado sección exitosamente");
            })
            .catch(function (error) {
                console.log("No se ha cerrado sección ", error);
            });
    }

    return <div>
        <p>Ruta 1 compa</p>
        <button onClick={cerrar}>Cerrar</button>


    </div>

}