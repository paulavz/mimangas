import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { pink } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import './Add.css'

const useStyles = makeStyles((theme) => ({
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: '#f50057',
        width: theme.spacing(7),
        height: theme.spacing(7),
    },

}));
export default function Add(props) {



    const classes = useStyles();


    return <div className="add">
        <IconButton size="small">
            <Avatar className={classes.pink}>
                <AddIcon />
            </Avatar>
        </IconButton>


    </div>



}


