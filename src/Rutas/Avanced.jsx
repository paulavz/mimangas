import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
    input: {
        minWidth: 120,
        marginBottom: theme.spacing(1),
        maxWidth: "100%",
    },
    formControl: {
        width: "100%",
    },
    opciones: {
    },
    gridOpciones: {
        textAlign: "left",
        borderRight: "solid 1px",
        borderBottom: "solid 1px",
        borderRightColor: `rgba(0, 0, 0, 0.12)`,
        borderBottomColor: `rgba(0, 0, 0, 0.12)`,
        padding: theme.spacing(1),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const tipos = ["Manga", "Manhwa", "Manhua", "Cómic", "Original"];
const dermografias = ["Seinen", "Shounen", "Shoujo", "Josei", "Kodomo"];
const tagsPrueba = ["isekai", "4-koma", "musica", "buen dibujo", "lentes"];
const categorias = ["Horror", "Acción", "Comedia", "Romance", "Ecchi", "Slice of Life"];

export default function Avanced({ estados, mangas, buscador, volver }) {
    const classes = useStyles();

    const [selected, setSelected] = useState({
        demo: "",
        type: "",
        status: "",
        tag: "",
    });
    const [tagArray, setTagArray] = useState([]);
    const [categories, setCategories] = useState([]);
    const [mangasFiltrados, setMangasFiltrados] = useState([]);

    /**
     * Devuelve los mangas que coincidan con todos los states
     */
    function buscar() {
        let buscadorRE = buscador.toLowerCase().trim();

        let nuevoMangas = (buscador) ? mangas.filter((value) => {
            let arrayNombres = [];
            if (value.englishtitle) arrayNombres.push(value.englishtitle);
            if (value.spanishtitle) arrayNombres.push(value.spanishtitle);
            arrayNombres.push(value.titleName);
            return arrayNombres.some((title) => title.toLowerCase().includes(buscadorRE));
        }) : mangas;

        for (let i in selected) {
            if (selected[i] && i !== "tag") {
                nuevoMangas = nuevoMangas.filter((value) => selected[i] === value[i]);
            }
        }

        if (tagArray.length > 0)
            nuevoMangas = nuevoMangas.filter(
                (manga) => tagArray.every(
                    (etiqueta) => manga.tags ? manga.tags.indexOf(etiqueta) > -1 : false));

        if (categories.length > 0)
            nuevoMangas = nuevoMangas.filter(
                (value) => categories.every(
                    (categoria) => value.category ? value.category.indexOf(categoria) > -1 : false));

        return nuevoMangas;
    }

    const filtrar = () => setMangasFiltrados(buscar());

    const handleChangeSelected = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setSelected({
            ...selected,
            [name]: value,
        });
    };

    const eraseSelected = (name) => {
        setSelected({
            ...selected,
            [name]: "",
        });
    }

    const handleAddTag = () => {
        if (!selected.tag || tagArray.indexOf(selected.tag) !== -1) return;
        let newTags = [...tagArray];
        newTags.push(selected.tag);
        console.log(newTags);

        eraseSelected("tag");
        setTagArray(newTags);
    }

    const handleDeleteTag = (indice) => {
        let newTags = [...tagArray];
        newTags.splice(indice, 1);

        setTagArray(newTags);
    }

    return <div className={classes.root} >
        <Paper square elevation={1} className={classes.opciones} >
            <Grid container spacing={0} >
                <Grid item xs={6} md={3} className={classes.gridOpciones} >
                    <Typography align="center" variant="h5" color="primary">Filtros</Typography>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <InputLabel id="type-field">Tipo</InputLabel>
                        <Select
                            labelId="type-field"
                            id="type-select"
                            value={selected.type}
                            name="type"
                            onChange={handleChangeSelected}
                            className={classes.input}
                        >
                            <MenuItem value={""} >Cualquiera</MenuItem>
                            {tipos.map((tipo) => <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl component="fieldset" className={classes.formControl}>
                        <InputLabel id="demo-field">Dermografía</InputLabel>
                        <Select
                            labelId="demo-field"
                            id="dermo-select"
                            value={selected.demo}
                            name="demo"
                            onChange={handleChangeSelected}
                            className={classes.input}
                        >
                            <MenuItem value={""} >Cualquiera</MenuItem>
                            {dermografias.map((tipo) => <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl component="fieldset" className={classes.formControl}>
                        <InputLabel id="status-field">Estado</InputLabel>
                        <Select
                            labelId="status-field"
                            id="status-select"
                            value={selected.status}
                            name="status"
                            onChange={handleChangeSelected}
                            className={classes.input}
                        >
                            <MenuItem value={""} >Cualquiera</MenuItem>
                            {estados.slice(1).map((tipo) => <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={3} className={classes.gridOpciones} >
                    <Typography align="center" variant="h5" color="primary">Etiquetas</Typography>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <InputLabel htmlFor="tags-field">Añadir</InputLabel>
                        <Input
                            id="tags-field"
                            fullWidth
                            inputProps={{
                                list: "tags",
                            }}
                            value={selected.tag}
                            name="tag"
                            onChange={handleChangeSelected}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="add-tags-button"
                                        onClick={() => handleAddTag()}
                                        title="Añadir"
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <datalist id="tags">
                            {tagsPrueba.map((value, index) => <option value={value} key={value + index} />)}
                        </datalist>
                    </FormControl>
                    <br />
                    {tagArray.map((tag, index) =>
                        <Chip
                            label={tag}
                            key={tag + index}
                            onDelete={() => handleDeleteTag(index)}
                            className={classes.chip}
                        />
                    )}
                </Grid>

                <Grid item xs={6} md={3} className={classes.gridOpciones} >
                    <Typography align="center" variant="h5" color="primary">Categorias</Typography>
                    <FormControl component="fieldset" className={classes.formControl} >
                        <InputLabel id="category-field">Generos</InputLabel>
                        <Select
                            labelId="category-field"
                            id="category-field-select"
                            multiple
                            value={categories}
                            name="category"
                            onChange={(event) => setCategories(event.target.value)}
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                            className={classes.input}
                        >
                            {categorias.map((tipo) => <MenuItem key={tipo} value={tipo}>
                                <Checkbox checked={categories.indexOf(tipo) > -1} />
                                <ListItemText primary={tipo} />
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                    <List dense >
                        {categories.map((value) => <ListItem key={value}>
                            <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                            <ListItemText primary={value} />
                        </ListItem>)}
                    </List>
                </Grid>
            </Grid>
            <Button onClick={filtrar}>Buscar</Button>
            <Button onClick={volver}>Volver</Button>
        </Paper>
        {mangasFiltrados.map((value) => <p key={value.titleName}>{value.titleName}</p>)}
    </div>
}