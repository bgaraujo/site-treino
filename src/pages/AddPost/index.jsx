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
import CropDialog from "../../components/CropDialog";
import { storage, database } from "../../Firebase";
import ProgressScreen from "../../components/ProgressScreen";
import {getPosts} from "../../Store/actions";

const AddPost = ({ dispatch ,state }) => {
    let { id } = useParams();
    const history = useHistory()
    const [image, setImage] = useState();
    const [newImage, setNewImage] = useState();
    const [saving, setSaving] = useState(false);
    const [openCropDialog, setOpenCropDialog] = useState(false);

    const [blob, setBlob] = useState(null);
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [text, setText] = useState("");

    useEffect(() => {
        if (id)
            getPost(id);
    }, []);

    const fileChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            setImage(reader.result);
            setOpenCropDialog(true)
        }, false)

        if (file) {
            reader.readAsDataURL(file)
        }
    }

    const getPost = (id) => {
        database.ref().child("posts").child(id).get().then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                setNewImage(data.img);
                setTitle(data.title);
                setSummary(data.summary);
                setText(data.text);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const upload = (callBack) => {
        const name = new Date().getTime();
        const uploadTask = storage.ref(`posts/${name}.jpg`).put(blob);
        uploadTask.on('state_changed', function (error) {
            console.error(error)
        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
                callBack(downloadURL);
            });
        });
    }
    const getBlob = (blob) => {
        setBlob(blob)
    }

    const closeDialog = () => {
        setOpenCropDialog(false);
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            var base64data = reader.result;
            setNewImage(base64data);
        }
    }

    const savePost = () => {
        setSaving(true);
        const timestamp = new Date().getTime();

        if (!id) {
            upload((url) => {
                database.ref('posts').push({
                    img: url,
                    title: title,
                    summary: summary,
                    text: text,
                    timestamp: timestamp,
                    active:true
                });
                history.goBack();
            });
        } else {
            if (blob) {
                storage.refFromURL(newImage).delete().then(() => {
                    upload((url) => {
                        database.ref('posts/' + id).set({
                            img: url,
                            title: title,
                            summary: summary,
                            text: text,
                            timestamp: timestamp,
                            active:true
                        });
                    });
                })
            } else {
                database.ref('posts/' + id).set({
                    img: newImage,
                    title: title,
                    summary: summary,
                    text: text,
                    timestamp: timestamp,
                    active:true
                });

                history.goBack();
            }
        }
    }

    const removePost = () => {
        if(window.confirm("Deseja realmente apagar a publicação?")){
            database.ref('posts/' + id).set({
                img: newImage,
                title: title,
                summary: summary,
                text: text,
                active: false
            }).then(() => dispatch(getPosts()));
            history.goBack();
        }
    }

    return (
        <>
            {
                saving ?
                    <ProgressScreen /> :
                    <form noValidate autoComplete="off">
                        <Paper>
                            <Grid container spacing={2} direction="column" >
                                <Grid item xs={12} className="img-container">
                                    {
                                        newImage ?
                                            <img src={newImage} alt="imageCover" /> :
                                            ""
                                    }
                                    <CropDialog
                                        show={openCropDialog}
                                        getBlob={getBlob}
                                        inputImg={image}
                                        closeDialog={closeDialog} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        fullWidth>
                                        Selecionar imagem
                                <input
                                            type="file"
                                            hidden
                                            onChange={fileChange}
                                        />
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        id="standard-basic"
                                        label="titulo"
                                        fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                        id="standard-basic"
                                        label="apresentação"
                                        fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        id="standard-basic"
                                        multiline={true}
                                        rows="10"
                                        label="texto"
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
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        onClick={removePost}
                                    >
                                        Remover
                            </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </form>
            }
        </>
    );
}
export default connect(state => ({ state: state }))(AddPost);