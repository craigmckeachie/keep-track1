import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

function ProjectList({ projects, onSave }) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Your useEffect code here to be run on update
    }
  });

  const handleEdit = (project) => {
    setProjectBeingEdited(project);
  };

  const cancelEditing = (event) => {
    event.preventDefault();
    setProjectBeingEdited({});
  };

  return (
    <div className="list">
      {projects.map((project) => (
        <div key={project.id}>
          {project === projectBeingEdited ? (
            <ProjectForm project={project} onSave={onSave} onCancel={cancelEditing} />
          ) : (
            <ProjectCard project={project} onEdit={handleEdit} enableExitAnimation={isInitialMount.current} />
          )}
        </div>
      ))}
    </div>
  );
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProjectList;
