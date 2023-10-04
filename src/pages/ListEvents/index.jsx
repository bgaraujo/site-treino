import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import {
  Grid,
  Paper,
  Fab
} from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import { database } from "../../Firebase";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Event from '@material-ui/icons/Event';

const ListEvents = () => {
    const history = useHistory();
    const [arrEvent, setArrEvent] = useState([]);

    const getEvents = (id) => {
        database.ref().child("event").get().then((snapshot) => {
            if (snapshot.exists()) {
                const arrData = snapshot.val();
                var newArrEvent = [];
                for(const key in arrData){
                    newArrEvent.push({...arrData[key],id:key})
                }
                setArrEvent(newArrEvent);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getEvents();
    },[])

    return (
        <Grid container direction="column" spacing={3} >
            {
                arrEvent.map(event => <Grid key={event.id} item xs={12}>
                    <Paper onClick={() => history.push(`add-event/${event.id}`)}>
                        <Grid container direction="column" spacing={2} >
                            <Grid item xs={12}>
                                {event.title}
                            </Grid>
                            <Grid container direction="row" spacing={3} >
                                <Grid item>
                                    <Event/>{event.date}
                                </Grid>
                                <Grid item>
                                    <AccessAlarmIcon/> {event.time}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>)
            }
            <Fab
                onClick={() =>  history.push("add-event")}
                color="primary"
                className="addButton"
                aria-label="add">
                <AddIcon />
            </Fab>
        </Grid>
    );
};

export default ListEvents;
