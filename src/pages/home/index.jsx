/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { getPosts } from '../../Store/actions';
import {
  Grid,
} from '@material-ui/core';
import CardPost from '../../components/CardPost';

const Home = ({dispatch, state}) => {
  
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <Grid
      container
      spacing={2}
    >
      {
        state.posts&&
        state.posts.map((post, key) =>
          <Grid item key={key} xs={12} md={4}>
            <CardPost post={post} />
          </Grid>
        )
      }

    </Grid>
  );
};

export default  connect( state => ({state:state}) ) (Home);