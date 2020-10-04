import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Card from '@material-ui/core/Card';
//import Grid from '@material-ui/core/Grid';

const useStyles = (theme) => ({
    root: {
      width: "100%",
    },
    puntos: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1,
    },
    puntuacion: {
        width: "100%",
        textAlign: "center",
        position: "absolute",
        top: 4,
    },
    content: {
        padding: theme.spacing(1),
        position: "relative",
    },
    card: {
        height: 300,
        borderColor: "black",
        borderWidth: 3,
        borderStyle: "solid",
    },
    textSpace: {
        height: 50,
        width: "100%",
        backgroundColor: `rgba(0, 0, 0, 0.3)`,
        position: "absolute",
        bottom: 0,
        transition: "height 600ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        textAlign: "center",
        color: "white",
        '&:hover': {
            height: "100%",
        },
    },
    container: {
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
    },
});

class TarjetaManga extends Component{

    constructor(props){
        super(props);
        this.state = {

        };
        this.colorBorde = this.colorBorde.bind(this);

    }

    /**
     * Devuelve el color del borde según el estado del componente
     * @param {string} estado 
     */
    colorBorde(estado){
        switch(estado){
            case "Leído":
                return "red";
            case "Siguiendo":
                return "cyan";
            default:
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.props.manga !== nextProps.manga;
    }

    render(){
        const { manga, classes } = this.props;

        const color = this.colorBorde(manga.estado);

        return <div className={classes.root} >
            <div className={classes.content}>
                <div className={classes.puntos} >
                    <FavoriteIcon 
                        fontSize="large" 
                        style={{color: color}} 
                    />
                    <div className={classes.puntuacion} >{manga.puntuacion.toString()}</div>
                </div>
                <Card
                    className={classes.card} 
                    style={{borderColor: color}} 
                >
                    <div 
                        className={classes.container} 
                        style={{backgroundImage: `url(${manga.imagen})`}}                     
                    >
                        <div className={classes.textSpace} >
                            {manga.nombre}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    }

}

export default withStyles(useStyles)(TarjetaManga);