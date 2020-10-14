import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from "@material-ui/core/styles";
import { pink } from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import ChipInput from "material-ui-chip-input";
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import firebase from '../Inicializer/firebase';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CancelIcon from '@material-ui/icons/Cancel';

import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';

import './Add.css'
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");




const useStyles = (theme) => ({
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: '#f50057',
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    select: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    demo: {
        'width': '100%'
    },
    top: {
        marginBottom: theme.spacing(1)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        display: 'none',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    upload: {
        textAlign: 'center',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    inputChip: {
        paddingBottom: '0 !important',
        '&:focus': {
            paddingBottom: '12px !important',
        },
        transition: "padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    warning: {
        color: theme.palette.error.main
    }

});

const outStates = ["open", "uploadValue", "uid", "file", "preview", "selectedF", "selectedO", "selectedN", "alert"];
class Add extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            alert: false,
            selectedF: '',
            selectedO: '',
            selectedN: '',
            titleName: '',
            status: 'Siguiendo',
            type: 'Manga',
            lecture: '',
            artist: '',
            cover: '',
            englishtitle: '',
            spanishtitle: '',
            author: '',
            synopsis: '',
            lastchapter: '',
            demo: '',
            category: [],
            tags: [],
            ubication: '',
            otherlink: '',
            punctuation: 0,
            fansub: [],
            uploadValue: 0,
            uid: "",
            file: "",
            preview: "",
            otherNames: ""
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSlider = this.handleChangeSlider.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    componentDidUpdate(nextProps, nextState) {
        if (this.props.openAdd !== nextProps.openAdd) {
            this.setState({ open: true });
        }
    }

    handleClickOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleAdd(chip) {
        this.setState({
            tags: [...this.state.tags, chip]
        })
    }


    onBeforeAdd(chip) {
        return chip.length >= 3
    }

    handleAddFansub(fan) {
        this.setState({
            fansub: [...this.state.fansub, fan]
        })
    }

    addHandler(name, selected) {
        this.setState({
            [name]: [...this.state[name], this.state[selected]],
            [selected]: ''
        })
        console.log("Name ", name, " selected ", selected);
    }

    handleDelete(deletedChip) {
        this.setState({
            tags: this.state.tags.filter((c) => c !== deletedChip)
        })
    }

    handleDelete2(deleted, name) {
        this.setState({
            [name]: this.state[name].filter((c) => c !== deleted)
        })
    }

    format() {
        let data = {};
        for (let i in this.state) {
            if (this.state[i] instanceof Array && this.state[i].length < 1)
                continue;
            if (this.state[i] && outStates.indexOf(i) === -1) {
                data = {
                    ...data,
                    [i]: this.state[i],
                }
            }
        }
        data = {
            ...data,
            createAt: firebase.firestore.FieldValue.serverTimestamp(),
        }
        this.saveData(data);

    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.titleName !== '') {
            this.handleClose();
            if (this.state.file) {
                const id = Math.random().toString(36).substring(2);
                const user = firebase.auth().currentUser;
                const storageRef = firebase
                    .storage()
                    .ref(`/cover/${user.uid}/${id}`);
                const task = storageRef.put(this.state.file);
                task.on(
                    "state_changed",
                    (snapshot) => {
                        let porcentaje =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        this.setState({
                            uploadValue: porcentaje,
                        });
                    },
                    (error) => console.log(error),
                    () => {
                        task.snapshot.ref.getDownloadURL().then((downloadUrl) => {
                            this.setState({
                                cover: downloadUrl
                            })
                            this.format();

                            console.log(downloadUrl);
                        })
                    })
                console.log(this.state.file);
            } else {
                console.log("No se subio imagen");
                this.format();
            }
        } else {
            this.setState({
                alert: true
            })
            setTimeout(() => {
                this.setState({
                    alert: false
                })
            }, 3000);
        }

    };

    handleChangeSlider(event, newValue) {
        this.setState({
            punctuation: newValue
        })
    }

    handleUpload(event) {
        this.setState({
            file: event.target.files[0],
            preview: URL.createObjectURL(event.target.files[0])
        })
    }

    saveData(data) {
        let user = firebase.auth().currentUser;
        let db = firebase.firestore();
        db.collection("users")
            .doc(user.uid)
            .collection("mangas").add(
                data
            ).then(() => {
                console.log("Data guardada")
            })

        this.setState({
            titleName: '',
            status: 'Siguiendo',
            type: 'Manga',
            lecture: '',
            tags: [],
            punctuation: 0,
            englishtitle: '',
            spanishtitle: '',
            artist: '',
            cover: '',
            author: '',
            synopsis: '',
            lastchapter: '',
            ubication: '',
            otherlink: [],
            fansub: [],
            category: [],
            preview: '',
            file: '',
            otherNames: []
        });

    }

    render() {
        const { classes } = this.props;
        const estado = ['Siguiendo', 'Pendientes', 'Abandonados', 'Completos', 'Favoritos', 'Pausados'];
        const demografia = ['Shounen', 'Shoujo', 'Josei', 'Seinen', 'Kodomo'];
        const types = ['Manga', 'Manhwa', 'Manhua', 'Cómic', 'Original'];
        const categorias = ['Romance', 'Misterio', 'Acción', 'Comedia'];
        const { titleName, tags, punctuation, category, synopsis, alert, lastchapter, ubication } = this.state;
        const inputs = ["lecture", "englishtitle", "spanishtitle", "author", "artist"];
        const labels = ["Link de Lectura", "Título en Inglés", "Título en Español", "Autor", "Artista"]
        const Inputs = ["otherNames", "fansub", "otherlink"];
        const Labels = ["Otros Nombres", "Fansubs", "Otros Links"];
        const Selectors = ["selectedN", "selectedF", "selectedO"];

        return <div>
            <Dialog open={this.state.open} maxWidth="xs" onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Añadir Cómic</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12} sm={12}>

                            <div className={classes.select}>
                                <Collapse in={alert}>
                                    <Alert
                                        severity="error"
                                        action={
                                            <IconButton
                                                size="small"
                                                onClick={() => {
                                                    this.setState({
                                                        alert: false
                                                    })
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                    >
                                        Escribe un titulo.
        </Alert>
                                </Collapse>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoFocus
                                label="Titulo"
                                onChange={this.handleChange}
                                fullWidth
                                className={classes.select}
                                variant="outlined"
                                required
                                name="titleName"
                                size="small"
                                value={titleName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Estado"
                                className={classes.select}
                                size="small"
                                select
                                required
                                fullWidth
                                onChange={this.handleChange}
                                name="status"
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                            >
                                {estado.map((value) =>
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                )}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Tipo"
                                className={classes.select}
                                select
                                fullWidth
                                onChange={this.handleChange}
                                size="small"
                                required
                                name="type"
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                            >
                                {types.map((value) =>
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                )}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Demografía"
                                className={classes.select}
                                select
                                fullWidth
                                onChange={this.handleChange}
                                size="small"
                                required
                                name="demo"
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                            >
                                {demografia.map((value) =>
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                )}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Categorías"
                                variant="outlined"
                                name="category"
                                fullWidth
                                value={category}
                                className={classes.select}
                                select
                                onChange={this.handleChange}
                                size="small"
                                SelectProps={{
                                    multiple: true,
                                    renderValue: selected => (
                                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                                            {selected.map(value => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                    size="small"
                                                    style={{ margin: 2 }}
                                                />
                                            ))}
                                        </div>
                                    )
                                }}
                            >

                                {categorias.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={category.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        {this.state.preview && <div className="center">
                            <img className="cover" alt="cover" src={this.state.preview} />
                        </div>}
                        <Grid item xs={12} sm={12} className={classes.upload}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                onChange={this.handleUpload}
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Subir Portada
                                </Button>
                            </label>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Último capitulo leído"
                                fullWidth
                                className={classes.select}
                                variant="outlined"
                                size="small"
                                name="lastchapter"
                                type="number"
                                onChange={this.handleChange}
                                value={lastchapter}
                            />
                        </Grid>
                        {
                            inputs.map((value, index) => <Grid key={value} item xs={12} sm={12}>
                                <TextField
                                    label={labels[index]}
                                    fullWidth
                                    className={classes.select}
                                    variant="outlined"
                                    size="small"
                                    name={value}
                                    onChange={this.handleChange}
                                    value={this.state[value]}
                                />
                            </Grid>
                            )
                        }

                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Sinopsis"
                                fullWidth
                                className={classes.select}
                                variant="outlined"
                                size="small"
                                name="synopsis"
                                multiline
                                rows={4}
                                onChange={this.handleChange}
                                value={synopsis}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Ubicación"
                                fullWidth
                                className={classes.select}
                                variant="outlined"
                                size="small"
                                name="ubication"
                                onChange={this.handleChange}
                                value={ubication}
                            />
                        </Grid>
                        {
                            Inputs.map((value, index) =>
                                <Grid item xs={12} sm={12} key={value}>
                                    <TextField
                                        label={Labels[index]}
                                        fullWidth
                                        className={classes.select}
                                        variant="outlined"
                                        size="small"
                                        name={Selectors[index]}
                                        onChange={this.handleChange}
                                        value={this.state[Selectors[index]]}
                                        onKeyPress={(ev) => {
                                            if (ev.key === 'Enter') {
                                                this.addHandler(value, Selectors[index]) // here was the mistake
                                            }
                                        }}
                                    />
                                    {this.state[value].length > 0 &&
                                        <div className={classes.demo}>
                                            <List dense className={classes.demo}>
                                                {
                                                    this.state[value].map((values) => {
                                                        return <ListItem key={values}>
                                                            <ListItemText
                                                                primary={values}
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <IconButton edge="end" aria-label="delete" onClick={() => {
                                                                    this.handleDelete2(values, value);
                                                                }}>
                                                                    <CancelIcon className={classes.warning} />
                                                                </IconButton>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    })
                                                }
                                            </List>
                                        </div>
                                    }
                                </Grid>
                            )
                        }
                        <Grid item xs={12} sm={12}>
                            <ChipInput
                                value={tags}
                                onBeforeAdd={(chip) => this.onBeforeAdd(chip)}
                                onAdd={(chip) => this.handleAdd(chip)}
                                onDelete={(deletedChip) => this.handleDelete(deletedChip)}
                                fullWidth
                                size="small"
                                className={classes.select}
                                InputProps={{
                                    inputProps: {
                                        className: classes.inputChip,
                                    }
                                }}
                                variant="outlined"
                                label='Etiquetas'
                            />
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <div className="margin">
                                <Typography id="non-linear-slider" gutterBottom>
                                    Puntuación
      </Typography>
                                <Slider
                                    value={punctuation}
                                    min={0}
                                    step={1}
                                    max={100}
                                    name="punctuation"
                                    onChange={this.handleChangeSlider}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="non-linear-slider"
                                />
                            </div>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
          </Button>
                    <Button type="submit"
                        onClick={this.handleSubmit} color="primary">
                        Guardar
          </Button>
                </DialogActions>
            </Dialog>

        </div >
    }
}

export default withStyles(useStyles)(Add);