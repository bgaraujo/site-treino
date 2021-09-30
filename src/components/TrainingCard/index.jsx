import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, Grid, CardMedia } from '@material-ui/core';
import "./style.scss";

export default function TrainingCard({href, img, name, description}) {
  const history = useHistory();


  return (
    <Card className="TrainingCard" onClick={() => history.push(href)}>
      <CardMedia
        image={img}
        title="Live from space album cover"
      />
      <CardContent>
        <Grid container>
          <h4>{name}</h4>
          <p>{description}</p>
          <span>50% concluido</span>
        </Grid>
      </CardContent>
    </Card>
  );
}
