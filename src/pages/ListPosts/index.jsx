import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getPosts } from '../../Store/actions';
import {
    Grid,
    Fab
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { database } from "../../Firebase/index";
import CardPost from "../../components/CardPost";

const ListPosts = ({ dispatch, state }) => {
    const history = useHistory();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        dispatch(getPosts());
    }, []);

    useEffect(() => {
        console.log("state",state)
    }, [state]);


    const getPosts = () => {
        var arrPosts = [];
        database.ref('posts').orderByChild("active").equalTo(true).on("child_added", (snapshot) => {
          var post = snapshot.val();
          post.id = snapshot.key;
          arrPosts.push(post)
        });
        setPosts(arrPosts)
    }

    return (
        <>
            <Grid
                container
                justifyContent="center"
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
                onClick={() => history.push("/posts/add-post")}
                color="primary"
                className="addButton"
                aria-label="add">
                <AddIcon />
            </Fab>
        </>
    );
}

export default  connect( state => ({state:state}) ) (ListPosts);