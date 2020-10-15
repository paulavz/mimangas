import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: "1.5em !important",
        textAlign: "center"
    },
}));

export default function BarTitle({ titleName }) {

    const classes = useStyles();

    return <AppBar position="static">
        <Typography variant="h6" className={classes.title}>
            {titleName}
        </Typography>
    </AppBar>



}
