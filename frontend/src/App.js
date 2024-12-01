import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contacts from './components/Contacts';
import Reviews from './components/Reviews';
import MainContent from './components/MainContent';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <nav className="nav">
          <h3>Навигация на сайте</h3>
          <ul>
          <li><Link to="/">Главная</Link></li>
    <li><Link to="/services">Услуги</Link></li>
    <li><Link to="/portfolio">Портфолио</Link></li>
    <li><Link to="/contacts">Контакты</Link></li>
    <li><Link to="/reviews">Отзывы</Link></li>
  </ul>
          <div className="company-name">ООО "Flamingo"</div>
        </nav>
        <main>
        
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
          
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


