import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Add from './Add';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { pink } from '@material-ui/core/colors';
import MostradorMangas from './Componentes/MostradorMangas';
import './Add.css';
import "./Library.css";

const CssTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#2196f3',
            },
        },
    },
})(TextField);

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
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: '#f50057',
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    cardNew: {
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
    divider: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleLibrary({ mangas, states }) {
    const classes = useStyles();

    const [active, setActive] = useState("Todos");
    const [mangasFiltrados, setMangasFiltrados] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [buscador, setBuscador] = useState("");

    const large = useMediaQuery('(min-width:1100px)');

    useEffect(() => {
        const filtrados = mangas.filter(
            (value) => active === "Todos" || value.status === active
        ).filter(
            (value) => value.titleName.toLowerCase().includes(buscador.toLowerCase())
        );
        setMangasFiltrados(filtrados);
    }, [buscador, active, mangas]);

    const handleChange = (event) => {
        setActive(event.target.value);
    };

    const handleChangeBuscador = (event) => {
        setBuscador(event.target.value);
    }

    return <div className={classes.root} >
        <Grid container spacing={2}>
            <Grid item sm={9} xs={12}>
                <CssTextField
                    fullWidth
                    onChange={handleChangeBuscador}
                    value={buscador}
                    label="Buscar Manga"
                    variant="outlined"
                    id="outlined-search"
                    type="search"
                />
            </Grid>
            <Grid item sm={3} xs={12}>
                <Link
                    to={{
                        pathname: "/AvancedSearch",
                        state: {
                            buscador: buscador,
                        },
                    }} style={{ textDecoration: "none" }} ><Button
                        size="large"
                        className="buscar"
                        fullWidth
                        variant="contained"
                        color="secondary"
                    >
                        Búsqueda Avanzada
                </Button></Link>
            </Grid>

        </Grid>

        <Divider className={classes.divider} variant="middle" />
        <h1>Hola Mundo Prueba 2</h1>
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

        <div className="add">
            <IconButton size="small" onClick={() => setOpenAdd(!openAdd)}>
                <Avatar className={classes.pink}>
                    <AddIcon />
                </Avatar>
            </IconButton>
        </div>
        <Add openAdd={openAdd} />
        <MostradorMangas
            spacing={2}
            style={{ textAlign: "center" }}
            mangas={mangasFiltrados}
            paginationProps={{
                className: classes.paginacion,
                rowsPerPageOptions: [10, 20, 50, 100]
            }}
            itemsPorFila={large ? 5 : null}
        />

        {mangas.length === 0 &&
            <Grid container spacing={2} >
                <Grid item md={3} sm={6} xs={6} className={classes.gridManga} >
                    <Card className={classes.cardNew} onClick={() => setOpenAdd(!openAdd)} >
                        <div className={classes.cardNewIcon}>
                            <AddIcon style={{ fontSize: 50 }} />
                            <Typography>Añadir primer manga</Typography>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        }

    </div>
}