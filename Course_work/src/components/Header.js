import React, { useState } from 'react';
import myImage from './logo.jpg';

function Header() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Логика для обработки поиска (например, передача searchTerm в API или фильтрацию контента)
    console.log("Поиск по запросу:", searchTerm);
  };
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={myImage} alt="Logo" />
        </div>
        <div className="header-text">
          <h1>Рекламное агентство ООО "Flamingo"</h1>
          <h3>+7 (999) 737-77-00</h3>
          <h3>contact@agency.com</h3>
        </div>
      </div>
    </header>
  );
}

export default Header;


