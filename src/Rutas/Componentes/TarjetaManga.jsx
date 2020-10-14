import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InfoManga from './InfoManga';
import { statusColors as colors } from '../Globales';
import firebase from "../../Inicializer/firebase";
require("firebase/auth");

const useStyles = (theme) => ({
    root: {
        width: "100%",
        maxWidth: 300,
        display: "inline-block",
    },
    puntos: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1,
    },
    puntuacion: {
        width: "100%",
        textAlign: "center",
        position: "absolute",
        top: 0,
        color: "white",
        fontFamily: "Pacifico, cursive",
        textShadow: "1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 0.5px 0.5px #000, -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000,-0.5px 0.5px 0 #000",
        fontWidth: "bold",
        textSize: "0.4em",
    },
    content: {
        padding: theme.spacing(1),
        position: "relative",
    },
    card: {
        height: 300,
        borderColor: "black",
        borderWidth: 3,
        borderStyle: "solid",
    },
    button: {
        width: "100%",
        height: "100%",
    },
    textSpace: {
        height: 50,
        width: "100%",
        backgroundColor: `rgba(0, 0, 0, 0.3)`,
        position: "absolute",
        bottom: 0,
        transition: "height 600ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        textAlign: "center",
        color: "white",
        '&:hover': {
            height: "100%",
        },
    },
    container: {
        position: "relative",
        width: "100%",
        height: "100%",
    },
    desplegableButton: {
        position: "relative",
        top: 100,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    botonLeer: {
        backgroundColor: "yellow",
        color: "white",
        '& .MuiTouchRipple-root': {
            color: "black",
        },
        '&:hover': {
            backgroundColor: `#e6e600`,
        },
    },
});

class TarjetaManga extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            eliminar: false,
        };
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.borrarManga = this.borrarManga.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.manga !== nextProps.manga || this.state.open !== nextState.open
            || this.state.eliminar !== nextState.eliminar;
    }

    openDialog() {
        this.setState({ open: true });
    }

    handleCloseDialog() {
        this.setState({ open: false });
    }

    borrarManga() {
        let user = firebase.auth().currentUser;
        firebase.firestore().collection("users").doc(user.uid)
            .collection("mangas").doc(this.props.manga.id).delete().then(() => {
                console.log("Eliminado Exitosamente");
            }, (error) => { console.log(error); });
    }

    render() {
        const { manga, classes } = this.props;

        return <div className={classes.root} >
            <div className={classes.content}>
                <div className={classes.puntos} >
                    <FavoriteIcon
                        fontSize="large"
                        style={{ color: colors[manga.status] }}
                    />
                    <div className={classes.puntuacion} >{manga.punctuation}</div>
                </div>
                <Card
                    className={classes.card}
                    style={{ borderColor: colors[manga.status] }}
                >
                    <div
                        className={classes.container}
                    >
                        <img
                            src={manga.cover || "https://firebasestorage.googleapis.com/v0/b/mismangas-7e620.appspot.com/o/uploads%2F3oesb3tldzt?alt=media&token=e006a18c-b59d-4a74-b2c7-d3849a0d49ba"}
                            alt={manga.titleName}
                            style={{ position: "absolute", width: "100%", height: "100%" }}
                        />
                        <ButtonBase
                            focusRipple
                            className={classes.button}
                            onClick={this.openDialog}
                        />
                        <div className={classes.textSpace} style={{ height: this.state.eliminar ? "100%" : null }} >
                            <h2 id="title">{manga.titleName}</h2><br />
                            <div className={classes.desplegableButton}>
                                <Button
                                    className={classes.botonLeer}
                                    variant="contained"
                                    disabled={!manga.lecture}
                                    href={manga.lecture}
                                    target="_blank"
                                >
                                    Leer
                                </Button>
                            </div><br />
                            <Button color="secondary"
                                variant="contained"
                                onClick={() => this.setState({ eliminar: true })}
                                className={classes.desplegableButton}
                            >
                                Eliminar
                            </Button>
                        </div>

                    </div>
                </Card>
            </div>
            <InfoManga
                open={this.state.open}
                onClose={this.handleCloseDialog}
                manga={this.props.manga}
            />
            <Dialog
                open={this.state.eliminar}
                onClose={() => this.setState({ eliminar: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Eliminar cómic</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Está seguro de que desea eliminar este dato?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({ eliminar: false })} color="primary">
                        Cancelar
                </Button>
                    <Button onClick={this.borrarManga} color="primary" autoFocus>
                        Aceptar
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    }

}

export default withStyles(useStyles)(TarjetaManga);