import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TarjetaManga from './TarjetaManga';
import Grid from '@material-ui/core/Grid';
import TablePagination from '@material-ui/core/TablePagination';
import Hidden from '@material-ui/core/Hidden';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    paginationPC: {
        [theme.breakpoints.down('xs')]: {
            display: "none",
        },
    },
}));

export default function ({ mangas, itemsPorFila, initialRPP, paginationProps, ...otrasProps }) {

    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (initialRPP) {
            setRowsPerPage(initialRPP);
        }
    }, [initialRPP])

    useEffect(() => {
        if (page > mangas.length / rowsPerPage) {
            setPage(Math.floor(mangas.length / rowsPerPage));
        }
    }, [page, rowsPerPage, mangas]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangePageMovil = (event, value) => {
        setPage(value-1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const {className, ...otrasPagProps} = paginationProps;

    return <div style={{ height: "100%", width: "100%" }}>
        <Grid container {...otrasProps} >
            {mangas.slice(rowsPerPage * page, (rowsPerPage * page) + rowsPerPage)
                .map((value, index) =>
                    <Grid item md={3} sm={6} xs={12}
                        style={itemsPorFila ? {
                            maxWidth: `${100 / itemsPorFila}%`,
                            textAlign: "center"
                        } : {}}
                        key={value.titleName + index}
                    >
                        <TarjetaManga manga={value} />
                    </Grid>)
            }
        </Grid>

        {mangas.length > rowsPerPage && <React.Fragment>
            <TablePagination
                component="div"
                count={mangas.length}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                labelRowsPerPage="Mangas por pagina"
                labelDisplayedRows={({ from, to, count }) => `${from} - ${to} de ${count}`}
                nextIconButtonText="Siguiente"
                backIconButtonText="Anterior"
                className={ [className || "", classes.paginationPC].join(" ") }
                {...otrasPagProps}
            />
            <Hidden smUp >
                <Pagination 
                    count={Math.ceil(mangas.length/rowsPerPage)} 
                    page={page+1}
                    onChange={handleChangePageMovil}
                    siblingCount={0}
                />
            </Hidden>
        </React.Fragment>}

    </div>
}