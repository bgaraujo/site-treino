import React, { useEffect } from 'react';
import Navigation from './Navigation/Main';
import { connect } from 'react-redux';
import "./App.scss";
import { setUser } from './Store/actions';
import { auth } from "./Firebase";

function App({dispatch}) {

  useEffect(() => {  
    // Verifica se ja esta logado e entra direto
    auth.onAuthStateChanged((user) => {
        if( user ){
            dispatch(setUser(user.uid))
        }else{
            dispatch(setUser(null))
        }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
        <Navigation/>
    </div>
  );
}

export default connect( state => ({state:state}) ) (App)