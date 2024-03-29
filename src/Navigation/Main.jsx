/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import NavigationLogOff from "./NavigationLogOff";
import { Grid, CircularProgress } from '@material-ui/core';
import { setUser } from '../Store/actions';
import { auth } from "../Firebase";


const Main = ({dispatch,state}) => {
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
        state.userID?
        <Navigation/>:
        <NavigationLogOff/>
    );
};

export default connect(state => ({state:state})) (Main);