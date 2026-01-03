function Project({ project }) {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img
                        src={"./media/projects/" + project.media[0].src}
                        alt={project.media[0].alt}
                    />
                </figure>
            </div>
            <div className="card-content">
                <p className="title is-4">{project.title}</p>
                <p className="subtitle is-5">{project.type} - {project.time.season} {project.time.year}</p>
                <span className="icons is-flex">

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
                        ></Rollover>
                    )}
                </span>
                <div className="content">
                    <ul>
                        {project.points.map((item) => (<li>{item}</li>))}
                    </ul>
                </div>
            </div>
            <footer class="card-footer">
                {returnIfTrue(project.buildPage, <a href={"#" + project.buildPage} class="card-footer-item">Build Page</a>)}
                {returnIfTrue(project.infoPage, <a href={"#" + project.infoPage} class="card-footer-item">More Info</a>)}
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
        case "Aseprite": return (<img src="./media/icons/aseprite-icon.png"></img>); break;
        case "Clock": name = "fa-solid fa-clock"; break;
        default: name = ""; break;
    }
    return (<i className={name}></i>);
}
const returnIfTrue = (bool, returnData) => {
    if(bool){
        return returnData;
    }
    return "";
}

export { Project };