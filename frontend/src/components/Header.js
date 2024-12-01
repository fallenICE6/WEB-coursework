import React from 'react';
import myImage from './logo.jpg';

function Header() {
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


