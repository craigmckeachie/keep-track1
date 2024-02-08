function ProjectCard(props) {
  return (
    <div className="card">
      <img className="skeleton"  />

      <section>
        <h5 className="skeleton skeleton-text"></h5>
        <p className="text-secondary skeleton skeleton-text"></p>
        <p className="text-secondary skeleton skeleton-text"></p>
        <button className="skeleton"></button>
      </section>
    </div>
  );
}

export default ProjectCard;
