/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
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
import { useHistory, useParams } from "react-router-dom";
import { database, storage } from "../../Firebase";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';

const AddCustomWorkout = () => {
  const history = useHistory();

  let { uuid, workoutid } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();

  const [showDialog, setShowDialog] = useState(false);
  const [trainingList, setTrainingList] = useState([]);



  const uploadImg = (callback) => {
    var uploadTask =  storage.ref().child(image).put(file);
    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
    }, function(error) {
        console.log(error);
    }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          callback && callback(downloadURL);
        });
    });
  }

  const saveData = downloadURL => {
    const workout = {
      name:name,
      description:description,
      selectedWorkouts:selectedWorkouts,
      image:image,
      imageURL:downloadURL != null ? downloadURL : imageURL
    };

    if(workoutid !== undefined)
        database.ref(`users`).child(`${uuid}/workout`).child(workoutid).update(workout).then(() => history.goBack());
    else
        database.ref(`users`).child(`${uuid}/workout`).push(workout).then(() => history.goBack());
  }

  const handleSubmit = () => {
    if(file) uploadImg(
      (downloadURL) => {
        saveData(downloadURL);
      }
    );
    else
      saveData();
  }

  const fileChange = e => {
    if(e.target.files.length === 0)return;
    const timestamp =  new Date().getTime();

    setFile(e.target.files[0]);
    setImageURL(URL.createObjectURL(e.target.files[0]));
    setImage(`workout/${timestamp+"."+e.target.files[0].name.split('.').pop()}`)
  }

  const updateSelectedWorkouts = (id, name, value) => {
    const index = selectedWorkouts.findIndex((workout => workout.id === id));
    selectedWorkouts[index][name] = value;
    setSelectedWorkouts([...selectedWorkouts]);
  }

  const addsElementToTraining = (id) => {
    setShowDialog(false);

    if(selectedWorkouts.find(element => element.id === id))return;

    selectedWorkouts.push({
      id:id,
      repetitions:"",
      break:"",
      note:"",
      done:false
    });
    setSelectedWorkouts([...selectedWorkouts]);
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

  const getWorkouts = () => {
    database.ref().child(`users/${uuid}/workout`).child(workoutid).get().then((data) => {
      if(data.exists()){
          const workout = data.val();
          setName(workout.name);
          setDescription(workout.description);
          setImage(workout.image);
          setImageURL(workout.imageURL);
          setSelectedWorkouts(workout.selectedWorkouts);
      }
  })
  }

  useEffect(() => {
    getPosts();
    if(workoutid) getWorkouts();
  },[ ]);

  return (
    <>
      <Paper elevation={3} className="AddCustomWorkout">
        <h3>Criando treino</h3>
        {
          imageURL && <img src={imageURL} alt="teste" />
        }
        <Button
            variant="contained"
            component="label"
            size="small"
            className="margin-botton"
            startIcon={<CloudUploadIcon />}
            fullWidth>
            Capa
            <input
                type="file"
                hidden
                accept="image/png, image/gif, image/jpeg"
                onChange={fileChange}
            />
        </Button>

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
                      <TextField 
                        variant="outlined"
                        value={workout.repetitions}
                        onChange={e => updateSelectedWorkouts(workout.id,"repetitions",e.target.value)}
                        />
                    </TableCell>
                    <TableCell>
                      <TextField 
                        variant="outlined" 
                        value={workout.break}
                        onChange={e => updateSelectedWorkouts(workout.id,"break",e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField 
                        variant="outlined" 
                        value={workout.note}
                        onChange={e => updateSelectedWorkouts(workout.id,"note",e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                })
              }
              
            </TableBody>
          </Table>
          <Button variant="outlined" onClick={() => setShowDialog(true)}>Add +</Button>
        </div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSubmit}
          startIcon={<SaveIcon />}
        >
          Salvar treino
        </Button>
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