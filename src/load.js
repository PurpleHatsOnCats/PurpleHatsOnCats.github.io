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
    console.log(imageName);
    return new URL(`./media/` + imageName,import.meta.url).href;
}


export {loadJSON, getImage};