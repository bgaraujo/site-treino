import React, { useState, useEffect } from "react"
import { 
    Slider
} from "@material-ui/core";
import moment from "moment";
import { calcIMC, table } from "../../helpers/imcCalc";

const IMCSlider = ({ratings,user}) => {
    const [imc, setImc] = useState(0);
    const [marks, setMarks] = useState();

    useEffect(() =>{
        getIMC();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(() =>{
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        console.log(myRange)
        setMarks([
            {
                value: 1,
                label: myRange.min
            },
            {
                value: 50,
                label: "50"
            },
            {
                value: 99,
                label: myRange.max
            },
        ])
    }

    // const marks = [
    //     {
    //       value: 1,
    //       label: '10',
    //     },
    //     {
    //       value: 99,
    //       label: '40',
    //     },
    // ];

    return(
        <>
            {
                marks?
                <Slider
                    disabled
                    defaultValue={(imc*2)}
                    step={1}
                    aria-labelledby="discrete-slider-small-steps"
                    marks={table[user.gender]}
                    valueLabelDisplay="on"
                />:
                ""
            }
        </>
    );
}
export default IMCSlider;