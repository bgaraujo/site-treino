import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EventIcon from '@material-ui/icons/Event';
import moment from "moment";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CardRating({ rating, uuid }) {
  const history = useHistory();
  const classes = useStyles();
  const data = new Date(rating.date);

  const goTo = () => {
    history.push(window.location.pathname+"add-rating/" + uuid + "/" + rating.id);
  }

  return (
    <Card className={classes.root} onClick={goTo}>
      <CardContent>
        <EventIcon />
        <Typography variant="subtitle1">
          Avaliação dia {moment.unix(data).format("DD/MM/YYYY")}
        </Typography>
      </CardContent>
    </Card>
  );
}
