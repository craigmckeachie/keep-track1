import { Project } from './Project';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function formatDescription(description) {
  return description.substring(0, 80) + '...';
}

function ProjectCard(props) {
  const { project, onEdit } = props;
  const handleEditClick = (projectBeingEdited) => {
    onEdit(projectBeingEdited);
  };

  return (
    <>
      <img src={project.imageUrl} alt={project.name} />
      <section>
        <h5>
          <Link to={'/projects/' + project.id}>{project.name}</Link>
        </h5>
        <p className="text-secondary">
          {formatDescription(project.description)}
        </p>
        <p className="text-secondary">
          Budget : ${project.budget.toLocaleString()}
        </p>
        <button
          onClick={() => {
            handleEditClick(project);
          }}
        >
          Edit
        </button>
      </section>
    </>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.instanceOf(Project).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ProjectCard;
