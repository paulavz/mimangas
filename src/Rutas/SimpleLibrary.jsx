import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Add from './Add';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TablePagination from '@material-ui/core/TablePagination';
import TarjetaManga from './Componentes/TarjetaManga';
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
    paginacion: {
        '& .MuiTablePagination-spacer': {
            flex: 0,
        },
        '& .MuiTablePagination-toolbar': {
            width: "max-content",
        },
    },
}));

export default function SimpleLibrary({busqueda, mangas, states}){
    const classes = useStyles();

    const [active, setActive] = useState("Todos");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [mangasFiltrados, setMangasFiltrados] = useState([]);

    useEffect(() => {
        const filtrados = mangas.filter(
            (value) => active === "Todos" || value.status === active
        ).filter(
            (value) => new RegExp(busqueda.toLowerCase()).test(value.titleName.toLowerCase())
        );
        if (page > filtrados.length / rowsPerPage) {
            setPage(Math.floor(filtrados.length / rowsPerPage));
        }
        setMangasFiltrados(filtrados);
    }, [page, rowsPerPage, busqueda, active, mangas]);

    const handleChange = (event) => {
        setActive(event.target.value);
    };
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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


            <Add />
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
        <Grid container spacing={2} >

            {mangasFiltrados.slice(rowsPerPage * page, (rowsPerPage * page) + rowsPerPage)
                .map((value, index) =>
                    <Grid item md={3} sm={6} xs={12} key={value.titleName + index} >
                        <TarjetaManga manga={value} />
                    </Grid>)}

        </Grid>


        {mangasFiltrados.length > 0 && <TablePagination
            component="div"
            count={mangasFiltrados.length}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelRowsPerPage="Mangas por pagina"
            labelDisplayedRows={({ from, to, count }) => `${from} - ${to} de ${count}`}
            className={classes.paginacion}
            nextIconButtonText="Siguiente"
            backIconButtonText="Anterior"
        />}

    </div>
}