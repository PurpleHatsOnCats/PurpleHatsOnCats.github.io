import { loadJSON } from "./load.js";
import { Project } from "./components.jsx";
import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'

const projectDataLocation = "https://raw.githubusercontent.com/PurpleHatsOnCats/PurpleHatsOnCats.github.io/refs/heads/main/project-data/projects.json";
const projects = (await loadJSON(projectDataLocation)).projects;
console.log(projects);

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <div className="grid is-col-min-16 is-gap-5 mx-6 project-grid">
        {projects.map((project) =>(<div className="cell project-cell" key={project.title}><Project project={project} /></div>))}
      </div>
    </StrictMode>
);