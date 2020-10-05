import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import { pink } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './Add.css'


const useStyles = (theme) => ({
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: '#f50057',
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
});




class Add extends Component {

    constructor(props) {

        super(props);

        this.state = {
            open: false
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return <div>
            <div className="add">
                <IconButton size="small" onClick={this.handleClickOpen}>
                    <Avatar className={classes.pink}>
                        <AddIcon />
                    </Avatar>
                </IconButton>
            </div>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Añadir Cómic</DialogTitle>
                <DialogContent>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Guardar
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    }
}

export default withStyles(useStyles)(Add);
