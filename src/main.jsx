import {loadJSON} from "./load.js";
import {Project} from "./components.jsx";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const projectDataLocation = "project-data/projects.json";
const projects = (await loadJSON(projectDataLocation)).projects;
console.log(projects);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="grid mx-6">
      <div className="cell"><Project project={projects[0]}/></div>
    </div>
  </StrictMode>,
)
