import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Grid,
    Fab
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { database } from "../../Firebase/index";
import CardPost from "../../components/CardPost";

const ListPosts = () => {
    const history = useHistory();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    const goTo = (href) => {
        history.push(href);
    }


    const getPosts = () => {
        database.ref().child("posts").get().then((snapshot) => {
            if (snapshot.exists()) {
                var arrPosts = snapshot.val();
                var data = [];
                for (var id in arrPosts) {
                    arrPosts[id].id = id;
                    data.push(arrPosts[id])
                }

                setPosts(data);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <>
            <Grid
                container
                justify="center"
                spacing={3}
            >
                {
                    posts.map((post, key) =>
                        <Grid item key={key} xs={12} md={4}>
                            <CardPost post={post} admin={true} />
                        </Grid>)
                }
            </Grid>
            <Fab
                onClick={() => goTo("/add-post")}
                color="primary"
                className="addButton"
                aria-label="add">
                <AddIcon />
            </Fab>
        </>
    );
}
export default ListPosts;