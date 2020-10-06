import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = (theme) => ({
    root: {
      width: "100%",
      maxWidth: 300,
      display: "inline-block",
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
    options: {},
    button: {
        width: "100%",
        height: "100%",
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
        backgroundSize: "100% 100%",
    },
});

class TarjetaManga extends Component{

    constructor(props){
        super(props);
        this.state = {

        };
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);

    }

    shouldComponentUpdate(nextProps, nextState){
        return this.props.manga !== nextProps.manga;
    }

    render(){
        const { manga, classes } = this.props;

        const colors = {
            "Siguiendo": "lightCyan",
            "Completo": "lightGreen", 
            "Favoritos": "gold",
            "Pausados": "midnightBlue",
            "Pedientes": "orange",
            "Abandonados": "crimson",
        };

        return <div className={classes.root} >
            <div className={classes.content}>
                <div className={classes.puntos} >
                    <FavoriteIcon 
                        fontSize="large" 
                        style={{color: colors[manga.status]}} 
                    />
                    <div className={classes.puntuacion} >{manga.punctuation}</div>
                </div>
                <Card
                    className={classes.card} 
                    style={{borderColor: colors[manga.status]}} 
                >
                    <div 
                        className={classes.container} 
                        style={{backgroundImage: `url(${manga.cover})`}}                     
                    >
                        <ButtonBase 
                            focusRipple
                            className={classes.button}
                            onClick={()=>console.log("Se hizo click xD")}
                        />
                        <div className={classes.textSpace} >
                            {manga.titleName}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    }

}

export default withStyles(useStyles)(TarjetaManga);