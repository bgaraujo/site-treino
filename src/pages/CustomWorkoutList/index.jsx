/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TrainingCard from '../../components/TrainingCard';
import { database } from "../../Firebase";

const CustomWorkoutList = () => {
    let { uuid } = useParams();
    const history = useHistory();

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
                console.log(arrWorkout)
                setWorkout(arrWorkout)
            }
        })
    }

    useEffect( () => {
        getData();
    }, [])

    return (
        <>
            <Grid container spacing={2}>
                {
                    workouts.map( workout =>  
                        <Grid key={workout.id} item xs={12}>
                            <TrainingCard 
                                href={`add-custom-workout/${uuid}/${workout.id}`}
                                img={workout.imageURL}
                                name={workout.name}
                                description={workout.description}
                                percent={workout.selectedWorkouts.length}
                            />
                        </Grid>
                    )
                }
            </Grid>
            <Fab 
                onClick={() => history.push(`add-custom-workout/${uuid}`)}
                color="primary" 
                className="addButton" 
                aria-label="add">
                <AddIcon />
            </Fab>
        </>
    );
}

export default CustomWorkoutList;