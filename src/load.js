import React from 'react'
async function loadJSON (url){
    let returnValue;
    console.log("Fetching from: " + url);
    await fetch(url).
    then((response) => response.json()).then((json) =>{
        returnValue = json;
    })
    .catch((error) => {
        console.log(error);
        returnValue = null;
    });
    return returnValue;
}

function getImage(imageName) {
    return `/assets/${imageName}`;
}


export {loadJSON, getImage};