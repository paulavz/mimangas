import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    opciones: {
        backgroundColor: "azure",
    },
    gridOpciones: {
        textAlign: "center",
        borderLeft: "solid 1px",
        borderColor: `rgba(0, 0, 0, 0.12)`,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
}));

export default function Avanced({estados}){
    const classes = useStyles();

    const [selected, setSelected] = useState({
        dermography: "",
        type: "",
        state: "",
        tag: "",
    });
    const [tagArray, setTagArray] = useState([]);

    const tipos = ["Manga", "Manwha", "Manhua", "Cómic", "Original"];
    const dermografias = ["Seinen", "Shounen", "Shoujo", "Josei", "Kodomo"];
    const tagsPrueba = ["isekai", "4-koma", "musica", "buen dibujo", "lentes"];

    const handleChangeSelected = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setSelected({
            ...selected,
            [name]: value,
        })
    }

    const eraseSelected = (name) => {
        setSelected({
            ...selected,
            [name]: "",
        });
    }

    const handleAddTag = () => {
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

    return <div>
        <Paper square elevation={1} className={classes.opciones} >
            <Grid container spacing={1} >
                <Grid item xs={6} sm={4} md={3} className={classes.gridOpciones} onClick={()=>eraseSelected("type")} >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Tipo</FormLabel>
                        <RadioGroup aria-label="type" name="type" value={selected.type} onChange={handleChangeSelected}>
                            {tipos.map((value) => <FormControlLabel 
                                value={value}
                                control={<Radio />} 
                                label={value}
                                key={value}
                            />)}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={4} md={3} className={classes.gridOpciones} onClick={()=>eraseSelected("dermography")} >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Dermografia</FormLabel>
                        <RadioGroup aria-label="dermography" name="dermography" value={selected.dermography} onChange={handleChangeSelected}>
                            {dermografias.map((value) => <FormControlLabel 
                                value={value}
                                control={<Radio />} 
                                label={value}
                                key={value}
                            />)}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={4} md={3} className={classes.gridOpciones} onClick={()=>eraseSelected("state")} >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Estado</FormLabel>
                        <RadioGroup aria-label="state" name="state" value={selected.state} onChange={handleChangeSelected}>
                            {estados.slice(1).map((value) => <FormControlLabel 
                                value={value}
                                control={<Radio />} 
                                label={value}
                                key={value}
                            />)}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={4} md={3} className={classes.gridOpciones} >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Etiquetas</FormLabel>
                        <Input
                            id="Tags-field"
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
                    {tagArray.map((tag, index)=> 
                        <Chip
                            label={tag}
                            key={tag+index}
                            onDelete={()=>handleDeleteTag(index)}
                            className={classes.chip}
                        />
                    )}
                </Grid>
            </Grid>
        </Paper>
    </div>
}