import React, { useEffect, useState } from "react";
import {connect} from "react-redux";
import { Grid, Avatar, Fab, Typography, Paper, Button } from "@material-ui/core";
import "./style.scss";
import {database} from "../../Firebase";
import profilePic from "../../assets/pictures/profile.jpg";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const ManageCustomer = ({state}) => {
    let { uuid } = useParams();
    const history = useHistory();
    const [user, setUser] = useState();
    const [metrics, setMetrics] = useState();

    useEffect(() => {
        if(uuid) getCustomer(uuid);
    },[uuid])

    const getCustomer = (userId) => {
        database.ref("users").child(userId).get().then((snapshot) =>{
            if(snapshot.exists()){
                setUser(snapshot.val())
            }
        })
        database.ref("customer-rating").child(userId).get().then((data) => {
            if(data.exists()){
                var arr = [];
                for (const key in data.val() )
                    arr.push(data.val()[key])
                
                arr.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
                setMetrics(arr);
            }
        })
    }

    return(
        <Grid
            container
            justify="center"
            spacing={3}
            className="manage-customer"
        >
            <Grid
                item
                xs={12}
            >
                <Paper>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        className="header-profile"
                        spacing={2}
                    >
                        <Grid item>
                            <Avatar src={profilePic} className="profile-pic"/>
                        </Grid>
                        
                        <Grid item>
                            <Fab variant="extended" className="profile-name">
                            {user ? user.name : ""}
                            </Fab>
                        </Grid>
                        <Grid item>
                        <Typography variant="button">
                            Aluno
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid
                item
                xs={12}
                className="weight-box"
            >
                <Paper>
                    <p>Peso atual: {metrics && metrics[metrics.length-1].weight}</p>
                    <p>Massa magra: {metrics && metrics[metrics.length-1].leanMass}</p>
                    <p>Massa gorda: {metrics && metrics[metrics.length-1].fatMass}</p>
                    <p>Gordura visceral: {metrics && metrics[metrics.length-1].visceralFat}</p>
                    <span>atualizado:{metrics && moment.unix(metrics[metrics.length-1].date).format("DD/MM/YYYY")}</span>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={() => history.push("custom-workout-list/"+uuid)} fullWidth endIcon={<FitnessCenterIcon />}>
                    Treinos
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={() => history.push("list-client-rating/"+uuid)} fullWidth endIcon={<TrendingUpIcon />}>
                    Metricas
                </Button>
            </Grid>
        </Grid>
    );
}

export default connect(state => ({state:state}))(ManageCustomer);