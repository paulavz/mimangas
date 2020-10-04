import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import firebase from "../Inicializer/firebase";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Add from './Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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
    colbutton: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textTransform: 'none',

        '& > *': {
            margin: theme.spacing(1),

        },
    },
}));




export default function Library(props) {
    const classes = useStyles();

    const [isActive, setActive] = useState("Todos");
    let states = ["Todos", "Siguiendo", "Completo", "Favoritos", "Pausados", "Pedientes", "Abandonados"]


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
                            label="Buscar Manga"
                            variant="outlined"
                            id="outlined-search"
                            type="search"
                        />                    </Grid>
                    <Grid item xs={3}>
                        <Button size="large" className="buscar" fullWidth variant="contained" color="secondary">
                            Búsqueda Avanzada
</Button>
                    </Grid>

                </Grid>

                <Divider className={classes.divider} variant="middle" />
                <div className={classes.colbutton}>
                    <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                        {states.map((value) =>
                            <Button
                                key={value}
                                className={`${isActive === value ? "active" : ""}`}
                                onClick={() => setActive(value)}
                            >
                                {value}
                            </Button>)}
                    </ButtonGroup>
                    <Add />
                </div>

            </div>
        </div>
    )


}