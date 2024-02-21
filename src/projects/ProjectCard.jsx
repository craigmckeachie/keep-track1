import { Project } from "./Project";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function formatDescription(description) {
  return description.substring(0, 80) + "...";
}

function ProjectCard(props) {
  const { project, onEdit, enableExitAnimation } = props;
  const handleEditClick = (projectBeingEdited) => {
    onEdit(projectBeingEdited);
  };
  // let classNames = "card";
  // if (enableExitAnimation) {
  //   classNames += "flip-in-ver-left";
  // }

  return (
    <div className="card flip-in-ver-left">
      <img src={project.imageUrl} alt={project.name} />
      <section>
        <h5>
          <Link to={"/projects/" + project.id}>{project.name}</Link>
        </h5>
        <p className="text-secondary">{formatDescription(project.description)}</p>
        <p className="text-secondary">Budget : ${project.budget.toLocaleString()}</p>
        <button
          onClick={() => {
            handleEditClick(project);
          }}
        >
          Edit
        </button>
      </section>
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.instanceOf(Project).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ProjectCard;
