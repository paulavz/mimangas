import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TarjetaManga from './TarjetaManga';
import Grid from '@material-ui/core/Grid';
import TablePagination from '@material-ui/core/TablePagination';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    paginationPC: {
        [theme.breakpoints.down('xs')]: {
            display: "none",
        },
    },
    grid5: {
        maxWidth: `${100/5}%`,
        textAlign: "center",
    }
}));

export default function ({ mangas, paginationProps, ...otrasProps }) {

    const classes = useStyles();
    const theme = useTheme();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const large = useMediaQuery('(min-width:1100px)');
    const xLarge = useMediaQuery(theme.breakpoints.up('xl'));
    const rppOptions = large 
        ? (xLarge ? [18, 30, 60, 120] : [10, 20, 50, 100])
        : [12, 20, 60, 100];

    useEffect(() => {
        if (page > mangas.length / rowsPerPage) {
            setPage(Math.floor(mangas.length / rowsPerPage));
        }
    }, [page, rowsPerPage, mangas]);

    useEffect(() => {
        setRowsPerPage(rppOptions[0]);
    }, [large, xLarge])

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
                    <Grid item xl={2} md={3} sm={6} xs={12}
                        className={large && classes.grid5}
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
                rowsPerPageOptions={rppOptions}
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