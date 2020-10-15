import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ChipInput from "material-ui-chip-input";
import ListItemText from '@material-ui/core/ListItemText';
import Slider from '@material-ui/core/Slider';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import MostradorMangas from './Componentes/MostradorMangas';
import {
    types as tipos,
    demographies as demografias,
    categories as categorias
} from './Globales';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
    input: {
        marginBottom: theme.spacing(2),
        maxWidth: "100%",
    },
    titulo: {
        marginBottom: theme.spacing(1),
    },
    formControl: {
        width: "100%",

    },
    search: {
        float: "right"
    },
    margins: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    gridOpciones: {
        textAlign: "left",
        borderRight: "solid 1px",
        borderBottom: "solid 1px",
        borderRightColor: `rgba(0, 0, 0, 0.12)`,
        borderBottomColor: `rgba(0, 0, 0, 0.12)`,
        padding: theme.spacing(1),
        position: 'sticky',
        top: 0,
        maxHeight: '657px',
        overflow: "hidden",
        transition: "height 1s",
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    inputChip: {
        paddingBottom: '0 !important',
        '&:focus': {
            paddingBottom: '12px !important',
        },
        transition: "padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: `calc(100% - 32px)`,
    },
    opcionesMovil: {
        minWidth: "100%",
        position: "static",
    },
    botonFiltros: {
        width: "-webkit-fill-available",
        borderRadius: 0,
        marginTop: theme.spacing(1),
        '& .MuiButton-label': {
            textAlign: "left",
            justifyContent: "start",
        },
    },
}));

const CssTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#2196f3',
            },
            '& :hover': {
                borderColor: '#2196f3',
            },
        },
    },
})(TextField);

/**
 * Devuelve los mangas que coincidan con todos los states
 */
function buscar(filtros, mangas) {
    const { buscador, punctuation } = filtros;

    const iguales = ["demo", "type", "status"];
    const includes = ["author_artist"];
    const arrays = ["tags", "category"];
    const strArrIncludes = ["fansub"];

    let nuevoMangas = mangas;

    if (buscador) {
        let buscadorRE = buscador.toLowerCase().trim();
        nuevoMangas = nuevoMangas.filter((value) => {
            let arrayNombres = [];
            if (value.englishtitle) arrayNombres.push(value.englishtitle);
            if (value.spanishtitle) arrayNombres.push(value.spanishtitle);
            if (value.otherNames) arrayNombres.push(...value.otherNames);
            arrayNombres.push(value.titleName);
            return arrayNombres.some((title) => title.toLowerCase().includes(buscadorRE));
        });
    }

    arrays.forEach((nombre) => {
        if (filtros[nombre] && filtros[nombre].length > 0) {
            nuevoMangas = nuevoMangas.filter(
                (manga) => manga[nombre] && filtros[nombre].every(
                    (campo) => manga[nombre].indexOf(campo) > -1
                )
            );
        }
    });

    iguales.forEach((nombre) => {
        if (filtros[nombre]) {
            nuevoMangas = nuevoMangas.filter((value) => filtros[nombre] === value[nombre]);
        }
    });

    includes.forEach((nombre) => {
        if (filtros[nombre]) {
            let campos = nombre.split("_");
            nuevoMangas = nuevoMangas.filter((manga) => campos.some(
                (campo) => manga[campo] && manga[campo].toLowerCase().includes(filtros[nombre].toLowerCase())
            ));
        }
    });

    strArrIncludes.forEach((nombre)=>{
        if(filtros[nombre]){
            nuevoMangas = nuevoMangas.filter((manga) => manga[nombre] && manga[nombre].some(
                (value) => value.toLowerCase().includes(filtros[nombre].toLowerCase())
            ));
        }
    });

    if (punctuation && (punctuation[0] !== 0 || punctuation[1] !== 100)) {
        let minim = (acc, act) => Math.min(acc, act);
        let maxim = (acc, act) => Math.max(acc, act);
        nuevoMangas = nuevoMangas.filter((manga) => manga.punctuation &&
            manga.punctuation >= punctuation.reduce(minim) &&
            manga.punctuation <= punctuation.reduce(maxim));
    }

    return nuevoMangas;
}

