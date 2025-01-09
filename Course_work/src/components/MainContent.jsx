import React, { useEffect, useState } from 'react';

function MainContent() {
  const fullText = "В 100 раз лучше, чем наемный сотрудник"; // Текст для печати
  const [displayedText, setDisplayedText] = useState(""); // Отображаемый текст
  const [isFinished, setIsFinished] = useState(false); // Завершение анимации
  const [contentItems, setContentItems] = useState([]); // Контент-элементы

  useEffect(() => {
    // Текстовая анимация
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(prev => prev + fullText.charAt(currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsFinished(true); // Устанавливаем флаг завершения после окончания печати
      }
    }, 100); // 100 ms между символами

    return () => clearInterval(interval); // Очистить интервал при размонтировании компонента
  }, []);

  useEffect(() => {
    // Получение контент-элементов из API
    const fetchContentItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/content-items');
        const data = await response.json();
        setContentItems(data);
      } catch (error) {
        console.error('Ошибка при загрузке контент-элементов:', error);
      }
    };

    fetchContentItems();
  }, []);

  return (
    <section className="main-content">
      <div className="content-main">
        <h2>Добро пожаловать на наш сайт рекламного агентства!</h2>
        <p className="intro">О нас</p>
        <div className="text-main">
          <h3>
            ООО "Flamingo" — это динамично развивающееся рекламное агентство, специализирующееся на предоставлении комплексных решений для продвижения бизнеса в интернете и за его пределами. Мы объединяем опыт, креатив и технологические инновации для того, чтобы наши клиенты достигали максимальных результатов в своей отрасли.
            <br />
            <br />
            Наши специалисты обладают глубокими знаниями в области маркетинга, дизайна, SEO, SMM и контекстной рекламы. Мы создаем индивидуальные стратегии, которые ориентированы на реальные потребности бизнеса, учитывая особенности целевой аудитории, конкурентную среду и актуальные тренды в digital-маркетинге.
          </h3>
          <p className="intro">Наша задача</p>
          <div className="text-main">
            <h3>
              Миссия нашей компании — помочь предпринимателям, малому и среднему бизнесу добиться успеха в условиях быстро меняющегося рынка, предоставив им мощные инструменты для продвижения их брендов. Мы стремимся строить долгосрочные партнерские отношения с каждым клиентом, обеспечивая максимальную прозрачность и результативность всех наших действий.
              <br />
            </h3>
          </div>
        </div>
      </div>
      <div className="content-main-1">
        <h2 className={`typing ${isFinished ? 'finished' : ''}`}>{displayedText}</h2>
        <section className="contents">
          {contentItems.map(item => (
            <div className="content-item" key={item.id}>
              <img src={item.imageUrl} alt={`Изображение: ${item.title}`} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}

export default MainContent;