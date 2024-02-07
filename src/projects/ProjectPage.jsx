import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectAPI } from "./projectAPI";
import ProjectDetail from "./ProjectDetail";

function ProjectPage(props) {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    setLoading(true);
    projectAPI
      .find(id)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      {/* <div className="architect-background pattern-1"></div> */}
      <h1>Project Detail</h1>
      {loading && (
        <div className="">
          <span className=""></span>
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div>
          <section>
            <p>
              <span></span> {error}
            </p>
          </section>
        </div>
      )}

      {project && <ProjectDetail project={project} />}
    </>
  );
}

export default ProjectPage;
