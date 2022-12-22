/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getPosts } from '../../Store/actions';
import {
    Grid,
    Fab
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CardPost from "../../components/CardPost";

const ListPosts = ({ dispatch, state }) => {
    const history = useHistory();

    useEffect(() => {
        dispatch(getPosts());
    }, []);

    return (
        <>
            <Grid
                container
                justifyContent="center"
                spacing={3}
            >
                {
                    state.posts&&
                    state.posts.map((post, key) =>
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