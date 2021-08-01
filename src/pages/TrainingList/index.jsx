import React from "react";
import {
    Grid
} from "@material-ui/core";
import TrainingLevelCard from "../../components/TrainingLevelCard";

const TrainingList = () => {

    const level = [
        {
            "title": "Nível 1",
            "text": "Neste level vamos começar a sentir os treinos e como estamos fisicamente e nosso compromisso com o treino",
            "level": 1,
            "movie":"level1.mp4",
            "times":[
                {
                  value: 0,
                  label: 'Aquecimento',
                },
                {
                  value: 20,
                  label: 'Inicio do treino',
                },
                {
                  value: 37,
                  label: 'Pega fogo',
                },
                {
                  value: 90,
                  label: 'hora de dar tchau',
                },
            ]
        },
        {
            "title": "Nível 2",
            "text": "Aqui vamos pegar um pouco mais pesado, criar resistencia e melhorar a força",
            "level": 2
        },
    ];
    return (
        <Grid
            container
            spacing={2}
        >
            {
                level.map((level, key) => <Grid item key={key} xs={12} md={4}>
                    <TrainingLevelCard level={level} />
                </Grid>)
            }

        </Grid>
    );
}

export default TrainingList;