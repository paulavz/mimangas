import React from 'react';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import pink from '@material-ui/core/colors/pink';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import InfoIcon from '@material-ui/icons/Info';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit'
import Valoration from './Valoration';
import Add from '../Add';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    item: {
        display: "inline-flex",
        fontFamily: "Pacifico, cursive"
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
    },
    datos: {
        marginLeft: "20px",
        marginTop: "3px"
    },
    label: {
        backgroundColor: pink[500],
        borderRadius: "30px",
        textAlign: "center",
        padding: "2px",
        border: "2px solid white",
        color: "white",
        fontWeight: "bold",
        fontSize: "15px",
    },

    divider: {
        margin: "5px"
    },
    publication: {
        fontSize: "13px"
    },
    minfont: {
        marginLeft: "20px",
    },
    chips: {
        '& > *': {
            margin: theme.spacing(0.5),
        },
        marginLeft: "15px"
    },
    number: {
        position: "relative",
        bottom: "4px",
    },
    status: {
        fontFamily: "Luckiest Guy",
        fontSize: "1.5em",
    },
    close: {
        width: "100%",
        textAlign: "center",
        minHeight: "40px",
        justifyContent: "center"
    },
    linkChip: {
        '&:hover': {
            cursor: "pointer",
        },
    },
    noStyledLink: {
        color: "inherit",
        textDecoration: "none",
    },
    rigthAbsolute: {
        position: "absolute",
        right: 0,
        top: 0,
    },
    demo1 : {
        position: "relative",
    },
}));



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function InfoManga({ manga, open, onClose }) {
    const classes = useStyles();
    const colors = {
        "Siguiendo": "lightCyan",
        "Completos": "lightGreen",
        "Favoritos": "gold",
        "Pausados": "midnightBlue",
        "Pendientes": "orange",
        "Abandonados": "crimson",
    };
    const [value, setValue] = React.useState(0);
    const [editDialog, setEditD] = React.useState(false);
    const label = ["Tipo", "País de Origen", "Autor", "Artista", "Otros Nombres", "Demografía", "Sinopsis", "Género", "Estado de Publicación", "Revista", "Serializado", "Editorial"];
    let newLecture = manga.lecture ? manga.lecture : "";
    if (newLecture !== "") {
        if (newLecture.includes("www")) {
            newLecture = newLecture.split(".");
            newLecture = newLecture[1];
        } else if (newLecture.includes("facebook")) {
            newLecture = "facebook";
        } else {
            newLecture = newLecture.split(".");
            newLecture = newLecture[0];
            newLecture = newLecture.replace("http://", "")
            newLecture = newLecture.replace("https://", "")
        }
    }
    let newOtherLinks = manga.otherlink ? manga.otherlink : "";
    let finalLink = [];
    let band;
    if (newOtherLinks !== "") {
        for (let i = 0; i < newOtherLinks.length; i++) {
            if (newOtherLinks[i].includes("www")) {
                band = newOtherLinks[i].split(".");
                band = band[1];
                finalLink.push(band);
            } else if (newOtherLinks[i].includes("facebook")) {
                finalLink.push("facebook");
            }
            else {
                band = newOtherLinks[i].split(".");
                band = band[0];
                band = band.replace("http://", "")
                band = band.replace("https://", "")
                finalLink.push(band)
            }
        }
    }

    const info = [manga.type,
        "",
    manga.author,
    manga.artist,
    manga.otherNames ? manga.otherNames.concat([manga.englishtitle, manga.spanishtitle]).filter((value) => Boolean(value)).join(", ") : "",
    manga.demo,
    manga.synopsis,
    manga.category, "", "", "", ""]

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

    const generos = (value, index) => {

        let newInfo = info[index];

        return <React.Fragment key={index}>
            <Grid item xs={2}>
                <div className={classes.label}>{value}</div>
            </Grid>
            <Grid item xs={10}>
                <div className={classes.datos}>
                    <div>{
                    newInfo.map((categoria, indice)=>
                    <React.Fragment key={categoria + indice}>
                        <Link onClick={()=>onClose()}
                            className={classes.noStyledLink}
                            to={{
                            pathname: "/AvancedSearch",
                            state: {
                                category: [categoria]
                            }
                        }} >
                            {categoria}
                        </Link>
                        {indice < newInfo.length-1 && ", "}
                    </React.Fragment>
                    )}
                    </div>
                </div>
            </Grid>
            <Grid item xs={12}>
                <Divider className={classes.divider} />
            </Grid>
        </React.Fragment>
    }


    return (
        <div>
            <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
                <Button onClick={onClose} className={classes.close}>
                    <CloseIcon />
                </Button>
                <div className={classes.root}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <div className={classes.item}>
                                    <Valoration puntuacion={manga.punctuation} />
                                    <div className={classes.number}>{manga.punctuation}</div>
                                </div>
                                <img className={classes.cover} src={manga.cover || "https://firebasestorage.googleapis.com/v0/b/mismangas-7e620.appspot.com/o/uploads%2F3oesb3tldzt?alt=media&token=e006a18c-b59d-4a74-b2c7-d3849a0d49ba"} alt="" />
                                <div className={classes.status} style={{ color: colors[manga.status] }}>{manga.status}</div>
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
                                    <AntTab label={<InfoIcon />} {...a11yProps(0)} />
                                    <AntTab label={<AddCircleIcon />} {...a11yProps(1)} />

                                    

                                </AntTabs>
                                <IconButton
                                    onClick={()=>setEditD(!editDialog)}
                                    className={classes.rigthAbsolute}
                                >
                                    <EditIcon/>
                                </IconButton>
                                <Typography className={classes.padding} />
                            </div>
                            <TabPanel value={value} index={0}>
                                <Grid container>
                                    {label.map((value, index) => {
                                        const obligatorias = ["Autor", "Artista", "Demografía", "Género"];
                                        if (!(info[index] || obligatorias.includes(value)))
                                            return <div key={index} />;
                                        
                                        const linkStates = ["author_artist", "author_artist", "demo", "category"];

                                        let newInfo = info[index];
                                        if (value === "Género") {
                                            if(newInfo && newInfo.length>0){
                                                return generos(value, index);
                                            }else
                                            newInfo = "";
                                        }

                                        return <React.Fragment key={index}>
                                            <Grid item xs={2}>
                                                <div className={(value === "Estado de Publicación" || value === "Otros Nombres" ? (classes.publication + " ") : "") + classes.label}>{value}</div>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <div className={classes.datos}>{
                                                    (obligatorias.includes(value) && newInfo) ?
                                                    <Link onClick={()=>onClose()}
                                                        className={classes.noStyledLink}
                                                        to={{
                                                        pathname: "/AvancedSearch",
                                                        state: {
                                                            [linkStates[obligatorias.indexOf(value)]]: newInfo
                                                        }
                                                    }} >{newInfo || "N/A"}</Link>:
                                                    (newInfo || "N/A")
                                                }</div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider className={classes.divider} />
                                            </Grid>
                                        </React.Fragment>
                                    }
                                    ).filter((value, index) => (info[index] || ["Autor", "Artista", "Demografía", "Género"].includes(label[index])))}
                                </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Grid container>
                                    <Grid item xs={2}>
                                        <div className={classes.publication + " " + classes.label}>Último Capítulo</div>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <div className={classes.minfont}>{manga.lastchapter || "N/A"}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider className={classes.divider} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div className={classes.label} style={{ marginTop: "5px" }}>Etiquetas</div>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <div className={classes.chips}>
                                            {manga.tags && manga.tags.map((value) =>
                                            <Link 
                                                to={{
                                                    pathname: "/AvancedSearch",
                                                    state: {
                                                        tags: [value]
                                                    }
                                                }}
                                                 key={value}
                                                className={classes.noStyledLink}
                                                onClick={()=>onClose()}
                                            >
                                                <Chip label={value} className={classes.linkChip} color="primary" />
                                            </Link>)}
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider className={classes.divider} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div className={classes.label}>Link de Lectura</div>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <div className={classes.datos}>
                                            <a 
                                                className={classes.noStyledLink}
                                                href={manga.lecture}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                {newLecture}
                                            </a>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider className={classes.divider} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div className={classes.label}> Otros Link</div>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <div className={classes.datos}>{finalLink || "N/A"}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider className={classes.divider} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div className={classes.label}>Ubicación</div>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <div className={classes.datos}>{manga.ubication || "N/A"}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider className={classes.divider} />
                                    </Grid>
                                </Grid>
                            </TabPanel>
                        </Grid>
                    </Grid>
                </div>
            </Dialog>
            <Add openAdd={editDialog} manga={manga} />
        </div >
    );
}