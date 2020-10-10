import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Add from './Add';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MostradorMangas from './Componentes/MostradorMangas';
import "./Library.css";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    selector: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.down("sm")]: {
            display: 'block',
        },
    },
    colbutton: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textTransform: 'none',
        [theme.breakpoints.down("sm")]: {
            display: 'none',
        },

        '& > *': {
            margin: theme.spacing(1),

        },
    },
    gridManga: {
        textAlign: "center",
        [theme.breakpoints.up("md")]: {
            '&.MuiGrid-grid-md-3': {
                maxWidth: "20%",
                flexBasic: "20%",
            },
        },
    },
    paginacion: {
        '& .MuiTablePagination-spacer': {
            flex: 0,
        },
        '& .MuiTablePagination-toolbar': {
            width: "max-content",
        },
    },
    cardNew:{
        height: 300,
        border: "1px solid black",
        '&:hover': {
            borderWidth: 2,
            cursor: "pointer",
        },
        '&:active': {
            borderColor: "blue",
            '& $cardNewIcon': {
                color: "blue",
            },
        },
    },
    cardNewIcon: {
        position: "relative",
        top: 120,
    },
}));

export default function SimpleLibrary({busqueda, mangas, states}){
    const classes = useStyles();

    const [active, setActive] = useState("Todos");
    const [mangasFiltrados, setMangasFiltrados] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);

    const large = useMediaQuery('(min-width:800px)');

    useEffect(() => {
        const filtrados = mangas.filter(
            (value) => active === "Todos" || value.status === active
        ).filter(
            (value) => value.titleName.toLowerCase().includes(busqueda.toLowerCase())
        );
        setMangasFiltrados(filtrados);
    }, [busqueda, active, mangas]);

    const handleChange = (event) => {
        setActive(event.target.value);
    };

    return <div className={classes.root} >
        <div className={classes.colbutton}>
            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                {states.map((value) =>
                    <Button
                        key={value}
                        className={`${active === value ? "active" : ""}`}
                        onClick={() => setActive(value)}
                    >
                        {value}
                    </Button>)}
            </ButtonGroup>


            <Add openAdd={openAdd} />
        </div>

        <div className={classes.selector}>
            <Grid container spacing={3}>
                <Grid item xs={12}>

                    <TextField
                        id="outlined-select-currency-native"
                        select
                        fullWidth
                        value={active}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                    >


                        {states.map((value) =>
                            <option
                                key={value}
                                value={value}
                            >
                                {value}
                            </option>)}
                    </TextField>

                </Grid>
            </Grid>
        </div>
        <MostradorMangas 
            spacing={2} 
            mangas={mangasFiltrados}
            paginationProps={{
                className: classes.paginacion
            }}
            itemsPorFila={large ? 5: null}
        />

        {mangas.length===0 && 
            <Grid container spacing={2} >
                <Grid item md={3} sm={6} xs={6} className={classes.gridManga} >
                    <Card className={classes.cardNew} onClick={()=>setOpenAdd(!openAdd)} >
                        <div className={classes.cardNewIcon}>
                            <AddIcon style={{fontSize: 50}} />
                            <Typography>Añadir primer manga</Typography>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        }

    </div>
}