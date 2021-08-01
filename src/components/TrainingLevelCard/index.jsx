import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function MediaCard({ level }) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Card className={classes.root} onClick={() => history.push("/training/" + level.level)}>
            <CardActionArea >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {level.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {level.text}
                    </Typography>
                </CardContent>
                <CardActions>
                    Iniciado - 90%
                </CardActions>
            </CardActionArea>
        </Card>
    );
}
