import { Project, Navbar, Intro, Contact } from "./components.jsx";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import projectsJSON from './project-data/projects.json';

let projects = projectsJSON.projects;

const projectDataLocation = "./src/project-data/projects.json";
console.log(projectDataLocation);
//const projects = (await loadJSON(projectDataLocation)).projects;
console.log(projects);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div id="navbar">
      <Navbar />
    </div>
    <div id="main" className="mt-4 mx-6">
      <Intro />
      <div className="block" id="projects">
        <h2 className="title has-text-weight-semibold is-size-2" >Featured Projects</h2>
        <div className="grid is-gap-5 project-grid is-col-min-12">
          {projects.map((project) => (<Project project={project} key={project.title} className="cell"/>))}
        </div>
      </div>
      <Contact/>
    </div>
  </StrictMode>
);