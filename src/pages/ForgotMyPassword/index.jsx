import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { 
    Grid,
    TextField,
    Button,
    Paper
} from "@material-ui/core";
import "./style.scss";
import { auth } from "../../Firebase/index";

const ForgotMyPassword = ({state}) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState();
    const history = useHistory();

    const sendPasswordResetEmail = () => {
        auth.sendPasswordResetEmail(email).then(function() {
            alert("Enviamos um email para a redefinição de senha, verifique sua caixa de entrada.");
            history.replace("/");
        }).catch(function(error) {
            setError(error.message)
        });
    }

    return (
        <Grid
        container
        justify="center"
        className="forgot-my-password"
        >
            <Grid item xs={12} sm={8}>
                <Paper elevation={3}>
                    <Grid
                        container
                        direction="column"
                        spacing={3}
                    >
                        <Grid item >
                            <h1>Redefinição de senha</h1>
                        </Grid>
                        <Grid item >
                            <TextField
                                error={ error ? true : false }
                                helperText={ error && error }
                                id="outlined-basic" 
                                label="Digite seu email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" fullWidth onClick={sendPasswordResetEmail}>
                                Redefinir senha
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" fullWidth onClick={()=> history.goBack()}>
                                Voltar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default connect(state => ({state:state})) (ForgotMyPassword);