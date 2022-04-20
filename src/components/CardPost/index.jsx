import React from 'react';
import {
  IconButton,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import "./style.scss";
import { useHistory } from "react-router-dom";
import {database, auth} from "../../Firebase";

export default function CardPost({ post, admin }) {
  const history = useHistory();

  const goTo = () => {
    if (admin)
      history.push("/add-post/" + post.id)
    else
      history.push("/post/" + post.id)
  }

  const like = () => {
    database.ref().child("/posts").child(post.id).child("likes").equalTo(auth.currentUser.uid).once().then((data) => {
      console.log(data);
    })

    database.ref().child("/posts").child(post.id).child("likes").push(auth.currentUser.uid);
  }

  return (
    <Card className="CardPost">
      <CardActionArea onClick={() => goTo(post.id)}>
        <CardMedia
          className="media"
          image={post.img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.summary}
          </Typography>
        </CardContent>
      </CardActionArea>
      {
        !admin && <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon onClick={() => like(post.id)} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      }

    </Card>
  );
}
