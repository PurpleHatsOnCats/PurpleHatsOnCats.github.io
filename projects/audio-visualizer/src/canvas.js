/*
    The purpose of this file is to take in the analyser node and a <canvas> element: 
      - the module will create a drawing context that points at the <canvas> 
      - it will store the reference to the analyser node
      - in draw(), it will loop through the data in the analyser node
      - and then draw something representative on the canvas
      - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';
import { Sprite } from './sprite.js';
import { AudioFrame } from './audioFrame.js'

let ctx, canvasWidth, canvasHeight, gradient, analyserNode, audioData;

let my_gradient;
const sprites = [];
const lineStorage = [];

const setupCanvas = (canvasElement, analyserNodeRef) => {
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    // create a gradient that runs top to bottom
    gradient = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [{ percent: 0, color: "blue" }, { percent: .25, color: "green" }, { percent: .5, color: "yellow" }, { percent: .75, color: "red" }, { percent: 1, color: "magenta" }]);
    // keep a reference to the analyser node
    analyserNode = analyserNodeRef;
    // this is the array where the analyser data will be stored
    audioData = new Uint8Array(analyserNode.fftSize / 2);

    my_gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    my_gradient.addColorStop(0, 'rgba(44, 37, 80, 1)');
    my_gradient.addColorStop(0.5, 'rgba(107, 160, 196, 1)');
    my_gradient.addColorStop(1, 'rgba(204, 169, 13, 1)');
}

const addSprite = (sprite) => {
    sprites.push(sprite);
}

const draw = (params = {}) => {
    // 1 - populate the audioData array with the frequency data from the analyserNode
    // notice these arrays are passed "by reference" 
    if (params.analyzeType == "frequency") {
        analyserNode.getByteFrequencyData(audioData);
    }
    else if (params.analyzeType == "time") {
        analyserNode.getByteTimeDomainData(audioData);
    }
    else {
        throw new TypeError("Not a valid analysis type");
    }

    // waveform data

    // 2 - draw background
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    // 3 - draw gradient
    if (params.showGradient) {
        ctx.save();
        ctx.fillStyle = my_gradient;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.restore();
    }
    // 4 - draw bars
    if (params.showBars && lineStorage.length < 200) {
        let speed = 8;
        lineStorage.push(new AudioFrame(audioData, speed));
        for (let i = 0; i < lineStorage.length; i++) {
            lineStorage[i].move();
            lineStorage[i].draw(ctx, canvasHeight);
            if (lineStorage[i].x > canvasWidth + speed) {
                lineStorage.splice(0, 1);
                //i--;
            }
        }
    }

    // 5 - draw circles
    if (params.showCircles) {
        let maxRadius = canvasHeight / 4;
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = "rgba(255, 255, 255, 1)";

        for (let i = 0; i < audioData.length; i++) {
            let percent = i / audioData.length;
            let angle = percent * Math.PI * 2;

            if (i == 0) {
                ctx.moveTo(
                    canvasWidth / 2 + (Math.cos(angle) * audioData[i]),
                    canvasHeight / 2 + (Math.sin(angle) * audioData[i]));
            }
            else {
                ctx.lineTo(
                    canvasWidth / 2 + (Math.cos(angle) * audioData[i]),
                    canvasHeight / 2 + (Math.sin(angle) * audioData[i]));
            }
            ctx.closePath();
            ctx.fillStyle = AudioFrame.audioToColor(audioData[i]);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(
                canvasWidth / 2 + (Math.cos(angle) * audioData[i]),
                canvasHeight / 2 + (Math.sin(angle) * audioData[i]));
            ctx.lineTo(
                canvasWidth / 2,
                canvasHeight / 2);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    // Draw Sprites
    if (params.showImages) {
        for (let i = 0; i < sprites.length; i++) {
            sprites[i].update(audioData);
            sprites[i].draw(ctx);
        }
    }


    // 6 - bitmap manipulation
    // TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
    // regardless of whether or not we are applying a pixel effect
    // At some point, refactor this code so that we are looping though the image data only if
    // it is necessary

    // A) grab all of the pixels on the canvas and put them in the `data` array
    // `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
    // the variable `data` below is a reference to that array 
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width;
    let height = imageData.height;

    // B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for (let i = 0; i < length; i += 4) {
        // C) randomly change every 20th pixel to red
        if (params.showNoise && Math.random() < 0.05) {
            // data[i] is the red channel
            // data[i+1] is the green channel
            // data[i+2] is the blue channel
            // data[i+3] is the alpha channel
            data[i] = data[i + 1] = data[i + 2] = 255;// zero out the red and green and blue channels
            data[i] = 255;// make the red channel 100% red
        } // end if
        if (params.showInvert) {
            let red = data[i], green = data[i + 1], blue = data[i + 2];
            data[i] = 255 - red;
            data[i + 1] = 255 - green;
            data[i + 2] = 255 - blue
        }
    } // end for

    if (params.showEmboss) {
        for (let i = 0; i < length; i++) {
            if (i % 4 == 3) continue;
            data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
        }
    }

    // Calculate blur
    if (params.showBlur) {
        let standardDev = 2, radius = 2;
        let weightMatrix = utils.createBlurWeightMatrix(standardDev,radius);
        let newData = Array.from(data);
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) { // loop through every point in image
                let newColors = [0, 0, 0];
                for (let i = 0; i < radius * 2 + 1; i++) {
                    for (let j = 0; j < radius * 2 + 1; j++) { // loop through blur radius
                        for (let k = 0; k < 3; k++) { // loop through color channels
                            // Add color from radius multiplied by weight matrix
                            newColors[k] += utils.get2DIndex(data, x+i-radius, y+j-radius, width, height, 4, k) * weightMatrix[i][j];
                        }
                    }
                }
                for (let k = 0; k < 3; k++) {
                    // Assign new blurred colors to new array
                    utils.set2DIndex(newColors[k],newData,x,y,width,height,4,k);
                }
            }
        }
        data = newData;
    }

    // D) copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);
}

export { setupCanvas, draw, addSprite };