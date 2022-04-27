import React, { useEffect } from "react";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import NavigationLogOff from "./NavigationLogOff";
import { Grid, CircularProgress } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
  } from "react-router-dom";
  import { setUser } from '../Store/actions';
import { auth } from "../Firebase";


const Main = ({dispatch,state}) => {
    const history = useHistory();
    console.log("history",history,state.userID);

    useEffect(() => {
        // Verifica se ja esta logado e entra direto
        auth.onAuthStateChanged((user) => {
            if( user ){
                dispatch(setUser(user.uid));
            }else{
                dispatch(setUser(null))
            }
        });
      }, []);

    if(state.userID === "loading")
        return(
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}>
                <Grid item>
                    Carregando
                </Grid>
                <Grid item>
                    <CircularProgress />
                </Grid>
            </Grid>
        );
    return(
        <Router>
            <Switch>
                {
                    state.userID?
                    <Route path="/site-treino" component={Navigation} />:
                    <Route path="/site-treino" component={NavigationLogOff} />
                }
            </Switch>
        </Router>
    );
};

export default connect(state => ({state:state})) (Main);