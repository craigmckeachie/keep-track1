import React from "react";

export default function ProjectDetail({ project }) {
  return (
    <section className="panel">
      <div className="card card-large ">
        <img className="rounded" src={project.imageUrl} alt={project.name} />
        <section>
          <h5>{project.name}</h5>
          <p className="text-secondary">{project.description}</p>
          
          <p className="text-secondary">Budget : ${project.budget.toLocaleString()}</p>
          <p className="text-secondary">Signed: {new Date(project.contractSignedOn).toLocaleDateString()}</p>
          <p className="text-secondary">
            <mark className="active">{project.isActive ? "active" : "inactive"}</mark>
          </p>
        </section>
      </div>
    </section>
  );
}
