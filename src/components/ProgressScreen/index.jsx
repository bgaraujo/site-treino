import React from "react";
import {
    CircularProgress
} from "@material-ui/core";
import "./style.scss";

const ProgressScreen = ({progress=''}) => {
    return(
        <div className="ProgressScreen">
            <CircularProgress />
            <div className="savingMessage">
                <p>Salvando...</p>
                {
                    progress!=='' &&
                    <p>{`${parseInt(progress)} %`}</p>
                }
            </div>
        </div>
    );
}
export default ProgressScreen;