export default function Avanced({ estados, mangas, tags }) {
    const classes = useStyles();

    const movil = useMediaQuery('(max-width:800px)');

    const [selected, setSelected] = useState({
        demo: "",
        type: "",
        status: "",
        tag: "",
        author_artist: "",
        fansub: "",
    });
    const [tagArray, setTagArray] = useState([]);
    const [categories, setCategories] = useState([]);
    const [mangasFiltrados, setMangasFiltrados] = useState([]);
    const [punctuation, setPunctuation] = useState([0, 100]);
    const [buscador, setBuscador] = useState("");
    const [openFiltros, setOpenFiltros] = useState(false);

    const handleChange = (event, newValue) => {
        setPunctuation(newValue);
    };

    const filtrar = () => setMangasFiltrados(buscar(
        {
            buscador: buscador,
            category: categories,
            tags: tagArray,
            punctuation: punctuation,
            ...selected,
        }, mangas
    ));

    const location = useLocation();

    useEffect(() => {
        setOpenFiltros(!movil)
    }, [movil]);

    useEffect(() => {
        if (location.state) {
            setBuscador(location.state.buscador || "");
            setSelected({
                demo: location.state.demo || "",
                type: location.state.type || "",
                status: location.state.status || "",
                tag: "",
                author_artist: location.state.author_artist || "",
                fansub: location.state.fansub || "",
            });
            setCategories(location.state.category || []);
            setTagArray(location.state.tags || []);
            setPunctuation(location.state.punctuation || [0, 100]);
        }
        setMangasFiltrados(buscar({
            ...location.state
        }, mangas));
    }, [location.state, mangas]);

    const handleChangeSelected = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setSelected({
            ...selected,
            [name]: value,
        });
    };

    const handleChangeBuscador = (event) => {
        setBuscador(event.target.value);
    }

    const handleAdd = (chip) => {
        setTagArray([...tagArray, chip])
    }
    const onBeforeAdd = (chip) => {
        return chip.length >= 3
    }

    const handleDelete = (deletedChip) => {
        let newChip = tagArray.filter((c) => c !== deletedChip)

        setTagArray(newChip)
    }

    return <Grid container >

        <Grid item xs={12} >
            <CssTextField
                fullWidth
                onChange={handleChangeBuscador}
                value={buscador}
                label="Buscar Manga"
                variant="outlined"
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        filtrar() // here was the mistake
                    }
                }}
                id="outlined-search"
                type="search"
            />
        </Grid>

        {!movil && <Divider className={classes.divider} variant="middle" />}

        {movil &&
            <Button
                className={classes.botonFiltros}
                onClick={() => setOpenFiltros(!openFiltros)}
                endIcon={openFiltros ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
                <Typography variant="h5" color="primary">Filtros</Typography>
            </Button>
        }

        <Grid item xs={3} md={3} className={[
            classes.gridOpciones, movil ? classes.opcionesMovil : "",
        ].join(" ")} style={{ padding: openFiltros ? null : 0, border: openFiltros ? null : 0 }}
        >
            <Collapse in={openFiltros}>
                <div className={classes.titulo}>
                    <Typography variant="h6" color="primary">Filtros
                {!movil && <IconButton onClick={filtrar} size="small" aria-label="search" className={classes.search}>
                            <SearchIcon color="primary" fontSize="small" />
                        </IconButton>}
                    </Typography>
                </div>
                <TextField
                    label="Autor/Artista"
                    onChange={handleChangeSelected}
                    fullWidth
                    className={classes.input}
                    variant="outlined"
                    name="author_artist"
                    size="small"
                    value={selected.author_artist}
                />
                <FormControl variant="outlined"
                    size="small" component="fieldset" className={classes.formControl}>
                    <InputLabel id="ddemo-simple-select-outlined-label">Tipos</InputLabel>
                    <Select
                        labelId="demo-field"
                        id="dermo-select"
                        label="Tipos"
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
                <FormControl variant="outlined"
                    size="small" component="fieldset" className={classes.formControl}>
                    <InputLabel id="demo-field">Demografía</InputLabel>
                    <Select
                        labelId="demo-field"
                        id="dermo-select"
                        label="Demografía"
                        value={selected.demo}
                        name="demo"
                        onChange={handleChangeSelected}
                        className={classes.input}
                    >
                        <MenuItem value={""} >Cualquiera</MenuItem>
                        {demografias.map((tipo) => <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>)}
                    </Select>
                </FormControl>
                <br />
                <FormControl variant="outlined"
                    size="small" component="fieldset" className={classes.formControl}>
                    <InputLabel id="demo-field">Estado</InputLabel>
                    <Select
                        labelId="demo-field"
                        id="dermo-select"
                        label="Estado"
                        value={selected.status}
                        name="status"
                        onChange={handleChangeSelected}
                        className={classes.input}
                    >
                        <MenuItem value={""} >Cualquiera</MenuItem>
                        {estados.slice(1).map((tipo) => <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>)}
                    </Select>
                </FormControl>
                <div className={classes.titulo}>
                    <Typography variant="h6" color="primary">Etiquetas</Typography>
                </div>
                <ChipInput
                    value={tagArray}
                    onBeforeAdd={(chip) => onBeforeAdd(chip)}
                    onAdd={(chip) => handleAdd(chip)}
                    onDelete={(deletedChip) => handleDelete(deletedChip)}
                    fullWidth
                    size="small"
                    className={classes.input}
                    InputProps={{
                        inputProps: {
                            className: classes.inputChip,
                            list: "tags",
                        }
                    }}
                    variant="outlined"
                    label='Etiquetas'
                />
                <datalist id="tags">
                    {tags.map((value, index) => <option value={value} key={value + index} />)}
                </datalist>


                <div className={classes.titulo}>
                    <Typography variant="h6" color="primary">Categorias</Typography>
                </div>
                <TextField
                    label="Categorías"
                    variant="outlined"
                    name="category"
                    className={classes.input}
                    fullWidth
                    value={categories}
                    select
                    onChange={(event) => setCategories(event.target.value)}
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
                            <Checkbox checked={categories.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </TextField>

                <div className={classes.titulo}>
                    <Typography variant="h6" color="primary">Fansub</Typography>
                </div>
                <TextField
                    label="Fansub"
                    onChange={handleChangeSelected}
                    fullWidth
                    className={classes.input}
                    variant="outlined"
                    name="fansub"
                    size="small"
                    value={selected.fansub}
                />
                <div className={classes.titulo}>
                    <Typography variant="h6" color="primary">Puntuación</Typography>
                </div>
                <div className={classes.margins}>
                    <Slider
                        value={punctuation}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                    />
                </div>
                <Button variant="contained" color="primary" fullWidth onClick={filtrar}>Buscar</Button>
            </Collapse>

        </Grid>
        <Grid item xs={9} md={9} className={movil ? classes.opcionesMovil : ""} >
            <MostradorMangas
                mangas={mangasFiltrados}
                style={{ minHeight: "90%", textAlign: "center" }}
                paginationProps={{
                    rowsPerPageOptions: [12, 24, 40]
                }}
                initialRPP={12}
            />
        </Grid>
    </Grid>
}