import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    TextField,
    Button
} from '@material-ui/core';
import "./style.css";
import { auth } from "../../Firebase/index"

import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

const Login = ({state}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState();
    const history = useHistory(); 

    const login = () => {
        auth.signInWithEmailAndPassword(email,password).catch(function(error) {
            setError(error.message);
        }); 
    }

    const navigate = (href) => {
        history.push(href);
    }

    return(
            <div className="flexContainer">
                
                <div className="flexItem">
                    <div className="margin">
                        <FitnessCenterIcon className="margin" fontSize="large"/>
                    </div>
                    <form noValidate autoComplete="off">
                        <div className="margin">
                            <TextField  
                                error={ error ? true : false }
                                helperText={ error && "Verifique seu email" }
                                id="outlined-basic"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                label="Email" 
                                variant="outlined" 
                                fullWidth/>
                        </div>
                        <div className="margin">
                            <TextField 
                                error={ error ? true : false }
                                helperText={ error && "Verifique sua senha" }
                                className="margin" 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                id="outlined-basic" 
                                label="Senha" 
                                variant="outlined" 
                                fullWidth/>
                        </div>
                        <div className="margin">
                            <Button  className="margin" onClick={login} variant="contained" color="primary" fullWidth>
                                Entrar
                            </Button>
                        </div>
                        <div className="margin">
                            <p onClick={() => navigate("/forgotPassword")}>Esqueci minha senha.</p>
                        </div>
                    </form>
                </div>
                
            </div>
    );
}

export default  connect( state => ({state:state}) ) (Login);