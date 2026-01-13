const getImage = (imageName) => {
    return `/assets/${imageName}`;
}
const getIconFromNumber = (num) => {
    let name;
    switch (num) {
        case 1: name = "fas fa-user"; break;
        case 2: name = "fas fa-user-group"; break;
        default: name = "fas fa-users"; break;
    }
    return (<i className={name}></i>);
}
const getIconFromText = (text) => {
    let name;
    switch (text) {
        case "Unity": name = "fa-brands fa-unity"; break;
        case "Aseprite": return (<img src={getImage("icons/aseprite_icon.png")}></img>);
        case "Clock": name = "fa-solid fa-clock"; break;
        case "Flowlab": return (<img src={getImage("icons/flowlab_icon.png")}></img>);
        case "MS Paint": return (<img src={getImage("icons/mspaint_icon.png")}></img>);
        case "Javascript": return (<img src={getImage("icons/javascript_icon.png")}></img>);
        case "C#": return (<img src={getImage("icons/csharp_icon.png")}></img>);
        case "Boardgame": name = "fa-solid fa-dice"; break;
        default: name = ""; break;
    }
    return (<i className={name}></i>);
}
const returnIfTrue = (bool, returnData) => {
    if (bool) {
        return returnData;
    }
    return "";
}
const clampNum = (num, min, max) => {
    return num > min ? (num < max ? num : max) : min;
}
export {getIconFromNumber, getIconFromText, returnIfTrue, clampNum, getImage}