import React, { useEffect, useState } from "react";
import {
    Fab,
    Grid,
    Paper,
    Typography
} from "@material-ui/core";
import { useHistory } from "react-router-dom"
import AddIcon from "@material-ui/icons/Add";
import { database } from "../../Firebase/index";

const ListTraingVideos = () => {
    const history = useHistory();
    const [listTraining, setListTraining ] = useState([]);
    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        database.ref().child("trainig").get().then((snapshot) => {
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

    return(
        <>
            <Grid container spacing={3}>
            {
                listTraining.map( trainig =>                 <Grid item xs={12}>
                    <Paper onClick={() => history.push(`/add-video/${trainig.id}`)} key={trainig.id} elevation={3}>
                        <Typography variant="body1">{`${trainig.title}: ${trainig.description}`}</Typography>
                    </Paper>
                </Grid>)
            }
            </Grid>
            <Fab
                onClick={() => history.push("/add-video")}
                color="primary"
                className="addButton"
                aria-label="add">
                <AddIcon />
            </Fab>
        </>
    )
}

export default ListTraingVideos;