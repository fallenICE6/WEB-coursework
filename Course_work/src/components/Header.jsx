import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // Убедитесь, что путь правильный
import myImage from './logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

function Header() {
  const { user, logout } = useUser(); // Получаем пользователя и функцию logout из контекста
  const navigate = useNavigate();

  const [menuVisible, setMenuVisible] = useState(false); // Состояние для отображения меню

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
    setMenuVisible(false); // Закрыть меню после перехода на страницу входа
  };

  const handleCartClick = () => {
    navigate('/cart');
    setMenuVisible(false); // Закрыть меню после перехода в корзину
  };

  const handleLogout = () => {
    logout(); // Вызываем функцию logout из контекста
    setMenuVisible(false); // Закрыть меню после выхода
    setTimeout(() => navigate('/'), 0);
};

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Переключаем видимость меню
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={handleLogoClick}>
          <img src={myImage} alt="Logo" />
        </div>
        <div className="header-text">
          <h1>Рекламное агентство ООО "Flamingo"</h1>
          <h3>+7 (999) 737-77-00</h3>
          <h3>contact@agency.com</h3>
        </div>
        <div className="header-icons">
          <FontAwesomeIcon
            icon={faUser}
            className="header-icon"
            onClick={toggleMenu}
            title="Пользователь"
          />
          {menuVisible && (
            <div className="dropdown-menu">
              <div className="username">
                {user ? user.username : "Гость"} {/* Проверка на наличие user */}
              </div>
              {!user ? (
                <button onClick={handleLoginClick}>Войти</button>
              ) : (
                <>
                  <button onClick={handleCartClick}>Корзина</button>
                  <button onClick={handleLogout}>Выйти</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

