import React from "react";
import {
    CircularProgress
} from "@material-ui/core";
import "./style.scss";

const ProgressScreen = () => {
    return(
        <div className="ProgressScreen">
            <CircularProgress />
            <div className="savingMessage">
                <p>Salvando...</p>
            </div>
        </div>
    );
}
export default ProgressScreen;