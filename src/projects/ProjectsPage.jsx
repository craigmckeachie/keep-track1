import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import { projectAPI } from "./projectAPI";
import { Project } from "./Project";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState(null);
  const skeletonCards = [...Array(15).keys()];

  function toast(message) {
    setMessage(message);
    setTimeout(() => setMessage(null), 2200);
  }

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        if (currentPage === 1) {
          setProjects(data);
        } else {
          setProjects((projects) => [...projects, ...data]);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [currentPage]);

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const saveProject = (project) => {
    projectAPI
      .put(project)
      .then((updatedProject) => {
        let updatedProjects = projects.map((p) => {
          return p.id === project.id ? new Project(updatedProject) : p;
        });
        setProjects(updatedProjects);
        toast("Successfully Saved");
      })
      .catch((e) => {
        setError(e.message);
      });
  };
  return (
    <>
      <h1>Projects</h1>
      <section className="panel">
        {message && <div className="toast-top alert fade-in">{message}</div>}

        {error && (
          <div className="toast-top alert fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width={20} height={20}>
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        <ProjectList projects={projects} onSave={saveProject} />

        {!loading && !error && (
          <div className="center">
            <button className="large" onClick={handleMoreClick}>
              More...
            </button>
          </div>
        )}

        {loading && (
          <div className="list">
            {skeletonCards.map((card) => (
              <ProjectCardSkeleton key={card}></ProjectCardSkeleton>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default ProjectsPage;
