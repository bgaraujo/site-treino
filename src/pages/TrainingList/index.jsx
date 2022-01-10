/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';
import TrainingCard from '../../components/TrainingCard';
import { database } from "../../Firebase";

const TrainingList = ({state}) => {
    console.log(state);
    let uuid = state.userID;

    const[workouts, setWorkout] = useState([])

    const getData = () => {
        database.ref().child(`users/${uuid}/workout`).get().then((data) => {
            if(data.exists()){
                const arrData = data.val();
                var  arrWorkout = [];
                for (var id in arrData) {
                    arrData[id].id = id;
                    arrWorkout.push(arrData[id])
                }
                setWorkout(arrWorkout)
            }
        })
    }

    useEffect( () => {
        getData();
    }, [])

    return (
        <Grid container spacing={2}>
            {
                workouts.map( workout =>  
                    <Grid key={workout.id} item xs={12}>
                        <TrainingCard 
                            href={`/custom-workout/${workout.id}`}
                            img={workout.imageURL}
                            name={workout.name}
                            description={workout.description}
                            percent={
                                (workout.selectedWorkouts.filter( (workout) => { return workout.done === true}).length * 100)/workout.selectedWorkouts.length
                            }
                        />
                    </Grid>
                )
            }
        </Grid>
    );
}

export default connect(state => ({state:state}) )(TrainingList);