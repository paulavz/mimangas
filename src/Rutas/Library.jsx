import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, NavLink, Redirect, useLocation
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import firebase from "../Inicializer/firebase";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SimpleLibrary from './SimpleLibrary';
import Avanced from './Avanced';
import { states as realStates, Global } from './Globales';
import "./Library.css";
require("firebase/auth");

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    gridd: {
        flexGrow: 1,
        marginTop: theme.spacing(4),
        margin: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    divider: {
        marginTop: theme.spacing(2),
    },
}));

const states = ["Todos", ...realStates];

export default function Library(props) {
    const classes = useStyles();

    const [mangas, setMangas] = useState([]);
    const [tags, setTags] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        let user = firebase.auth().currentUser;

        let userRoot = firebase.firestore().collection("users").doc(user.uid);

        let coleccion = userRoot.collection("mangas").orderBy("createAt", "desc");


        let unsubscribe = coleccion.onSnapshot(
            function (snap) {
                let mangasArray = [];
                snap.forEach((doc) => mangasArray.push({...doc.data(), id: doc.id}));
                setMangas(mangasArray);
                setCargando(false);
            },
            (error) => console.log(error.message)
        );

        let unsubscribeTags = userRoot.onSnapshot(
            function(doc) {
                Global.tags = doc.data().tags;
                setTags(doc.data().tags);
            }
        );

        return () => {
            unsubscribe();
            unsubscribeTags();
        };

    }, []);

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

    const { pathname } = useLocation();

    return (
        <div className={classes.root}>
            <Router basename="/Dashboard" >
            <AppBar position="static">
                <Toolbar>
                    <NavLink to={"/Library"} style={{color: "white"}} activeStyle={{display: "none"}} >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="lib"
                            title="Volver"
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </NavLink>
                    <Typography variant="h6" className={classes.title}>
                        Mis Mangas
                    </Typography>
                    <IconButton edge="start" onClick={cerrar} color="inherit" aria-label="menu">
                        <ExitToAppIcon />
                    </IconButton>

                </Toolbar>

            </AppBar>
            <div className={classes.gridd}>

            {!cargando && 
                <div>
                {pathname!=="/Dashboard/AvancedSearch" && <Redirect to="/Library" />}
                <Switch>
                    <Route path="/AvancedSearch" render={()=><Avanced
                        estados={states}
                        mangas={mangas}
                        tags={tags}
                    />} />
                    <Route path="/Library" render={()=><SimpleLibrary
                        mangas={mangas}
                        states={states}
                    />} />
                </Switch>
                </div>
            }

            </div>
            </Router>
        </div>
    )


}