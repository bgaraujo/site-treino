import React, { useEffect, useState } from "react";
import {
    Fab,
    Grid,
    Paper,
    Typography,
    IconButton
} from "@material-ui/core";
import { useHistory } from "react-router-dom"
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { storage, database } from "../../Firebase";
import "./style.scss";

const ListTraingVideos = () => {
    const history = useHistory();
    const [listTraining, setListTraining ] = useState([]);
    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        database.ref().child("videos").get().then((snapshot) => {
            if (snapshot.exists()) {
                var arrPosts = snapshot.val();
                var data = [];
                for (var id in arrPosts) {
                    arrPosts[id].id = id;
                    data.push(arrPosts[id])
                }
    
                setListTraining(data);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const removePost = id => {
        if(!window.confirm("Tem certeza?")) return;
        database.ref().child("videos").child(id).get().then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                storage.ref(data.video).delete();
            }
        }).catch((error) => {
            console.error(error);
        });
        database.ref().child("videos").child(id).remove().then(getPosts());
    }

    return(
        <>
            <Grid container spacing={3} className="list-traing-videos">
            {
                listTraining.map( trainig => <Grid key={trainig.id} item xs={12}>
                    <Paper elevation={3}>
                        <Grid container alignItems="center">
                            <Grid item xs={10}>
                                <Typography variant="body1">{`${trainig.title}: ${trainig.description}`}</Typography>
                            </Grid>
                            <Grid item xs={2} className="action-buttons">
                                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => history.push(window.location.pathname+`/add-video/${trainig.id}`)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => removePost(trainig.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>)
            }
            </Grid>
            <Fab
                onClick={() => history.push(window.location.pathname+"/add-video")}
                color="primary"
                className="addButton"
                aria-label="add">
                <AddIcon />
            </Fab>
        </>
    )
}

export default ListTraingVideos;