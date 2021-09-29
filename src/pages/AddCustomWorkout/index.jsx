import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Paper, 
  Table, 
  TableHead, 
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog, 
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import "./style.scss";
import { database } from "../../Firebase";
import Training from '../Training';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

const AddCustomWorkout = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);

  const [showDialog, setShowDialog] = useState(false);
  const [trainingList, setTrainingList] = useState([]);

  const addsElementToTraining = (id) => {
    setShowDialog(false);

    if(selectedWorkouts.find(element => element.id === id))return;

    selectedWorkouts.push({
      id:id,
      repetitions:0,
      break:"",
      note:""
    });
    setSelectedWorkouts(selectedWorkouts);
  }

  const getPosts = () => {
    database.ref().child("videos").get().then((snapshot) => {
        if (snapshot.exists()) {
            var arrPosts = snapshot.val();
            var data = [];
            for (var id in arrPosts) {
                arrPosts[id].id = id;
                data.push(arrPosts[id])
            }
            setTrainingList(data);
        }
    }).catch((error) => {
        console.error(error);
    });
  }

  useEffect(() => {
    getPosts();
  },[]);

  return (
    <>
      <Paper elevation={3} className="AddCustomWorkout">
        <h3>Criando treino</h3>

        <TextField 
          fullWidth 
          label="Nome do treino" 
          value={name}
          onChange={e => setName(e.target.value)}
          className="margin-botton"/>

        <TextField 
          fullWidth 
          label="Descrição" 
          value={description}
          onChange={ e => setDescription(e.target.value)}
          className="margin-botton"/>

        <div className="table-place margin-botton">
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Movimento</TableCell>
                <TableCell>Repetiçoes</TableCell>
                <TableCell>Pausas</TableCell>
                <TableCell>Obs.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                selectedWorkouts.map(workout => {
                  const found = trainingList.find(element => element.id === workout.id);
                  return<TableRow key={workout.id}>
                    <TableCell>
                      {found.title}
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" value={workout.repetitions}/>
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" value={workout.break}/>
                    </TableCell>
                    <TableCell>
                      <TextField variant="outlined" value={workout.note}/>
                    </TableCell>
                  </TableRow>
                })
              }
              
            </TableBody>
            <caption><Button variant="outlined" onClick={() => setShowDialog(true)}>Add +</Button></caption>
          </Table>
        </div>
      </Paper>
      <Dialog
        open={showDialog}
        fullWidth
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Selecione o video</DialogTitle>
        <DialogContent>
          <List>
          {
            trainingList.map(training => 
              <ListItem key={training.id} onClick={() => addsElementToTraining(training.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <PlayCircleFilledIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={training.title} secondary={training.description} />
              </ListItem>
            )
          }
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddCustomWorkout;