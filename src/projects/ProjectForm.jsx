import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Project } from './Project';

function ProjectForm({ project: initialProject, onSave, onCancel }) {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    budget: '',
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid()) return;
    onSave(project);
  };

  function handleChange(event) {
    const { type, name, value, checked } = event.target;
    // if input type is checkbox use checked
    // otherwise it's type is text, number etc. so use value
    let updatedValue = type === 'checkbox' ? checked : value;

    //if input type is number convert the updatedValue string to a +number
    if (type === 'number') {
      updatedValue = Number(updatedValue);
    }
    const change = {
      [name]: updatedValue,
    };

    let updatedProject;
    // need to do functional update b/c
    // the new project state is based on the previous project state
    // so we can keep the project properties that aren't being edited +like project.id
    // the spread operator (...) is used to
    // spread the previous project properties and the new change
    setProject((p) => {
      updatedProject = new Project({ ...p, ...change });
      return updatedProject;
    });
    setErrors(() => validate(updatedProject));
  }

  function validate(project) {
    let errors = { name: '', description: '', budget: '' };
    if (project.name.length === 0) {
      errors.name = 'Name is required.';
    }
    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = 'Name needs to be at least 3 characters.';
    }
    if (project.description.length === 0) {
      errors.description = 'Description is required.';
    }
    if (project.budget === 0) {
      errors.budget = 'Budget must be more than $0.';
    }
    return errors;
  }

  function isValid() {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  }

  return (
    <form className="" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="enter name"
        value={project.name}
        onChange={handleChange}
        autoComplete="off"
      />
      {errors.name.length > 0 && <div className="error">{errors.name}</div>}
      <label htmlFor="description">Project Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="enter description"
        value={project.description}
        onChange={handleChange}
        rows=""
      />
      {errors.description.length > 0 && (
        <div className="error">{errors.description}</div>
      )}

      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        id="budget"
        name="budget"
        placeholder="enter budget"
        value={project.budget}
        onChange={handleChange}
      />
      {errors.budget.length > 0 && (
        <div className="card error">{errors.budget}</div>
      )}
      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        id="isActive"
        name="isActive"
        checked={project.isActive}
        onChange={handleChange}
      />
      <div className="actions">
        <button className="primary bordered medium">Save</button>
        <span />
        <a onClick={onCancel}>cancel</a>
      </div>
    </form>
  );
}

ProjectForm.propTypes = {
  project: PropTypes.instanceOf(Project),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProjectForm;
