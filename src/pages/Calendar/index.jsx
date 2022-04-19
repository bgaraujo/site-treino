import React, {useState,useEffect} from 'react';
import { database } from "../../Firebase";
import {
  Grid,
  Paper
} from '@material-ui/core';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Event from '@material-ui/icons/Event';
import SaveIcon from '@material-ui/icons/Save';
import "./style.scss";

const Calendar = () => {
  const [arrEvent, setArrEvent] = useState([]);

  const getEvents = (id) => {
      database.ref().child("event").get().then((snapshot) => {
          if (snapshot.exists()) {
              const arrData = snapshot.val();
              var newArrEvent = [];
              for(const key in arrData){
                const date = new Date(arrData[key].date);
                if(date >= new Date())
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

  const linkGoogle = (event) => {
    const date = new Date(event.date);
    date.setDate(date.getDate() + 1);
    let dates = date.getFullYear()+""+("0"+(date.getMonth()+1)).slice(-2)+""+("0"+date.getDate()).slice(-2);
    let startAt = ("0"+(parseInt(event.time.split(":")[0])+3)).slice(-2).concat(event.time.split(":")[1]);
    let endAt = ("0"+(parseInt(event.time.split(":")[0])+4)).slice(-2).concat(event.time.split(":")[1]);

    return `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURI(event.title)}&details=${encodeURI(event.description)}&location=${encodeURI(event.address)}&dates=${dates}T${startAt}00Z/${dates}T${endAt}00Z`;
}

  const Events = ({event}) => {
    const date = new Date(event.date);
    return (
      <Grid item xs={12}>
          <Paper>
              <Grid container direction="row" spacing={2} >
                  <Grid  xs={8} item>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                          {event.title}
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-between">
                          <Grid item className="flexCenter">
                              <Event/>{date.toLocaleDateString("pt-br")}
                          </Grid>
                          <Grid item className="flexCenter">
                              <AccessAlarmIcon/> {event.time}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid xs={4} item className="flexCenter">
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="flex-end" >
                      <a href={linkGoogle(event)} target="_blank" rel="noreferrer">
                        <SaveIcon fontSize="large"/>
                      </a>
                    </Grid>
                  </Grid>
              </Grid>
          </Paper>
      </Grid>);
  }

  return (
    <Grid container direction="column" spacing={3} className="calendar">
      {arrEvent.map((event, id)=><Events key={id} event={event} />)}
    </Grid>);
}

export default (Calendar);
