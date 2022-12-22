/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Typography } from "@material-ui/core";
import { calcIMC } from "../../helpers/imcCalc";

const IMCSlider = ({ratings,user}) => {
    const [imc, setImc] = useState(0);
    const [range, setRange] = useState();

    useEffect(() =>{
        getIMC();
    },[])
    useEffect(() =>{
        init();
    },[imc])

    const getIMC = () => {
        var lastRate;
        for(var id in ratings){
            var rating = ratings[id];
            rating.timestamp = parseInt(moment(rating.date).format("X"));
            
            if(lastRate && rating.timestamp > lastRate.timestamp)
            lastRate = rating;
        }
        var result = (rating.weight / (rating.height * rating.height)).toFixed(1);
        setImc(parseFloat(result));
    }

    const init = () => {
        if(!imc) return;
        const myRange = calcIMC(imc,user.gender);
        setRange(myRange)
    }

    return(
        <>
            {
                range &&
                <>
                    <Typography variant="body">
                        {`Seu imc é ${imc} e voce esta ${range.title}`} 
                    </Typography>
                </>
            }
        </>
    );
}
export default IMCSlider;