import React, { Component } from "react";
import firebase from "../Inicializer/firebase";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";
import AlertaLogin from "./AlertaLogin.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Formulario.css";
require("firebase/auth");
require("firebase/firestore");

const useStyles = (theme) => ({
  root: {
    width: "38ch",
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      width: "32ch",
    },
  },
  boton: {
    marginTop: "2ch",
  },
  text: {
    marginTop: "1ch",
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  },
  title: {
    marginBottom: "2ch",
  },
  margin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
});

class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      uid: "",
      repeatemail: "",
      repeatpassword: "",
      alertaOpen: false,
      alertaMensaje: "",
      cargando: false,
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPassword", (value) => {
      if (value.length > 8) {
        return true;
      } else {
        return false;
      }
    });
    ValidatorForm.addValidationRule("isEmailMatch", (value) => {
      if (value !== this.state.email) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  createUser() {
    console.log(this.state);
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((r) => {
        this.setState({ uid: r.user.uid });
        this.createData();
      })
      .catch((error) => {
        let errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          this.setState(() => {
            return { alertaMensaje: "El correo ya está en uso" };
          });
        } else if (errorCode === "auth/invalid-email") {
          this.setState(() => {
            return { alertaMensaje: "Correo invalido" };
          });
        } else if (errorCode === "auth/operation-not-allowed") {
          this.setState(() => {
            return { alertaMensaje: "Operación no permitida" };
          });
        } else {
          this.setState(() => {
            return { alertaMensaje: "Error en el registro" };
          });
        }
        this.setState((state, props) => {
          return { alertaOpen: state.alertaOpen ? false : true };
        });
        this.setState({ cargando: false });
      });
  }

  createData() {
    let db = firebase.firestore();
    db.collection("users")
      .doc(this.state.uid)
      .set({
        name: this.state.name,
        email: this.state.email,
        uid: this.state.uid,
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ cargando: true });
    this.createUser();
  };
  render() {
    const { name, email, password, repeatemail, repeatpassword } = this.state;
    const { classes } = this.props;
    const inputPassword = {
      minLength: 8,
      maxLength: 15,
    };
    return (
      <div className={classes.margin}>
        <Card className={classes.root} elevation={3}>
          <ValidatorForm onSubmit={this.handleSubmit}>
            <Grid container>
              <Grid item sm={12}>
                <Typography
                  style={{ textAlign: "center" }}
                  color="primary"
                  variant="h5"
                  component="h2"
                >
                  Registrate
              </Typography>
                <Divider className={classes.title} variant="middle" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className={classes.paper}
                  autoFocus
                  name="name"
                  onChange={this.handleChange}
                  label="Nombre"
                  helperText="Escribe tu nombre"
                  value={name}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className={classes.paper}
                  name="email"
                  onChange={this.handleChange}
                  label="Email"
                  helperText="Email a utilizar"
                  value={email}
                  fullWidth
                  required
                  type="email"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextValidator
                  className={classes.paper}
                  name="repeatemail"
                  onChange={this.handleChange}
                  label="Confirma Email"
                  helperText="Confirma tu email"
                  value={repeatemail}
                  validators={["isEmailMatch"]}
                  errorMessages={["No coincide"]}
                  fullWidth
                  required
                  type="email"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextValidator
                  className={classes.paper}
                  name="password"
                  onChange={this.handleChange}
                  label="Contraseña"
                  type="password"
                  value={password}
                  helperText="Escribe tu contraseña."
                  validators={["isPassword"]}
                  errorMessages={["Mínimo 8 carácteres"]}
                  inputProps={inputPassword}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextValidator
                  className={classes.paper}
                  name="repeatpassword"
                  onChange={this.handleChange}
                  label="Confirma Contraseña"
                  type="password"
                  value={repeatpassword}
                  helperText="Confirma tu contraseña."
                  validators={["isPasswordMatch"]}
                  errorMessages={["No coincide"]}
                  inputProps={inputPassword}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  type="submit"
                  fullWidth
                  className={classes.boton}
                >
                  Registrar
                {this.state.cargando && (
                    <CircularProgress
                      size={15}
                      thickness={5}
                      style={{ color: "white", marginLeft: 5 }}
                    />
                  )}
                </Button>
                <AlertaLogin isOpen={this.state.alertaOpen}>
                  {this.state.alertaMensaje}
                </AlertaLogin>
              </Grid>
            </Grid>
          </ValidatorForm>
          <AlertaLogin isOpen={this.state.alertaOpen}>
            {this.state.alertaMensaje}
          </AlertaLogin>
          <Link className="links" to="/Login">
            ¿Ya tienes una cuenta?
        </Link>
        </Card>
      </div>
    );
  }
}

export default withStyles(useStyles)(Registro);
