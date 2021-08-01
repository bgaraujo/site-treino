import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { 
    Grid,
    Paper,
    Typography,
    Slider,
    ButtonGroup,
    Button
 } from "@material-ui/core";
import "./style.scss";
import src from "../../assets/movies/treino.mp4";
import { isMobile } from "../../helpers/mobileHelper";

const Training = () => {
    let { level } = useParams();
    const [progress, setProgress] = useState(0);

    useEffect( () => {
        let movie = document.getElementById("player");
        updateOrientation();
        window.addEventListener("orientationchange",updateOrientation);
        movie.addEventListener("progress", videoProgress); 
    }, [])

    const videoProgress = () => {
        let movie = document.getElementById("player");
        setProgress((movie.currentTime*100)/movie.duration );
    }

    const updateOrientation = () => {
        console.log( window.orientation )
        if( isMobile() && window.orientation === 90 )
            document.body.requestFullscreen().catch( error => console.log(error) );
        else
            document.exitFullscreen().catch( error => console.log(error));
    }


    const videoControll = () => {
        let movie = document.getElementById("player");
        if(movie.paused)
            movie.play();
        else
            movie.pause();
    }

    const handleChange = (event, newValue) => {
        let movie = document.getElementById("player");
        setProgress(newValue);
        movie.currentTime = (movie.duration/100)*newValue;
    };

    const marks = [
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
      ];

    console.log(level);
    return(
        <>
            <Grid
                container
                justify="center"
                spacing={3}
            >
                <Grid item xs={12}>
                    <Paper>
                        <Grid
                            container
                            justify="center"
                            spacing={3}
                        >
                            <Grid item xs={12}>
                                <Typography variant="h4">
                                    Aula inicial
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={ (isMobile()&&"mobile")+" video-container"} id="video-container">
                                    <video id="player" autoPlay onClick={videoControll}>
                                        <source src={src} type="video/mp4"/>
                                    </video>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <Slider
                                    value={progress}
                                    onChange={handleChange}
                                    aria-labelledby="discrete-slider-restrict"
                                    step={null}
                                    marks={marks}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonGroup
                                    orientation="vertical"
                                    color="primary"
                                    aria-label="vertical outlined primary button group"
                                >
                                    <Button>One</Button>
                                    <Button>Two</Button>
                                    <Button>Three</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Training;