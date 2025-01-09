import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../UserContext'; // Импортируем контекст пользователя
import styles from './Reviews.module.css';

function Reviews() {
  const { user } = useUser(); // Получаем данные о пользователе из контекста
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && newReview.trim()) {
      try {
        const response = await axios.post('http://localhost:5000/reviews', {
          name,
          comment: newReview,
        });
        setReviews([...reviews, response.data]);
        setNewReview("");
        setName("");
      } catch (error) {
        console.error("Error adding review", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${id}`);
      setReviews(reviews.filter(review => review.id !== id)); // Обновляем список отзывов
    } catch (error) {
      console.error("Error deleting review", error);
    }
  };

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.typewriter}>
        <h1>Отзывы клиентов</h1>
      </div>
      <section className={styles.reviewsSection}>
        <ul className={styles.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <strong>{review.name}:</strong> {review.comment}
              {user && user.role === 'ADMIN' && ( // Проверяем, есть ли пользователь и его роль
              <div className={styles.buttonContainer1}>
                <button 
                  onClick={() => handleDelete(review.id)} 
                  className={styles.deleteButton}>
                  Удалить
                </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.formContainer}>
          <h3>Оставить отзыв</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ваше имя"
              required
            />
            <textarea
              rows="4"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Напишите ваш отзыв..."
              required
            />

            <div className={styles.buttonContainer}>
              <button type="submit">Отправить</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Reviews;