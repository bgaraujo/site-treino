/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
    Grid,
    TextField,
    Paper,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@material-ui/core";
import { database, auth } from "../../Firebase";
import moment from 'moment';

const AddCustomer = ({ state }) => {
    let { id } = useParams();
    const history = useHistory()

    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState(moment().format("YYYY-MM-DD"));
    const [gender, setGender] = useState("F");
    const [name, setName] = useState("");

    useEffect(() => {
        if (id)
            ;
    }, []);


    const saveUser = () => {
        auth.createUserWithEmailAndPassword(email,email).then((userCredential) => {
            database.ref('users').child(userCredential.user.uid).set({
                birthdate:birthdate,
                gender:gender,
                name:name,
                admin:false
            }).then(() => {
                auth.sendPasswordResetEmail(email).then(() => {
                    history.goBack();
                });
            });

        }).catch((error) => console.log(error))
    }

    return (
        <Paper>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="standard-basic"
                        label="Nome"
                        fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="standard-basic"
                        label="email"
                        fullWidth />
                </Grid>
                <Grid item>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Género</FormLabel>
                        <RadioGroup
                            row
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}>
                            <FormControlLabel value="F" control={<Radio />} label="Feminino" />
                            <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        label="Data"
                        type="date"
                        fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={saveUser}
                    >
                        Salvar
            </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
export default connect(state => ({ state: state }))(AddCustomer);