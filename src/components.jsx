function Project({ project }) {
    return (
        <div className="card project">
            <div className="card-image">
                <figure className="image is-4by3">
                    <div className="carousel">
                        <img
                            src={"./media/projects/" + project.media[0].src}
                            alt={project.media[0].alt}
                        />
                    </div>
                </figure>
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

export { Project };