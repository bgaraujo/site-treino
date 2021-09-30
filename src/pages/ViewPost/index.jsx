/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../../Firebase/index"
import {
    Grid,
    Typography,
    Paper
} from "@material-ui/core";
import "./style.scss";

const ViewPost = () => {
    let { id } = useParams();
    const [post, setPost] = useState();
    const [top, setTop] = useState();

    useEffect(() => {
        getPost();
        window.addEventListener('scroll', onScroll);
    }, []);

    const getPost = () => {
        database.ref().child("posts").child(id).get().then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                setPost(data)
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const onScroll = () => {
        if (window.scrollY) {
            setTop(window.scrollY)
        }
    }

    return (
        <>
            {
                post ?
                    <div className="ViewPost">
                        <img className="bgPost" src={post.img} style={{ top: `-${(top / 10)}px` }} />
                        <Paper>
                            <Grid container >
                                <Grid item>
                                    <Typography variant="h2">
                                        {post.title}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        {post.text}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div> :
                    ""
            }
        </>
    );


}

export default ViewPost;