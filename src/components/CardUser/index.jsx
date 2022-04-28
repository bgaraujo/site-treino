import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import profilePic from "../../images/profile.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 90,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function CardUser( {user} ) {
  const classes = useStyles();
  const history = useHistory();

  const nascimento = new Date(user.birthdate);
  const date = new Date();

  return (
    <Card className={classes.root} onClick={() => history.push("manage-customer/"+user.uuid)}>
      <CardMedia
        className={classes.cover}
        image={profilePic}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {user.name?user.name:""}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {date.getFullYear() - nascimento.getFullYear()} anos
          </Typography>
        </CardContent>
      </div>
      
    </Card>
  );
}