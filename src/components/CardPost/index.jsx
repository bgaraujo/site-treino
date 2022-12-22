import React from 'react';
import {connect} from "react-redux";
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
import { getPosts } from "../../Store/actions";

const CardPost = ({ dispatch, post, admin }) => {
  const history = useHistory();

  const goTo = () => {
    if (admin)
      history.push("/posts/add-post/" + post.id)
    else
      history.push("/posts/post/" + post.id)
  }

  const like = (id) => {
    if(!post.likes){
      database.ref(`posts`).child(`${id}/likes`).push(auth.currentUser.uid).then(()=>{ dispatch(getPosts()) });
    }else{
      if(Object.values(post.likes).indexOf(auth.currentUser.uid) < 0)
        database.ref(`posts`).child(`${id}/likes`).push(auth.currentUser.uid).then(()=>{ dispatch(getPosts()) });
      else
        database.ref(`posts`).child(`${id}/likes/${Object.keys(post.likes).find(key => post.likes[key] === auth.currentUser.uid)}`).remove().then(()=>{ dispatch(getPosts()) });
    }
  }

  return (
    <Card className={`CardPost ${post.active}`}>
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
          <IconButton aria-label="add to favorites active" className={post.likes && Object.values(post.likes).indexOf(auth.currentUser.uid)>=0?"enabled":"disabled"} onClick={() => like(post.id)}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      }

    </Card>
  );
}

export default connect( state => ({state:state}) ) (CardPost)