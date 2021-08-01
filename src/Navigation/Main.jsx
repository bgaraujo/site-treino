import React from "react";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import NavigationLogOff from "./NavigationLogOff";


const Main = ({state}) => {
    return(
        <>
            { 
                state.userID?
                <Navigation/>:
                <NavigationLogOff/>
            }
        </>
    );
};

export default connect(state => ({state:state})) (Main);