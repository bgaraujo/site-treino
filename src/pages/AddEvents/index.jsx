import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography
} from '@material-ui/core';
import moment from 'moment';
import { database } from "../../Firebase";

const AddEvents = () => {
  const history = useHistory();
  let { id } = useParams();

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [time, setTime] = useState("23:30");

  useEffect(() => {
    if (id)
    getEvent(id);
  }, [id]);

  const getEvent = (id) => {
      database.ref().child("event").child(id).get().then((snapshot) => {
          if (snapshot.exists()) {
              var data = snapshot.val();
              setTitle(data.title);
              setDescription(data.description);
              setAddress(data.address);
              setDate(data.date);
              setTime(data.time);
          }
      }).catch((error) => {
          console.error(error);
      });
  }

  const saveEvent = () => {
    const event = {
        title: title,
        description: description,
        address: address,
        date: date,
        time: time
    };
    if(id){
        database.ref('event').child(id).update(event).then(() => history.goBack());
    }else{
        database.ref('event').push(event).then(() => history.goBack());
    }
}

  return (
    <>
      <Typography variant="h4">Adicionar evento</Typography>
      <Paper>
          <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                  <TextField
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      label="titulo"
                      fullWidth />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                      value={description}
                      multiline
                      rows={4}
                      onChange={(e) => setDescription(e.target.value)}
                      label="Descrição"
                      fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      label="Endereço"
                      fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      label="Data"
                      type="date"
                      fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      label="Hora do evento"
                      type="time"
                      fullWidth />
              </Grid>
              <Grid item xs={12}>
                  <Button
                      variant="contained"
                      component="label"
                      fullWidth
                      onClick={saveEvent}>
                          Salvar
                  </Button>
              </Grid>
          </Grid>
      </Paper>
    </>
  );
};

export default (AddEvents);
