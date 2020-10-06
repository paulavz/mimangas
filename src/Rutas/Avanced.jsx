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
    formControl : {
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

const tipos = ["Manga", "Manwha", "Manhua", "Cómic", "Original"];
const dermografias = ["Seinen", "Shounen", "Shoujo", "Josei", "Kodomo"];
const tagsPrueba = ["isekai", "4-koma", "musica", "buen dibujo", "lentes"];
const categorias = ["Horror", "Acción", "Comedia", "Romance", "Ecchi", "Slice of Life"];

export default function Avanced({estados}){
    const classes = useStyles();

    const [selected, setSelected] = useState({
        dermography: "",
        type: "",
        state: "",
        tag: "",
    });
    const [tagArray, setTagArray] = useState([]);
    const [categories, setCategories] = useState([]);

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
        if(!selected.tag || tagArray.indexOf(selected.tag)!==-1) return;
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
                    <br/>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <InputLabel id="dermography-field">Dermografía</InputLabel>
                        <Select
                            labelId="dermography-field"
                            id="dermo-select"
                            value={selected.dermography}
                            name="dermography"
                            onChange={handleChangeSelected}
                            className={classes.input}
                        >
                            <MenuItem value={""} >Cualquiera</MenuItem>
                            {dermografias.map((tipo) => <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <br/>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <InputLabel id="state-field">Estado</InputLabel>
                        <Select
                            labelId="state-field"
                            id="state-select"
                            value={selected.state}
                            name="state"
                            onChange={handleChangeSelected}
                            className={classes.input}
                        >
                            <MenuItem value={""} >Cualquiera</MenuItem>
                            {estados.map((tipo) => <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>)}
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
                                    onClick={()=>handleAddTag()}
                                    title="Añadir"
                                  >
                                    <AddIcon />
                                  </IconButton>
                                </InputAdornment>
                            }
                        />
                        <datalist id="tags">
                            {tagsPrueba.map((value, index)=> <option value={value} key={value+index} />)}
                        </datalist>
                    </FormControl>
                    <br/>
                    {tagArray.map((tag, index)=> 
                        <Chip
                            label={tag}
                            key={tag+index}
                            onDelete={()=>handleDeleteTag(index)}
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
                            onChange={(event)=> setCategories(event.target.value)}
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
                            <ListItemIcon><CheckCircleIcon/></ListItemIcon>
                            <ListItemText primary={value} />
                        </ListItem>)}
                    </List>
                </Grid>
            </Grid>
        </Paper>
    </div>
}