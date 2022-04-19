/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
    Grid,
    TextField,
    Paper,
    Button
} from "@material-ui/core";
import { database, auth } from "../../Firebase";

const AddCustomer = ({ state }) => {
    let { id } = useParams();
    const history = useHistory()

    const [title, setTitle] = useState("");
    const [email, setSummary] = useState("");
    const [password, setText] = useState("");

    useEffect(() => {
        if (id)
            getPost(id);
    }, []);


    const getPost = (id) => {
        database.ref().child("posts").child(id).get().then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                setTitle(data.title);
                setSummary(data.summary);
                setText(data.text);

            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const savePost = () => {
        auth.createUserWithEmailAndPassword()

        database.ref('users').push({
            birthdate:"1994-02-16",
            gender:"F",
            name:"Maria"
        });

        history.goBack();
    }

    return (
        <Paper>
            <Grid container direction="column" >
                <Grid item xs={12}>
                    <TextField
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id="standard-basic"
                        label="titulo"
                        fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={savePost}
                    >
                        Salvar
            </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
export default connect(state => ({ state: state }))(AddCustomer);