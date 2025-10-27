/*
    main.js is primarily responsible for hooking up the UI to the rest of the application 
    and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';
import { Sprite } from './sprite.js';

const drawParams = {
    showGradient: true,
    showBars: true,
    showCircles: true,
    showNoise: false,
    showInvert: false,
    showEmboss: false,
    analyzeType: "frequency"
};

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
    sound1: "media/New Adventure Theme.mp3"
});

const init = () => {

    audio.setupWebaudio(DEFAULTS.sound1);

    console.log("init called");
    console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    setupUI(canvasElement);
    canvas.setupCanvas(canvasElement, audio.analyserNode);
    loop();
}

const setupUI = (canvasElement) => {
    // A - hookup fullscreen button
    const fsButton = document.querySelector("#btn-fs");

    // add .onclick event to button
    fsButton.onclick = e => {
        console.log("goFullscreen() called");
        utils.goFullscreen(canvasElement);
    };

    // B setup play/pause button
    let playButton = document.querySelector("#btn-play");
    playButton.onclick = e => {
        //console.log(`audioCtx.state before = ${audio.audioCtx.setupUI}`);

        // check if context is in suspended state (autoplay policy)
        if (audio.audioCtx.state == "suspended") {
            audio.audioCtx.resume();
        }
        //console.log(`audioCtx.state after = ${audio.audioCtx.setupUI}`)
        if (e.target.dataset.playing == "no") {
            audio.playCurrentSound();
            e.target.dataset.playing = "yes";
        } else {
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no";
        }
    }

    // C - hookup volume stuff
    let volumeSlider = document.querySelector("#slider-volume");
    let volumeLabel = document.querySelector("#label-volume");

    volumeSlider.oninput = e => {
        // set gain
        audio.setVolume(e.target.value / 4);
        // Update label to match value
        volumeLabel.innerHTML = Math.round(e.target.value / 2 * 100);
    };
    volumeSlider.dispatchEvent(new Event("input"));

    // C.1 - bass slider
    let bassSlider = document.querySelector("#slider-bass");
    let bassLabel = document.querySelector("#label-bass");

    bassSlider.oninput = e => {
        // set gain
        audio.setBassGain((e.target.value - 1) * 15);
        // Update label to match value
        bassLabel.innerHTML = Math.round(e.target.value / 2 * 100);
    };
    bassSlider.dispatchEvent(new Event("input"));

    // C.2 treble slider
    let trebleSlider = document.querySelector("#slider-treble");
    let trebleLabel = document.querySelector("#label-treble");

    trebleSlider.oninput = e => {
        // set gain
        audio.setTrebleGain((e.target.value - 1) * 15);
        // Update label to match value
        trebleLabel.innerHTML = Math.round(e.target.value / 2 * 100);
    };
    trebleSlider.dispatchEvent(new Event("input"));

    // C.3 Distortion Slider
    let distortionSlider = document.querySelector("#slider-distortion");
    let distortionLabel = document.querySelector("#label-distortion");

    distortionSlider.oninput = e => {
        // set gain
        audio.setDistortion((e.target.value / 2) * 15);
        // Update label to match value
        distortionLabel.innerHTML = Math.round(e.target.value / 2 * 100);
    };
    distortionSlider.dispatchEvent(new Event("input"));

    // C.3 Distortion Checkbox
    document.querySelector("#cb-distortion").onchange = e => {
        audio.toggleDistortion(e.target.checked);
    }

    // D - hookup track select
    let trackSelect = document.querySelector("#select-track");
    trackSelect.onchange = e => {
        audio.loadSoundFile(e.target.value);
        //pause track if one is playing
        if (playButton.dataset.playing == "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }
    };

    // E - Setup checkboxes
    document.querySelector("#cb-gradient").onchange = e => {
        drawParams.showGradient = e.target.checked;
    }
    document.querySelector("#cb-bars").onchange = e => {
        drawParams.showBars = e.target.checked;
    }
    document.querySelector("#cb-circles").onchange = e => {
        drawParams.showCircles = e.target.checked;
    }
    document.querySelector("#cb-noise").onchange = e => {
        drawParams.showNoise = e.target.checked;
    }
    document.querySelector("#cb-invert").onchange = e => {
        drawParams.showInvert = e.target.checked;
    }
    document.querySelector("#cb-emboss").onchange = e => {
        drawParams.showEmboss = e.target.checked;
    }
    document.querySelector("#cb-images").onchange = e => {
        drawParams.showImages = e.target.checked;
    }
    document.querySelector("#cb-blur").onchange = e => {
        drawParams.showBlur = e.target.checked;
    }

    // F - setup analysis type options
    document.querySelector("#radio-frequency").onchange = e => {
        drawParams.analyzeType = "frequency";
    }
    document.querySelector("#radio-time").onchange = e => {
        drawParams.analyzeType = "time";
    }

} // end setupUI

// Sync up checkboxes with draw parameters
const syncUI = () => {
    document.querySelector("#cb-gradient").checked = drawParams.showGradient;
    document.querySelector("#cb-bars").checked = drawParams.showBars;
    document.querySelector("#cb-circles").checked = drawParams.showCircles;
    document.querySelector("#cb-noise").checked = drawParams.showNoise;
    document.querySelector("#cb-invert").checked = drawParams.showInvert;
    document.querySelector("#cb-emboss").checked = drawParams.showEmboss;
    document.querySelector("#radio-frequency").checked = drawParams.analyzeType == "frequency";
    document.querySelector("#radio-time").checked = drawParams.analyzeType == "time";
    document.querySelector("#cb-distortion").checked = drawParams.distortionOn;
    document.querySelector("#cb-images").checked = drawParams.showImages;
    document.querySelector("#cb-blur").checked = drawParams.showBlur;
}

const loop = () => {
    setTimeout(loop, 1000 / 60) // run at 60fps
    canvas.draw(drawParams);
}

const loadSettings = () => {
    const url = './data/av-data.json';
    const xhr = new XMLHttpRequest();

    xhr.onload = (e) => {
        const json = JSON.parse(e.target.responseText);
        console.log(json);

        // Set title
        document.title = json.title;
        document.querySelector("#title").innerHTML = json.title;

        // Set song selection
        let songSelect = document.querySelector("#select-track");
        for (let i = 0; i < json.songs.length; i++) {
            songSelect.appendChild(utils.createElementFromString(`<option value="./media/${json.songs[i].file}">${json.songs[i].name}</option>`));
        }
        document.querySelector("#select-track").firstChild.selected = true;

        // Add sprites to canvas
        for (let i = 0; i < json.sprites.length; i++) {
            canvas.addSprite(new Sprite(`./media/${json.sprites[i].file}`,
                json.sprites[i].x,
                json.sprites[i].y,
                json.sprites[i].width,
                json.sprites[i].height));
        }

        // Set UI settings
        let keys = Object.keys(json.startingUI);
        for (let i = 0; i < keys.length; i++) {
            drawParams[keys[i]] = json.startingUI[keys[i]];
        }
        audio.toggleDistortion(drawParams.distortionOn);
        syncUI();
    }
    xhr.open("GET", url);
    xhr.send();
}

export { init, loadSettings };