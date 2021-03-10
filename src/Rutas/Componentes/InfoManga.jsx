import React from 'react';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Tab from '@material-ui/core/Tab';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import CreateIcon from '@material-ui/icons/Create';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import green from '@material-ui/core/colors/green';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/Save';
import Chip from '@material-ui/core/Chip';
import InfoIcon from '@material-ui/icons/Info';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit'
import Valoration from './Valoration';
import { statusColors as colors, states as estado } from '../Globales';
import BarTitle from '../Componentes/BarTitle';
import Add from '../Add';
import firebase from '../../Inicializer/firebase';
import Hidden from '@material-ui/core/Hidden';

require("firebase/firestore");
require("firebase/auth");

//Estilos

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        display: "inline-flex",
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
        height: 370,
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
        marginTop: "3px",
        marginRight: "20px",
        textAlign: "justify"
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
    edit: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        }
    },
    marginLeft: {
        marginLeft: theme.spacing(1),
    },

    rigthAbsolute: {
        position: "absolute",
        right: 0,
        top: 0,
    },
    demo1: {
        position: "relative",
    },
    centro: {
        textAlign: "center",
        width: "100%"
    },

}));

//Tabs

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
                <div className="padding" p={3}>
                    {children}
                </div>
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

    //Constantes

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [edit, setEdit] = React.useState({
        cap: false,
        status: false,
        tags: false
    });

    const [editDialog, setEditD] = React.useState(false);

    const [newValue, setNewValue] = React.useState({
        lastchapter: manga.lastchapter,
        status: manga.status,
        tags: ""
    });


    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setNewValue({
            ...newValue,
            [name]: value
        })

        console.log(newValue)
    };

    const updateData = (name, data) => {
        const user = firebase.auth().currentUser;
        const db = firebase.firestore();
        db.collection("users")
            .doc(user.uid)
            .collection("mangas").doc(manga.id).update({
                [name]: data
            }).catch(console.log)
    }

    const updateTag = (name, data) => {
        const user = firebase.auth().currentUser;
        const db = firebase.firestore();
        db.collection("users")
            .doc(user.uid)
            .collection("mangas").doc(manga.id).update({
                [name]: firebase.firestore.FieldValue.arrayUnion(data)
            }).catch(console.log)
        const database = firebase.firestore();
        database.collection("users")
            .doc(user.uid)
            .set({
                [name]: firebase.firestore.FieldValue.arrayUnion(data)
            },
                { merge: true })

    }

    const label = ["Tipo", "País de Origen", "Autor", "Artista", "Otros Nombres", "Demografía", "Sinopsis", "Género", "Fansubs", "Estado de Publicación", "Revista", "Serializado", "Editorial"];
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
            } else if (newOtherLinks[i].includes("facebook")) {
                band = "facebook";
            }
            else {
                band = newOtherLinks[i].split(".");
                band = band[0];
                band = band.replace("http://", "");
                band = band.replace("https://", "");
            }
            finalLink.push(
                <a className={classes.noStyledLink}
                    rel="noopener noreferrer"
                    target="_blank"
                    href={newOtherLinks[i]}
                >{band}
                </a>
            );
            if(i!==newOtherLinks.length-1){
                finalLink.push(", ");
            }
        }
    }

    const info = [manga.type,
        "",
    manga.author,
    manga.artist,
    manga.otherNames ? 
    manga.otherNames
        .concat([manga.englishtitle, manga.spanishtitle])
        .filter((value) => Boolean(value)).join(", ") : 
    [manga.englishtitle, manga.spanishtitle].filter((value) => Boolean(value)).join(", "),
    manga.demo,
    manga.synopsis,
    manga.category, 
    manga.fansub ? manga.fansub.join(", ") : "",
    "", "", "", ""]

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const divider = () => {
        return <Hidden only="xs">
            <Grid item xs={12}>
                <Divider className={classes.divider} />
            </Grid>
        </Hidden>
    }


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
            <Grid item xs={12} md={2} sm={4} >
                <div className={classes.centro}>
                    <div className="label">{value}</div>
                </div>
            </Grid>
            <Grid item xs={12} md={10} sm={6} >
                <div className={classes.datos}>
                    <div>{
                        newInfo.map((categoria, indice) =>
                            <React.Fragment key={categoria + indice}>
                                <Link onClick={() => onClose()}
                                    className={classes.noStyledLink}
                                    to={{
                                        pathname: "/AvancedSearch",
                                        state: {
                                            category: [categoria]
                                        }
                                    }} >
                                    {categoria}
                                </Link>
                                {indice < newInfo.length - 1 && ", "}
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </Grid>
            {divider()}
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
                        <Hidden smUp>
                            <Grid item xs={12}>
                                <BarTitle titleName={manga.titleName} />
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} sm={5} md={3}>
                            <Paper className={classes.paper}>
                                <div className={classes.item}>
                                    <Valoration puntuacion={manga.punctuation} />
                                    <div className={classes.number}>{manga.punctuation}</div>
                                </div>
                                <br />
                                <img className={classes.cover} src={manga.cover || "https://firebasestorage.googleapis.com/v0/b/mismangas-7e620.appspot.com/o/uploads%2F3oesb3tldzt?alt=media&token=e006a18c-b59d-4a74-b2c7-d3849a0d49ba"} alt="" />
                                <br />
                                {edit.status ? <div className={classes.flex}><TextField
                                    className={classes.edit}
                                    size="small"
                                    select
                                    defaultValue={manga.status}
                                    onChange={handleChange2}
                                    name="status"
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    {estado.map((value) =>
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    )}

                                </TextField>
                                    <IconButton onClick={() => {
                                        updateData("status", newValue.status);
                                        setEdit({
                                            ...edit,
                                            status: false
                                        })
                                    }} className={classes.marginLeft} size="small">
                                        <SaveIcon style={{ color: green[500] }} fontSize="small" />
                                    </IconButton>
                                    <IconButton onClick={() => setEdit({
                                        ...edit,
                                        status: false
                                    })} size="small">
                                        <CancelIcon color="error" fontSize="small" />
                                    </IconButton>
                                </div> :
                                    <div className={classes.flex}>
                                        <div className={classes.status + " status"} style={{ color: colors[manga.status] }}>{manga.status}</div>
                                        <div className="ocult">
                                            <IconButton onClick={() => setEdit({
                                                ...edit,
                                                status: true
                                            })} size="small">
                                                <ArrowDropDownIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                }

                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={7} md={9}>
                            <Hidden only="xs">

                                <BarTitle titleName={manga.titleName} />
                            </Hidden>
                            <div className={classes.demo1}>
                                <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                                    <AntTab label={<InfoIcon />} {...a11yProps(0)} />
                                    <AntTab label={<AddCircleIcon />} {...a11yProps(1)} />
                                </AntTabs>
                                <IconButton
                                    onClick={() => setEditD(!editDialog)}
                                    className={classes.rigthAbsolute}
                                >
                                    <EditIcon />
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
                                            if (newInfo && newInfo.length > 0) {
                                                return generos(value, index);
                                            } else
                                                newInfo = "";
                                        }

                                        return <React.Fragment key={index}>
                                            <Grid item xs={12} md={2} sm={4}>
                                                <div className={(value === "Estado de Publicación" || value === "Otros Nombres" ? (classes.publication + " ") : "") + "label " + value}>{value}</div>
                                            </Grid>
                                            <Grid item xs={12} md={10} sm={6}>
                                                <div className={classes.datos}>{
                                                    (obligatorias.includes(value) && newInfo) ?
                                                        <Link onClick={() => onClose()}
                                                            className={classes.noStyledLink}
                                                            to={{
                                                                pathname: "/AvancedSearch",
                                                                state: {
                                                                    [linkStates[obligatorias.indexOf(value)]]: newInfo
                                                                }
                                                            }} >{newInfo || "N/A"}</Link> :
                                                        (newInfo || "N/A")
                                                }</div>
                                            </Grid>
                                            {divider()}
                                        </React.Fragment>
                                    }
                                    ).filter((value, index) => (info[index] || ["Autor", "Artista", "Demografía", "Género"].includes(label[index])))}
                                </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Grid container>
                                    <Grid item xs={12} md={2} sm={4}>
                                        <div className={classes.publication + " label cero ancho"}>Último Capítulo</div>
                                    </Grid>
                                    <Grid item xs={12} md={10} sm={6}>
                                        {edit.cap ? <div className={classes.datos + " " + classes.flex}>
                                            <TextField style={{ width: "8ch" }} type="number" onChange={handleChange2} className={classes.edit} autoFocus name="lastchapter" value={newValue.lastchapter} />
                                            <IconButton onClick={() => {
                                                updateData("lastchapter", newValue.lastchapter);
                                                setEdit({
                                                    ...edit,
                                                    cap: false
                                                })
                                            }} className={classes.marginLeft} size="small">
                                                <SaveIcon style={{ color: green[500] }} fontSize="small" />
                                            </IconButton>
                                            <IconButton onClick={() => setEdit({
                                                ...edit,
                                                cap: false
                                            })} size="small">
                                                <CancelIcon color="error" fontSize="small" />
                                            </IconButton>
                                        </div> :
                                            <div className={classes.flex}>
                                                <div className={classes.minfont}>{manga.lastchapter || "N/A"}</div>
                                                <IconButton onClick={() => setEdit({
                                                    ...edit,
                                                    cap: true
                                                })} id="pencil" size="small">
                                                    <CreateIcon />
                                                </IconButton>
                                            </div>
                                        }
                                    </Grid>
                                    {divider()}
                                    <Grid item xs={12} md={2} sm={4}>
                                        <div className="label Etiquetas" style={{ marginTop: "5px" }}>Etiquetas</div>
                                    </Grid>
                                    <Grid item xs={12} md={10} sm={6}>
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
                                                    onClick={() => onClose()}
                                                >
                                                    <Chip label={value} className={classes.linkChip + " chipspacing"} color="primary" />
                                                </Link>)}
                                            {
                                                edit.tags ? <div><TextField style={{ width: "12ch" }} onChange={handleChange2} className={classes.edit} autoFocus name="tags" value={newValue.tags} />
                                                    <IconButton onClick={() => {
                                                        // let newTag = manga.tags;
                                                        // newTag.push(newValue.tags)
                                                        updateTag("tags", newValue.tags);
                                                        setEdit({
                                                            ...edit,
                                                            tags: false
                                                        });
                                                        setNewValue({
                                                            ...newValue,
                                                            tags: ""
                                                        });
                                                    }} className={classes.marginLeft} size="small">
                                                        <CheckCircleIcon style={{ color: green[500] }} fontSize="small" />
                                                    </IconButton>
                                                    <IconButton onClick={() => {
                                                        setEdit({
                                                            ...edit,
                                                            tags: false
                                                        });
                                                        setNewValue({
                                                            ...newValue,
                                                            tags: ""
                                                        });
                                                    }} size="small">
                                                        <CancelIcon color="error" fontSize="small" />
                                                    </IconButton>
                                                </div>
                                                    : <IconButton onClick={() => setEdit({
                                                        ...edit,
                                                        tags: true
                                                    })} size="small">
                                                        <AddCircleOutlineIcon fontSize="small" />
                                                    </IconButton>

                                            }

                                        </div>
                                    </Grid>
                                    {divider()}
                                    <Grid item xs={12} md={2} sm={4}>
                                        <div className="label">Link de Lectura</div>
                                    </Grid>
                                    <Grid item xs={12} md={10} sm={6}>
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
                                    {divider()}
                                    <Grid item xs={12} md={2} sm={4}>
                                        <div className="label"> Otros Link</div>
                                    </Grid>
                                    <Grid item xs={12} md={10} sm={6}>
                                        <div className={classes.datos}>{finalLink || "N/A"}</div>
                                    </Grid>
                                    {divider()}
                                    <Grid item xs={12} md={2} sm={4}>
                                        <div className="label">Ubicación</div>
                                    </Grid>
                                    <Grid item xs={12} md={10} sm={6}>
                                        <div className={classes.datos}>{manga.ubication || "N/A"}</div>
                                    </Grid>
                                    {divider()}
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