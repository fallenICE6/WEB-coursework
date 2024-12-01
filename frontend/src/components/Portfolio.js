import React from 'react';

function Portfolio() {
  return (
    <section>
      <h2>Наше портфолио</h2>
      <div className="portfolio">
        <div className="portfolio-item">
          <img src="image1.jpg" alt="Проект 1" />
          <p>Проект 1: Разработка сайта для бизнеса</p>
        </div>
        <div className="portfolio-item">
          <img src="image2.jpg" alt="Проект 2" />
          <p>Проект 2: Контекстная реклама для онлайн-магазина</p>
        </div>
        {/* Добавьте больше проектов по аналогии */}
      </div>
    </section>
  );
}

export default Portfolio;