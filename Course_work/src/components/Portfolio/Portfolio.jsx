import React, { useEffect, useState } from 'react';
import styles from './Portfolio.module.css'; // Импортируем стили

function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/portfolio');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Ошибка загрузки проектов:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className={styles.portfolio}>
      <h2 className={styles.header}>Наши реализованные проекты</h2>
      <hr className={styles.separator} />
      <div className={styles.portfolioList}>
        {projects.map(project => (
          <div key={project.id} className={styles.portfolioItem}>
            <a href={project.resourceUrl} target="_blank" rel="noopener noreferrer">
              <img src={project.imageUrl} alt={project.title} />
            </a>
            <p>{project.title}</p>
          </div>
        ))}
        </div>
    </div>
  );
}

export default Portfolio;