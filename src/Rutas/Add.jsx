import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
export default function Add(props) {

    return <div>
        <Icon color="secondary">add_circle</Icon>

        <IconButton aria-label="delete" >
            <AddIcon fontSize="large" />
        </IconButton>

    </div>



}


