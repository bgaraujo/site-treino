import React, { useEffect, useState } from "react";
import {
    Fab,
    Grid
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { database } from "../../Firebase/index";
import TrainingLevelCard from "../../components/TrainingLevelCard";

const ListTraingLevel = () => {
    const [listTraining, setListTraining ] = useState();
    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        database.ref().child("workouts").get().then((snapshot) => {
            if (snapshot.exists()) {
                var arrPosts = snapshot.val();
                var data = [];
                for (var id in arrPosts) {
                    arrPosts[id].id = id;
                    data.push(arrPosts[id])
                }
    
                setListTraining("data",data);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return(
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {/* <TrainingLevelCard/> */}
                </Grid>
            </Grid>
            <Fab
                //onClick={() => goTo("/add-post")}
                color="primary"
                className="addButton"
                aria-label="add">
                <AddIcon />
            </Fab>
        </>
    )
}

export default ListTraingLevel;