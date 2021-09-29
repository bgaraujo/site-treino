import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TrainingCard from '../../components/TrainingCard';

const CustomWorkoutList = () => {
    const history = useHistory();
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TrainingCard href="teste" />
                </Grid>
                
            </Grid>
            <Fab 
                onClick={() => history.push("add-custom-workout/:uuid")}
                color="primary" 
                className="addButton" 
                aria-label="add">
                <AddIcon />
            </Fab>
        </>
    );
}

export default CustomWorkoutList;