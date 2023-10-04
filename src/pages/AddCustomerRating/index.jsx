import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { parseToFloat, parseToRealBr } from "../../helpers/parser";
import { 
    Grid,
    TextField,
    InputAdornment,
    Button,
    Paper
 } from "@material-ui/core";

import "./style.scss";
import { database } from "../../Firebase/index";

const AddCustomerRating = ({state}) => {
    let { uuid, id } = useParams();
    const history = useHistory();

    useEffect(()=>{
        if(id)
            getRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const getRating = () => {
        database.ref().child("customer-rating").child(uuid).child(id).get().then((snapshot) => {
        if (snapshot.exists()) {
            var data = snapshot.val();
            setHeight(parseToRealBr(data.height));
            setWeight(parseToRealBr(data.weight));
            setFatMass(parseToRealBr(data.fatMass));
            setLeanMass(parseToRealBr(data.leanMass));
            setHydration(parseToRealBr(data.hydration));
            setVisceralFat(parseToRealBr(data.visceralFat));
        }
        }).catch((error) => {
            console.error(error);
        });
    }
    
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [fatMass, setFatMass] = useState("");
    const [leanMass, setLeanMass] = useState("");
    const [hydration, setHydration] = useState("");
    const [visceralFat, setVisceralFat] = useState("");


    const saveData = () => {
        const date = new Date();
        
        if( window.confirm("Deseja salvar as metricas")){
            database.ref('customer-rating/'+uuid).push({
                date:parseInt(moment(date).format("X")),
                height:parseToFloat(height),
                weight:parseToFloat(weight),
                fatMass:parseToFloat(fatMass),
                leanMass:parseToFloat(leanMass),
                hydration:parseToFloat(hydration),
                visceralFat:parseToFloat(visceralFat)
            });
            alert("Dados salvos com sucesso");
            history.goBack();
        }

    }

    return (
        <Paper>
            <Grid
                container
                direction="column"
                justify="center"
                className="AddCustomerRating"
            >
                <Grid item>
                    <TextField
                        disabled={ id ? true : false}
                        label="Altura"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        fullWidth
                        />
                </Grid>
                <Grid item>
                    <TextField
                        disabled={ id ? true : false}
                        label="Peso"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                        }}
                        fullWidth
                        />
                </Grid>
                <Grid item>
                    <TextField
                        disabled={ id ? true : false}
                        label="Massa Gorda"
                        value={fatMass}
                        onChange={(e) => setFatMass(e.target.value)}
                        fullWidth
                        />
                </Grid>
                <Grid item>
                    <TextField
                        disabled={ id ? true : false}
                        label="Massa Magra"
                        value={leanMass}
                        onChange={(e) => setLeanMass(e.target.value)}
                        fullWidth
                        />
                </Grid>
                <Grid item>
                    <TextField
                        disabled={ id ? true : false}
                        label="Hidratação"
                        value={hydration}
                        onChange={(e) => setHydration(e.target.value)}
                        fullWidth
                        />
                </Grid>
                <Grid item>
                    <TextField
                        disabled={ id ? true : false}
                        label="Gordura Visceral"
                        value={visceralFat}
                        onChange={(e) => setVisceralFat(e.target.value)}
                        fullWidth
                        />
                </Grid>
                <Grid item>
                    { !id && <Button variant="contained" onClick={saveData}>Salvar</Button>}
                </Grid>
            </Grid>
        </Paper>
    );
}

export default connect(state => ({state:state})) (AddCustomerRating);