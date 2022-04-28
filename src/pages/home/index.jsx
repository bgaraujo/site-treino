import React, { useState, useEffect } from 'react';
import {
  Grid,
} from '@material-ui/core';
import CardPost from '../../components/CardPost';
import { database } from '../../Firebase/index';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    get();
  }, []);

  const get = () => {
    database.ref('posts').get().then((snapshot) => {
      if (snapshot.exists()) {
        var data = snapshot.val();
        var arrPosts = [];
        for (const id in data) {
          var post = data[id];
          post.id = id;
          arrPosts.push(post)
        }
        setPosts(arrPosts)
      }
    })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Grid
      container
      spacing={2}
    >
      {
        posts.map((post, key) =>
          <Grid item key={key} xs={12} md={4}>
            <CardPost post={post} />
          </Grid>
        )
      }

    </Grid>
  );
};

export default (Home);
