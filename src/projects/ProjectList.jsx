import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

function ProjectList({ projects, onSave }) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

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
        <div key={project.id} className="flip-card ">
          <div className="flip-card-inner card">
            <div className="flip-card-front">
              <ProjectCard project={project} onEdit={handleEdit} />
            </div>
            <div className="flip-card-back">
              <ProjectForm
                project={project}
                onSave={onSave}
                onCancel={cancelEditing}
              />
            </div>
          </div>
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
