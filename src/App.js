import React from 'react';
import Navigation from './Navigation/Main';
import { connect } from 'react-redux';
import "./App.scss";

function App({dispatch, state}) {

  return (
    <div className="App">
        <Navigation/>
    </div>
  );
}

export default connect( state => ({state:state}) ) (App)