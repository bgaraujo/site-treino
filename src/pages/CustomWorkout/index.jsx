/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Grid,
  Switch,
} from '@material-ui/core';
import "./style.scss";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { database } from "../../Firebase";
import RepeatIcon from '@material-ui/icons/Repeat';
import AlarmIcon from '@material-ui/icons/Alarm';
import Alert from '@material-ui/lab/Alert';


const CustomWorkout = ({state}) => {
  let { workoutid } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedWorkoutsDetails, setSelectedWorkoutsDetals] = useState([])
  const [imageURL, setImageURL] = useState();

  const workoutDone = workout => {
    database.ref(`users`).child(`${state.userID}/workout/${workoutid}/selectedWorkouts`).get().then((data) => {
      if(data.exists()){
        var workouts = data.val();

        var index = workouts.findIndex(obj => obj.id === workout.id);
        workouts[index]['done'] = workout.done? !workout.done : true;

        database.ref(`users`).child(`${state.userID}/workout/${workoutid}/selectedWorkouts`).set(workouts);

        index = selectedWorkoutsDetails.findIndex(obj => obj.id === workout.id);
        selectedWorkoutsDetails[index]["done"] = workouts[index]['done'];
        setSelectedWorkoutsDetals([...selectedWorkoutsDetails]);
      }
    });
  }

  const getPosts = async (selectedWorkouts) => {
    for (const key in selectedWorkouts) {
      if (Object.hasOwnProperty.call(selectedWorkouts, key)) {
        const element = selectedWorkouts[key];

        await database.ref().child("videos").child(element.id).get().then((snapshot) => {
            if (snapshot.exists()){
              selectedWorkouts[key]['detail'] = snapshot.val();
              setSelectedWorkoutsDetals([...selectedWorkouts]);
            }
        }).catch((error) => {
            console.error(error);
        });
      }

    }
  }

  const getWorkouts = () => {
    database.ref().child(`users/${state.userID}/workout`).child(workoutid).get().then((data) => {
      if(data.exists()){
          const workout = data.val();
          setName(workout.name);
          setDescription(workout.description);
          setImageURL(workout.imageURL);
          getPosts(workout.selectedWorkouts)
      }
    })
  }

  useEffect(() => {
    getWorkouts();
  },[ ]);

  return (
    <Grid
      container
      direction="column"
      className="CustomWorkout"
      spacing={3}>
        {imageURL && <img className="bgPost" src={imageURL} />}
        <Grid item xs={12}>
          <div className="header">
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
        </Grid>

      {
          selectedWorkoutsDetails.map( workout => {
            return(
              <Grid item key={workout.id} xs={12}>
                <Paper elevation={3} className="CustomWorkout">
                  {
                    workout.detail &&
                    <>
                      <Grid container direction="row" className="card-header">
                        <Grid item>
                          <h1>{workout.detail.title}</h1>
                        </Grid>

                        <Grid item>
                          <Switch
                            checked={workout.done ? workout.done : false}
                            onChange={() => workoutDone(workout)}
                            name="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                        </Grid>
                      </Grid>
                      <p className="caption">{workout.detail.description}</p>
                      <div className="ytPlayerContent" dangerouslySetInnerHTML={{ __html: `<iframe type="text/html"
                        origin="${window.location.origin}"
                        src="https://www.youtube.com/embed/${workout.detail.video.split('v=')[1]}?color=white"
                        frameBorder="0"/>`}}/>
                      <p><RepeatIcon/> Repetiçoes: {workout.repetitions}</p>
                      <p><AlarmIcon/> Pausa: {workout.break}</p>
                      {workout.note !== "" && <Alert severity="warning">{`Obs: ${workout.note}`}</Alert>}
                    </>
                  }
                </Paper>
              </Grid>
            );
          })
      }
    </Grid>
  );
}

export default connect(state => ({state:state}))(CustomWorkout);