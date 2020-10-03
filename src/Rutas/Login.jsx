import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import firebase from "../Inicializer/firebase";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import AlertaLogin from "./AlertaLogin.jsx";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Formulario.css";
require("firebase/auth");
require("firebase/database");

const useStyles = (theme) => ({
  root: {
    width: "28ch",
    padding: 14,
  },
  boton: {
    marginTop: "4ch",
  },
  text: {
    marginTop: "2ch",
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      alertaMensaje: "",
      alertaOpen: false,
      cargando: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  cerrar() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("seccion cerrada");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  loginGoogle() {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then((res) => {
            console.log(res);
          });
      });
  }
  handleSubmit(event) {
    event.preventDefault();
    const name = this.state.username;
    const password = this.state.password;
    this.setState({ cargando: true });
    console.log("se entro a la funcion inicio");
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(name, password)
          .then((r) => console.log(r))
          .catch((error) => {
            let errorCode = error.code;
            if (errorCode === "auth/invalid-email") {
              this.setState(() => {
                return { alertaMensaje: "Correo Invalido" };
              });
            } else if (errorCode === "auth/wrong-password") {
              this.setState(() => {
                return { alertaMensaje: "Error de contraseña" };
              });
            } else if (errorCode === "auth/user-not-found") {
              this.setState(() => {
                return { alertaMensaje: "Error de correo" };
              });
            } else {
              this.setState(() => {
                return { alertaMensaje: "Error al procesar su pedido" };
              });
            }
            this.setState((state, props) => {
              return { alertaOpen: state.alertaOpen ? false : true };
            });
            this.setState({ cargando: false });
          });
      });
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isPassword", (value) => {
      if (value.length > 8) {
        return true;
      } else {
        return false;
      }
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root} elevation={3}>
        <Typography color="primary" variant="h5" component="h2">
          Ingresa ahora
        </Typography>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <Divider variant="middle" />
          <TextField
            autoFocus
            className={classes.text}
            name="username"
            onChange={this.handleChange}
            label="Correo Electrónico"
            type="email"
            helperText="Escribe tu correo electrónico"
            fullWidth
            required
          />
          <TextValidator
            className={classes.text}
            name="password"
            onChange={this.handleChange}
            label="Contraseña"
            type="password"
            value={this.state.password}
            helperText="Escribe tu contraseña."
            validators={["required", "isPassword"]}
            errorMessages={["Escribe algo", "Minimo 8 letras"]}
            fullWidth
          />

          <Button
            className={classes.boton}
            variant="contained"
            color="primary"
            disableElevation
            type="submit"
            fullWidth
          >
            Iniciar Sesión
            {this.state.cargando && (
              <CircularProgress
                size={15}
                thickness={5}
                style={{ color: "white", marginLeft: 5 }}
              />
            )}
          </Button>
        </ValidatorForm>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.loginGoogle}
          disableElevation
          fullWidth
          style={{ color: "white", marginTop: 4 }}
        >
          Inicia con Google
        </Button>
        <Link className="links" to="/register">
          ¿Aún no estás registrado?
        </Link>
        <AlertaLogin isOpen={this.state.alertaOpen}>
          {this.state.alertaMensaje}
        </AlertaLogin>
      </Card>
    );
  }
}

export default withStyles(useStyles)(Login);
