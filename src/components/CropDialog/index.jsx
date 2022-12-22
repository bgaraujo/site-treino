import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Slider
} from "@material-ui/core";
import Cropper from 'react-easy-crop'
import "./style.scss";
import { getCroppedImg } from './cropImage';


const CropDialog = ({ show, getBlob, inputImg, closeDialog }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const onCropComplete = async (_, croppedAreaPixels) => {
        const croppedImage = await getCroppedImg(
            inputImg,
            croppedAreaPixels
        )
        getBlob(croppedImage)
    }

    return (
        <Dialog
            open={show}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullScreen="true"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>

            <DialogContent>
                <div className="App">
                    <div className="crop-container">
                        <Cropper
                            image={inputImg}
                            crop={crop}
                            zoom={zoom}
                            aspect={4 / 2}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div className="controls">
                        <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e, zoom) => setZoom(zoom)}
                            classes={{ root: 'slider' }}
                        />
                    </div>
                </div>
            </DialogContent>

            <DialogActions>
                <Button color="primary">
                    cancelar
                </Button>
                <Button onClick={() => closeDialog()} color="primary">
                    Cortar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CropDialog;