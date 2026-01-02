function Project({ project }) {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img
                        src="https://bulma.io/assets/images/placeholders/1280x960.png"
                        alt="Placeholder image"
                    />
                </figure>
            </div>
            <div className="card-content">
                <p className="title is-4">{project.title}</p>
                <p className="subtitle is-5">{project.type}</p>
                <ul>
                    <li>
                        <Rollover
                            icon={getIconFromNumber(project.team.size)}
                            iconText={project.team.size}
                            rolloverText={"Roles: " + project.team.roles.join(", ")}
                        ></Rollover>
                    </li>
                </ul>
                <div className="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
                    iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
                    <a href="#">#responsive</a>
                    <br />
                    <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
            </div>
        </div>
    )
};

function Rollover({icon, iconText="", rolloverText=""}) {
    return (
        <div className="rollover-container">
            <span className="rollover-icon">
                <span className="icon">
                    <i className={"fas " + icon}></i>
                </span>
                {iconText}
            </span>
            <div className="rollover-text box p-2">
                {rolloverText}
            </div>
        </div>
    );
}

const getIconFromNumber = (num) =>{
    switch(num){
        case 1: return "fa-user";
        case 2: return "fa-user-group";
        default: return "fa-users";
    }
}

export { Project };