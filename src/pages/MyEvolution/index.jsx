import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { 
    Paper,
    Grid,
    Typography
} from "@material-ui/core";
import "./style.scss";
import ChartLine from "../../components/ChartLine";
import moment from "moment";
import IMCSlider from "../../components/IMCSlider";
import { database } from "../../Firebase";

const MyEvolution = ({state}) => {
    const [user, setUser] = useState();
    const [ratings, setRatings] = useState();

    useEffect(() => {
        getProfile(() => {
            getRatings()
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const getProfile = (callback) => {
        const {userID} = state;
        
        database.ref().child("users").child(userID).get().then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                setUser(data);
                callback();
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const getRatings = () => {
        const {userID} = state;
        
        database.ref().child("customer-rating").child(userID).get().then((snapshot) => {
        if (snapshot.exists()) {
            var data = snapshot.val();
            setRatings(data);
        }
        }).catch((error) => {
            console.error(error);
        });
    }

    const mapData = (lRatings, field, name) => {
        var data = {
            labels: [],
            datasets: [],
        };
        var dataSet = {
            label: name,
            data: [],
            fill: false,
            borderColor: '#EE887A',
            tension: 0.1
        };

        for(var id in lRatings){
            const rating = lRatings[id];
            data.labels.push(moment.unix(rating.date).format("MM/YYYY"));
            dataSet.data.push(rating[field]);
        }
        data.datasets.push(dataSet)
        return data;
    }

    return (
        <Grid container spacing={3} className="MyEvolution">
            <Grid item xs={12} md={6}>
                <Paper elevation={3}>
                    <Typography >IMC: </Typography>
                    {
                        ratings?<IMCSlider user={user} ratings={ratings} />:""
                    }
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3}>
                    {
                        ratings?< ChartLine data={() => mapData(ratings, "weight", "Peso")} />:""
                    }
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3}>
                    {
                        ratings?< ChartLine data={() => mapData(ratings, "fatMass", "Massa Gorda")} />:""
                    }
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper elevation={3}>
                    {
                        ratings?< ChartLine data={() => mapData(ratings, "leanMass", "Masa Magra")} />:""
                    }
                </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
                <Paper elevation={3}>
                    {
                        ratings?< ChartLine data={() => mapData(ratings, "visceralFat", "Gordura Viceral")} />:""
                    }
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper elevation={3}>
                    {
                        ratings?< ChartLine data={() => mapData(ratings, "hydration", "Hidratação")} />:""
                    }
                </Paper>
            </Grid>

        </Grid>
    );
}

export default connect( state => ({state:state})) (MyEvolution);