import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import firebase from "../Inicializer/firebase";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import SimpleLibrary from './SimpleLibrary';
import "./Library.css";
require("firebase/auth");

const CssTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'blue',
            },
        },
    },
})(TextField);

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

const states = ["Todos", "Siguiendo", "Completo", "Favoritos", "Pausados", "Pedientes", "Abandonados"]

export default function Library(props) {
    const classes = useStyles();

    const [buscador, setBuscador] = useState("");
    const [mangas, setMangas] = useState([]);

    useEffect(()=> {
        let user = firebase.auth().currentUser;

        let coleccion = firebase.firestore().collection("users").doc(user.uid).collection("mangas");

        
        coleccion.onSnapshot(
            function(snap) {
                let mangasArray = [];
                snap.forEach((doc)=> mangasArray.push(doc.data()))
                setMangas(mangasArray);
                console.log(mangasArray.toString());
            },
            (error) => console.log(error.message)
        );
        
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

    const handleChangeBuscador = (event) => {
        setBuscador(event.target.value);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Mis Mangas
          </Typography>
                    <IconButton edge="start" onClick={cerrar} className={classes.menuButton} color="inherit" aria-label="menu">
                        <ExitToAppIcon />
                    </IconButton>

                </Toolbar>

            </AppBar>
            <div className={classes.gridd}>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <CssTextField
                            fullWidth
                            onChange={handleChangeBuscador}
                            value={buscador}
                            label="Buscar Manga"
                            variant="outlined"
                            id="outlined-search"
                            type="search"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button size="large" className="buscar" fullWidth variant="contained" color="secondary">
                            Búsqueda Avanzada
                        </Button>
                    </Grid>

                </Grid>

                <Divider className={classes.divider} variant="middle" />

                <SimpleLibrary 
                    busqueda={buscador} 
                    mangas={mangas} 
                    states={states}
                />

            </div>
        </div>
    )


}