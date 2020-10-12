import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Valoration from './Valoration';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    cover: {
        width: "100%",
        maxWidth: 300,
        minHeight: 330,
        marginTop: theme.spacing(1),
    },
    tabs: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        fontSize: "1.5em !important",
        textAlign: "center"
    }
}));



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function InfoManga({ manga, open, onClose }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const AntTabs = withStyles({
        root: {
            borderBottom: '1px solid #e8e8e8',
        },
        indicator: {
            backgroundColor: '#1890ff',
        },
    })(Tabs);

    const AntTab = withStyles((theme) => ({
        root: {
            textTransform: 'none',
            minWidth: 72,
            fontWeight: theme.typography.fontWeightRegular,
            marginRight: theme.spacing(4),
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:hover': {
                color: '#40a9ff',
                opacity: 1,
            },
            '&$selected': {
                color: '#1890ff',
                fontWeight: theme.typography.fontWeightMedium,
            },
            '&:focus': {
                color: '#40a9ff',
            },
        },
        selected: {},
    }))((props) => <Tab disableRipple {...props} />);


    return (
        <div>
            <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
                <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
                <div className={classes.root}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <div>
                                    <Valoration puntuacion={manga.punctuation} />

                                </div>
                                <img className={classes.cover} src={manga.cover || "https://firebasestorage.googleapis.com/v0/b/mismangas-7e620.appspot.com/o/uploads%2F3oesb3tldzt?alt=media&token=e006a18c-b59d-4a74-b2c7-d3849a0d49ba"} alt="" />
                            </Paper>
                        </Grid>
                        <Grid item xs={9}>
                            <AppBar position="static">
                                <Typography variant="h6" className={classes.title}>
                                    {manga.titleName}
                                </Typography>
                            </AppBar>
                            <div className={classes.demo1}>
                                <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                                    <AntTab label="Tab 1" />
                                    <AntTab label="Tab 2" />
                                    <AntTab label="Tab 3" />
                                </AntTabs>
                                <Typography className={classes.padding} />
                            </div>
                        </Grid>

                    </Grid>
                </div>
            </Dialog>
        </div>
    );
}