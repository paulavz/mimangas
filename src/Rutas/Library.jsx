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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SimpleLibrary from './SimpleLibrary';
import Avanced from './Avanced';
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

const states = ["Todos", "Siguiendo", "Completos", "Favoritos", "Pausados", "Pendientes", "Abandonados"]

export default function Library(props) {
    const classes = useStyles();

    const [buscador, setBuscador] = useState("");
    const [mangas, setMangas] = useState([]);
    const [avanced, setAvanced] = useState(false);

    useEffect(() => {
        let user = firebase.auth().currentUser;

        let coleccion = firebase.firestore().collection("users").doc(user.uid)
            .collection("mangas").orderBy("createAt", "desc");


        let unsubscribe = coleccion.onSnapshot(
            function (snap) {
                let mangasArray = [];
                snap.forEach((doc) => mangasArray.push(doc.data()))
                setMangas(mangasArray);
            },
            (error) => console.log(error.message)
        );

        return ()=>unsubscribe();

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

    /**
     * Alterna entre busqueda normal y avanzada
     */
    const cambiarModoBusqueda = () => {
        setAvanced(!avanced);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {avanced && 
                    <IconButton 
                        edge="start" 
                        onClick={cambiarModoBusqueda} 
                        color="inherit"
                        aria-label="lib"
                        title="Volver"
                    >
                        <ArrowBackIcon />
                    </IconButton>}
                    <Typography variant="h6" className={classes.title}>
                        Mis Mangas
                    </Typography>
                    <IconButton edge="start" onClick={cerrar} color="inherit" aria-label="menu">
                        <ExitToAppIcon />
                    </IconButton>

                </Toolbar>

            </AppBar>
            <div className={classes.gridd}>
                <Grid container spacing={2}>
                    <Grid item xs={avanced ? 12 : 9}>
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
                    {!avanced && <Grid item xs={3}>
                        <Button
                            size="large" 
                            className="buscar" 
                            fullWidth 
                            variant="contained" 
                            color="secondary"
                            onClick={cambiarModoBusqueda}
                        >
                            Búsqueda Avanzada
                        </Button>
                    </Grid>}

                </Grid>

                <Divider className={classes.divider} variant="middle" />

                {avanced ?
                <Avanced 
                    estados={states} 
                    mangas={mangas}
                    buscador={buscador}
                    volver={()=>setAvanced(false)}
                /> :
                <SimpleLibrary
                    busqueda={buscador}
                    mangas={mangas}
                    states={states}
                />}

            </div>
        </div>
    )


}