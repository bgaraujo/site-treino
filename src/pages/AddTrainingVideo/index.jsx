/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
    Grid,
    TextField,
    Paper,
    Button
} from "@material-ui/core";
import { database } from "../../Firebase";
import "./style.scss"

const AddTrainingVideo = ({ state }) => {
    const history = useHistory();

    let { id } = useParams();

    const [videoSrc, setVideoSrc] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (id)
        getTraining(id);
    }, []);

    const getTraining = (id) => {
        database.ref().child("videos").child(id).get().then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                setTitle(data.title);
                setDescription(data.description);
                setVideoSrc(data.video);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const savePost = () => {
        const post = {
            title: title,
            description: description,
            video: videoSrc
        };
        if(id){
            database.ref('videos').child(id).update(post).then(() => history.goBack());
        }else{
            database.ref('videos').push(post).then(() => history.goBack());
        }
    }

    return (
        <>
            <Paper className="AddTrainingVideo">
                <Grid container direction="column" spacing={3}>
                    {
                    videoSrc?
                        <Grid item xs={12} className="ytPlayerContent" dangerouslySetInnerHTML={{ __html: `<iframe type="text/html"
                                origin="http://localhost:3000/"
                                src="http://www.youtube.com/embed/${videoSrc.split('v=')[1]}?color=white"
                                frameBorder="0"/>`}}>
                        </Grid>
                        :""
                    }
                    <Grid item xs={12}>
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="standard-basic"
                            label="Nome"
                            fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id="standard-basic"
                            label="Descrição"
                            fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={videoSrc}
                            onChange={(e) => setVideoSrc(e.target.value)}
                            id="standard-basic"
                            label="Link video"
                            fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={savePost}
                        >
                            Salvar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}
export default connect(state => ({ state: state }))(AddTrainingVideo);