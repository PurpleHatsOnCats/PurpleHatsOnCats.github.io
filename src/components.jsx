import { useState } from 'react';

function Project({ project }) {
    return (
        <div className="card project">
            <div className="card-image">
                <Carousel
                    images={project.media}
                >
                </Carousel>
            </div>
            <div className="card-content">
                <p className="title is-4 has-text-centered">{project.title}</p>
                <p className="subtitle is-5 has-text-centered">{project.type} - {project.time.season} {project.time.year}</p>
                <span className="icons is-flex is-justify-content-center">

                    {/* Team Icon */}
                    <Rollover
                        icon={getIconFromNumber(project.team.size)}
                        iconText={project.team.size}
                        rolloverText={<p>Team of {project.team.size} <br /> Roles: {project.team.roles.join(", ")}</p>}
                    ></Rollover>

                    {/* Length */}
                    <Rollover
                        icon={getIconFromText("Clock")}
                        iconText={""}
                        rolloverText={<p>Length of project: {project.time.length}</p>}
                    ></Rollover>

                    {/* Tools Icons */}
                    {project.tools.map((tool) =>
                        <Rollover
                            icon={getIconFromText(tool)}
                            iconText={""}
                            rolloverText={tool}
                            key={tool}
                        ></Rollover>
                    )}
                </span>
                <div className="content">
                    <ul className="is-justify-center">
                        {project.points.map((item, index) => (<li key={index}>{item}</li>))}
                    </ul>
                </div>
            </div>
            <footer className="card-footer">
                {returnIfTrue(project.buildPage, <a href={"#" + project.buildPage} className="card-footer-item">Build Page</a>)}
                {returnIfTrue(project.infoPage, <a href={"#" + project.infoPage} className="card-footer-item">More Info</a>)}
            </footer>
        </div>
    )
};

function Rollover({ icon, iconText = "", rolloverText = "" }) {
    return (
        <div className="rollover-container">
            <span className="rollover-icon">
                <span className="icon">
                    {icon}
                </span>
                {iconText}
            </span>
            <div className="rollover-text box p-2">
                {rolloverText}
            </div>
        </div>
    );
}

function Carousel({ images = [] }) {
    const [slide, setslide] = useState(0);
    return (
        <div className="carousel">
            <div className="carousel-images">
                {images.map((img, index) => (
                    <img
                        src={"./media/projects/" + img.src}
                        alt={img.alt}
                        style={{ transform: `translate(-${(slide) * 100}%)` }}
                        key={index}
                    ></img>
                ))}
            </div>
            <button
                className="button carousel-previous"
                onClick={() => { setslide(clampNum(slide - 1, 0, images.length - 1)); console.log(slide); }}
                style={{ display: `${slide > 0 ? "" : "none"}` }}
            >
                <span className="icon">
                    <i className="fa-solid fa-caret-left"></i>
                </span>
            </button>
            <button
                className="button carousel-next"
                onClick={() => { setslide(clampNum(slide + 1, 0, images.length - 1)); console.log(slide); }}
                style={{ display: `${slide < images.length-1 ? "" : "none"}` }}
            >
                <span className="icon">
                    <i className="fa-solid fa-caret-right"></i>
                </span>
            </button>
        </div>
    );
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
        case "Aseprite": return (<img src="./media/icons/aseprite_icon.png"></img>);
        case "Clock": name = "fa-solid fa-clock"; break;
        case "Flowlab": return (<img src="./media/icons/flowlab_icon.png"></img>);
        case "MS Paint": return (<img src="./media/icons/mspaint_icon.png"></img>);
        case "Javascript": return (<img src="./media/icons/javascript_icon.png"></img>);
        case "C#": return (<img src="./media/icons/csharp_icon.png"></img>);
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

export { Project };