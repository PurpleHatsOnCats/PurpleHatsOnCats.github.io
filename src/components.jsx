import { useState } from 'react';
import { getIconFromNumber, getIconFromText, returnIfTrue, clampNum, getImage } from './utils.jsx';
import SethSVG from "./TextToSvgComponent.jsx";

function Project({ project, className}) {
    return (
        <div className={`card project ${className}`}>
            <div className="card-image">
                <Carousel
                    images={project.media}
                />
            </div>
            <div className="card-content">
                <h4 className="title is-4 has-text-centered has-text-weight-semibold">{project.title}</h4>
                <p className="subtitle is-5 has-text-centered">{project.type} - {project.time.season} {project.time.year}</p>
                <span className="icons is-flex is-justify-content-center">

                    {/* Team Icon */}
                    <Rollover
                        icon={getIconFromNumber(project.team.size)}
                        iconText={project.team.size}
                        rolloverText={<p>Team of {project.team.size} <br /> Roles: {project.team.roles.join(", ")}</p>}
                    />

                    {/* Length */}
                    <Rollover
                        icon={getIconFromText("Clock")}
                        iconText={""}
                        rolloverText={<p>Length of project: {project.time.length}</p>}
                    />

                    {/* Tools Icons */}
                    {project.tools.map((tool) =>
                        <Rollover
                            icon={getIconFromText(tool)}
                            iconText={""}
                            rolloverText={tool}
                            key={tool}
                        />
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
                        src={getImage("projects/" + img.src)}
                        alt={img.alt}
                        style={{ transform: `translate(-${(slide) * 100}%)` }}
                        key={index}
                    ></img>
                ))}
            </div>
            <button
                className="button carousel-previous"
                onClick={() => { setslide(clampNum(slide - 1, 0, images.length - 1)); }}
                style={{ display: `${slide > 0 ? "" : "none"}` }}
            >
                <span className="icon">
                    <i className="fa-solid fa-caret-left"></i>
                </span>
            </button>
            <button
                className="button carousel-next"
                onClick={() => { setslide(clampNum(slide + 1, 0, images.length - 1)); }}
                style={{ display: `${slide < images.length - 1 ? "" : "none"}` }}
            >
                <span className="icon">
                    <i className="fa-solid fa-caret-right"></i>
                </span>
            </button>
        </div>
    );
}

function Navbar() {
    return (
        <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item px-5 py-2" href="">
                    <SethSVG width="800" height="160" fill="hsl(0, 0%, 96%)" xmlns="http://www.w3.org/2000/svg" />
                </a>
                <div className="navbar-item" id="navbar-center">Professional Portfolio</div>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" id="burger"
                    onClick={el => {
                        document.querySelector("#burger").classList.toggle('is-active');
                        document.querySelector("#navbarMenu").classList.toggle('is-active');
                    }}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarMenu" className="navbar-menu">
                <div className="navbar-start has-text-weight-medium">

                </div>

                <div className="navbar-end">
                    <a className="navbar-item">
                        Intro
                    </a>
                    <a className="navbar-item">
                        Projects
                    </a>
                    <a className="navbar-item">
                        Contact
                    </a>
                    <a className="navbar-item">
                        Resume
                    </a>
                </div>
            </div>
        </nav>
    );
}

function Intro() {
    return (
        <div className='block has-text-centered' id='intro'>
            <h2 className="title has-text-weight-semibold is-size-2">Introduction</h2>
            <div className='has-text-left'>
                I am a 3rd year Game Design and Development Major at RIT. I have a severe passion for creating and learning, 
                which has led me on a long journey of improvement ever since the first game I made in 6th grade. I don't just make games however;
                I have delved into audio engineering and web development as well. Programming, design, and math are especially enjoyable no matter
                the field.
            </div>
        </div>
    );
}

export { Project, Navbar, Intro };