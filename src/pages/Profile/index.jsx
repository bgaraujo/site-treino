import React, { useState , useEffect } from "react";
import { useHistory } from "react-router-dom"
import { connect } from "react-redux";
import {
    Grid,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Paper
} from "@material-ui/core";
import moment from 'moment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import "./style.scss";
import {database} from "../../Firebase/index";

const Profile = ({state}) => {
    const [name,setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [gender, setGender] = useState("");

    const history = useHistory();

    useEffect(() => {
        getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    const updateProfile = () => {
        const {userID} = state;
        database.ref('users/'+userID).set({
            name:name,
            birthdate:birthdate,
            gender:gender
        });
        alert("Dados salvos com sucesso");
        history.goBack();
    }

    const getProfile = () => {
        const {userID} = state;

        database.ref().child("users").child(userID).get().then((snapshot) => {
        if (snapshot.exists()) {
            var data = snapshot.val();
            setName(data.name);
            setBirthdate(data.birthdate);
            setGender(data.gender);
        }else{
            var date = new Date();
            date.setFullYear( date.getFullYear() - 18 );
            setBirthdate(moment(date).format("YYYY-MM-DD"));
        }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <Paper>
            <Grid
                className="profile"
                container
                direction="column"
                justify="center"
            >
                <Grid item className="center">
                    <AccountCircleIcon className="profile-picture"/>
                    <p>foto</p>
                </Grid>
                <Grid item>
                    <form noValidate autoComplete="off">
                        <TextField
                            label="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth/>

                        <TextField
                            type="date"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            defaultValue="2000-01-01"
                            label="Data de nascimento"
                            fullWidth/>

                    </form>
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
                <Grid item>
                    <Button variant="contained" onClick={updateProfile} >Salvar</Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default  connect( state => ({state:state}) ) (Profile);