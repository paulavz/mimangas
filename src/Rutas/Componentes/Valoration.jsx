import React from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';

export default function Valoration({ puntuacion }) {

    const estrellas = () => {
        let newPuntuation = Math.round((10 * puntuacion) / 100);
        let estrellitas = [[<StarBorderIcon key="0" />, <StarBorderIcon key="1" />, <StarBorderIcon key="2" />, <StarBorderIcon key="3" />, <StarBorderIcon key="4" />],
        [<StarHalfIcon key="0" />, <StarBorderIcon key="1" />, <StarBorderIcon key="2" />, <StarBorderIcon key="3" />, <StarBorderIcon key="4" />],
        [<StarIcon key="0" />, <StarBorderIcon key="1" />, <StarBorderIcon key="2" />, <StarBorderIcon key="3" />, <StarBorderIcon key="4" />],
        [<StarIcon key="0" />, <StarHalfIcon key="1" />, <StarBorderIcon key="2" />, <StarBorderIcon key="3" />, <StarBorderIcon key="4" />],
        [<StarIcon key="0" />, <StarIcon key="1" />, <StarBorderIcon key="2" />, <StarBorderIcon key="3" />, <StarBorderIcon key="4" />],
        [<StarIcon key="0" />, <StarIcon key="1" />, <StarHalfIcon key="2" />, <StarBorderIcon key="3" />, <StarBorderIcon key="4" />],
        [<StarIcon key="0" />, <StarIcon key="1" />, <StarIcon key="2" />, <StarBorderIcon key="3" />, <StarBorderIcon key="4" />],
        [<StarIcon key="0" />, <StarIcon key="1" />, <StarIcon key="2" />, <StarHalfIcon key="3" />, <StarBorderIcon key="4" />],
        [<StarIcon key="0" />, <StarIcon key="1" />, <StarIcon key="2" />, <StarIcon key="3" />, <StarBorderIcon key="4" />],
        [<StarIcon key="0" />, <StarIcon key="1" />, <StarIcon key="2" />, <StarIcon key="3" />, <StarHalfIcon key="4" />],
        [<StarIcon key="0" />, <StarIcon key="1" />, <StarIcon key="2" />, <StarIcon key="3" />, <StarIcon key="4" />]];
        if (isNaN(newPuntuation)) {
            newPuntuation = 0;
        }
        return estrellitas[newPuntuation];
    }

    return <div>
        {estrellas()}
    </div>



}
