import React, { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { useUser } from '../../UserContext';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [paymentData, setPaymentData] = useState({
        email: '',
        phone: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolder: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useUser(); // Получаем user из контекста, где вы храните данные пользователя

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!user) {
                alert("Пожалуйста, войдите в систему.");
                return;
            }

            const userId = user.id; // Получаем userId из объекта пользователя
            const response = await fetch(`http://localhost:5000/cart?userId=${userId}`);

            if (response.ok) {
                const data = await response.json();
                setCartItems(data);
                const totalAmount = data.reduce((acc, item) => acc + item.service.price, 0);
                setTotal(totalAmount);
            } else {
                const error = await response.json();
                console.error('Ошибка загрузки корзины:', error);
                alert(`Ошибка загрузки корзины: ${error.message || 'Неизвестная ошибка'}`);
            }
        };

        fetchCartItems();
    }, [user]);

    const handlePaymentChange = (e) => {
      const { name, value } = e.target;
      setPaymentData(prevPaymentData => ({
          ...prevPaymentData,
          [name]: value,
      }));
  };
  
  const handlePaymentSubmit = async (e) => {
      e.preventDefault();
      
      const { email, phone, cardNumber, cvv, cardHolder } = paymentData;
  
      if (
          !email ||
          !phone ||
          cardNumber.length !== 16 ||
          cvv.length !== 3 ||
          !cardHolder
      ) {
          alert("Пожалуйста, заполните все поля правильно!");
          return;
      }
  
      alert("Оплата прошла успешно!");
  
      // Получение пользователя из контекста
      const userId = user.id; // Получаем userId из данных пользователя
  
      // Удаляем услуги из корзины
      try {
          const response = await fetch(`http://localhost:5000/cart/clear`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId }),
          });
  
          if (!response.ok) {
              const error = await response.json();
              alert(error.error);
              return;
          }
  
          // Если удаление прошло успешно, обновляем состояние
          setCartItems([]); // Очистить корзину
          setTotal(0); // Обновить общую сумму
          setPaymentData({
              email: '',
              phone: '',
              cardNumber: '',
              expiryDate: '',
              cvv: '',
              cardHolder: '',
          });
          setIsModalOpen(false);
      } catch (error) {
          console.error("Ошибка при удалении услуг из корзины:", error);
          alert("Не удалось удалить услуги из корзины.");
      }
  };
  
  const handleRemoveItem = async (serviceId) => {
      // Получение пользователя из контекста
      const userId = user.id; // Получаем userId из данных пользователя
      try {
          const response = await fetch(`http://localhost:5000/cart/remove`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId, serviceId }),
          });
  
          if (!response.ok) {
              const error = await response.json();
              alert(error.error);
              return;
          }
  
          // Обновление состояния с помощью предыдущего состояния
          setCartItems(prevCartItems => {
              const updatedCartItems = prevCartItems.filter(item => item.service.id !== serviceId);
              const newTotal = updatedCartItems.reduce((acc, item) => acc + item.service.price, 0);
              setTotal(newTotal); // Обновляем общую сумму
              return updatedCartItems; // Возвращаем обновленные элементы корзины
          });
      } catch (error) {
          console.error("Ошибка при удалении услуги из корзины:", error);
          alert("Не удалось удалить услугу из корзины.");
      }
  };

  return (
    <div className={styles.cartContainer}>
      <h1> <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '10px' }} /> Корзина</h1>
      <h2> Выбранные услуги:</h2>
      {cartItems.length === 0 ? (
        <p>Похоже ваша корзина пуста...</p>
      ) : (
        <div>
            <div className={styles.cartContainerInside}>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.service.title} - {item.service.price}₽
                <button onClick={() => handleRemoveItem(item.service.id)}>X</button>
              </li>
            ))}
          </ul>
          </div>
          <h3>Итого: {total}₽</h3>
          <div className={styles.paymentButtonContainer}>
          <button id="btn-1" onClick={() => setIsModalOpen(true)}>Перейти к оплате</button>
          </div>
        </div>
        
      )}

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setIsModalOpen(false)}>×</span>
            <h2>Оплата</h2>
            <form onSubmit={handlePaymentSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Ваш email"
                value={paymentData.email}
                onChange={handlePaymentChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Номер телефона"
                value={paymentData.phone}
                onChange={handlePaymentChange}
                required
              />
              <div className={styles.card}>
                <span>Номер карты: {paymentData.cardNumber || '•••• •••• •••• ••••'}</span>
                <span>Срок действия: {paymentData.expiryDate || 'MM/YY'}</span>
                <span>Имя держателя: {paymentData.cardHolder || 'Имя Фамилия'}</span>
              </div>
              <input
                type="text"
                name="cardNumber"
                placeholder="Номер карты"
                value={paymentData.cardNumber}
                onChange={handlePaymentChange}
                maxLength="16"
                required
              />
              <input
                type="text"
                name="expiryDate"
                placeholder="Срок (MM/YY)"
                value={paymentData.expiryDate}
                onChange={handlePaymentChange}
                maxLength="5"
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={paymentData.cvv}
                onChange={handlePaymentChange}
                maxLength="3"
                required
              />
              <input
                type="text"
                name="cardHolder"
                placeholder="Имя держателя карты"
                value={paymentData.cardHolder}
                onChange={handlePaymentChange}
                required
              />
              <button type="submit">Подтвердить оплату</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;