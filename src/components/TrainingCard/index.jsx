import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, Grid, CardMedia } from '@material-ui/core';
import moment from "moment";
import "./style.scss";
import srcImgTreino from "../../assets/pictures/img-treino.jpg";


export default function TrainingCard({href}) {
  const history = useHistory();


  return (
    <Card className="TrainingCard" onClick={() => history.push(href)}>
      <CardMedia
        // className={classes.cover}
        image={srcImgTreino}
        title="Live from space album cover"
      />
      <CardContent>
        <Grid container>
          <h4>Cardio</h4>
          <p>Quemar os bacon</p>
          <span>50% concluido</span>
        </Grid>
      </CardContent>
    </Card>
  );
}
