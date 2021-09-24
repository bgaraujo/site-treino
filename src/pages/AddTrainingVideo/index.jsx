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
import { storage, database } from "../../Firebase";
import ProgressScreen from "../../components/ProgressScreen";

const AddTrainingVideo = ({ state }) => {
    const history = useHistory();

    let { id } = useParams();
    
    const [file, setFile] = useState();
    const [saving, setSaving] = useState(false);
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState();
    const [videoSrc, setVideoSrc] = useState('');

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (id)
        getTraining(id);
    }, []);

    const fileChange = (e) => {
        setFile(e.target.files[0]);
        setVideoSrc("");
    }

    const getTraining = (id) => {
        database.ref().child("videos").child(id).get().then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                setTitle(data.title);
                setDescription(data.description);
                setFileName(data.video);
                storage.ref(data.video).getDownloadURL().then(function(videoName) {
                    let url = new URL(videoName);
                    setVideoSrc(url.href);
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const saveData = post => {
        if(id)
            database.ref('videos').child(id).update(post);
        else
            database.ref('videos').push(post);
    }

    const savePost = () => {
        setSaving(true);
        const timestamp = new Date().getTime();
        const videoName = `videos/${timestamp}.mp4`;
        
        if(file){ 
            if(fileName) storage.ref(fileName).delete();
    
            var uploadTask =  storage.ref().child(videoName).put(file);
            uploadTask.on('state_changed', function(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            }, function(error) {
                setSaving(false);
                console.log(error);
            }, function() {
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    setSaving(false);
                    saveData({
                        video: videoName,
                        title: title,
                        description: description,
                        timestamp: timestamp
                    });
                    history.goBack();
                });
            });
        }else{
            saveData({
                title: title,
                description: description,
                timestamp: timestamp
            });
            history.goBack();
        }
    }

    return (
        <>
            {
                saving ?
                    <ProgressScreen progress={progress}/> :
                    <form noValidate autoComplete="off">
                        <Paper>
                            <Grid container direction="column" >
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        fullWidth>
                                            {file?(fileName?fileName:"Video selecionado"):"Selecionar video"}
                                        <input
                                            type="file"
                                            hidden
                                            accept="video/mp4,video/x-m4v,video/*"
                                            onChange={fileChange}
                                        />
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                { videoSrc != "" &&
                                    <video controls name="media">
                                        <source src={videoSrc} type="video/mp4" />
                                    </video>
                                }
                                </Grid>
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
                    </form>
            }
        </>
    );
}
export default connect(state => ({ state: state }))(AddTrainingVideo);