import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import { pink } from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import Avatar from '@material-ui/core/Avatar';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import firebase from '../Inicializer/firebase';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './Add.css'
require("firebase/auth");
require("firebase/firestore");



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
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },

});

class Add extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: '',
            state: 'Siguiendo',
            type: 'Manga',
            link: '',
            artist: '',
            src: '',
            englishtitle: '',
            spanishtitle: '',
            author: '',
            sinopsis: '',
            lastchapter: '',
            demo: '',
            category: [],
            target: '',
            ubication: '',
            otherlink: '',
            puntuation: '',
            fansub: ''
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
        console.log(this.state)
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleClose();
        console.log("submit")
        let data = {
            title: this.state.title,
            state: this.state.state,
            type: this.state.type,
            link: this.state.link
        }
        this.saveData(data)
        this.setState({
            title: '',
            state: 'Siguiendo',
            type: 'Manga',
            link: ''
        })
    };

    saveData(data) {
        console.log("Enviar data...");
        let user = firebase.auth().currentUser;
        let db = firebase.firestore();
        db.collection("users")
            .doc(user.uid)
            .collection("mangas").add(
                data
            ).then(() => {
                console.log("Data guardada")
            })

    }

    render() {
        const { classes } = this.props;
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };
        const estado = ['Siguiendo', 'Pendientes', 'Abandonados', 'Completos', 'Favoritos', 'Pausados'];
        const demografia = ['Shounen', 'Shoujo', 'Josei', 'Seinen', 'Kodomo'];
        const types = ['Manga', 'Manhwa', 'Manhua', 'Cómic', 'Original'];
        const categorias = ['Romance', 'Misterio', 'Acción', 'Comedia'];
        const { title, link, category, src, artist, englishtitle, spanishtitle, author, sinopsis, lastchapter, ubication, puntuation, fansub } = this.state;
        return <div>
            <div className="add">
                <IconButton size="small" onClick={this.handleClickOpen}>
                    <Avatar className={classes.pink}>
                        <AddIcon />
                    </Avatar>
                </IconButton>
            </div>
            <Dialog open={this.state.open} maxWidth="xs" onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Añadir Cómic</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoFocus
                                label="Titulo"
                                onChange={this.handleChange}
                                fullWidth
                                className={classes.select}
                                variant="outlined"
                                required
                                name="title"
                                size="small"
                                value={title}
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
                                name="state"
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
                                label="Link de Lectura"
                                fullWidth
                                className={classes.select}
                                variant="outlined"
                                size="small"
                                required
                                name="link"
                                onChange={this.handleChange}
                                value={link}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Titulo en Inglés"
                                fullWidth
                                className={classes.select}
                                variant="outlined"
                                size="small"
                                name="englishtitle"
                                onChange={this.handleChange}
                                value={englishtitle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Titulo en Español"
                                fullWidth
                                className={classes.select}
                                size="small"
                                variant="outlined"
                                name="spanishtitle"
                                onChange={this.handleChange}
                                value={spanishtitle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Autor"
                                fullWidth
                                className={classes.select}
                                variant="outlined"
                                size="small"
                                name="author"
                                onChange={this.handleChange}
                                value={author}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Artista"
                                fullWidth
                                className={classes.select}
                                variant="outlined"
                                size="small"
                                name="artist"
                                onChange={this.handleChange}
                                value={artist}
                            />
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
                                label="Sinopsis"
                                fullWidth
                                className={classes.select}
                                variant="outlined"
                                size="small"
                                name="sinopsis"
                                multiline
                                rows={4}
                                onChange={this.handleChange}
                                value={sinopsis}
                            />
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
        </div>
    }
}

export default withStyles(useStyles)(Add);
