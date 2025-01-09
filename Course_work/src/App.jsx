import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import Services from './components/Services/Services';
import Portfolio from './components/Portfolio/Portfolio';
import Contacts from './components/Contacts/Contacts';
import Reviews from './components/Rewiews/Reviews';
import MainContent from './components/MainContent';
import './App.css';
import IconMenu from './icons/icon-menu.png';
import IconHome from './icons/icon-home.png';
import IconServices from './icons/icon-customer.png';
import IconPortfolio from './icons/icon-portfolio.png';
import IconContacts from './icons/icon-contact.png';
import IconReviews from './icons/icon-good-feedback.png';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import RegisterAdmin from './components/Login/RegisterAdmin';
import { UserProvider } from './UserContext';
import Cart from './components/Cart/Cart';
function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className="App">
      <UserProvider>
      <Router>
      <Header />
        <nav className={`nav ${isNavVisible ? '' : 'collapsed'}`}>
          <div className="nav-toggle" onClick={toggleNav}>
            <img src={IconMenu} alt="Menu Icon" />
          </div>
          <div className="nav-content">
            <h3 className="shining-text">Навигация</h3>
            <ul>
              <li>
                <Link to="/" className="active">
                  <img src={IconHome} alt="Home Icon" className="nav-icon" />
                  <span className="item">Главная</span>
                </Link>
              </li>
              <li>
                <Link to="/services">
                  <img src={IconServices} alt="Services Icon" className="nav-icon" />
                  <span className="item">Услуги</span>
                </Link>
              </li>
              <li>
                <Link to="/portfolio">
                  <img src={IconPortfolio} alt="Portfolio Icon" className="nav-icon" />
                  <span className="item">Портфолио</span>
                </Link>
              </li>
              <li>
                <Link to="/contacts">
                  <img src={IconContacts} alt="Contacts Icon" className="nav-icon" />
                  <span className="item">Контакты</span>
                </Link>
              </li>
              <li>
                <Link to="/reviews">
                  <img src={IconReviews} alt="Reviews Icon" className="nav-icon" />
                  <span className="item">Отзывы</span>
                </Link>
              </li>
            </ul>
            <div className="company-name">ООО "Flamingo"</div>
          </div>
        </nav>
        <main>
          <div className="section">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin/create" element={<RegisterAdmin />} />
             
            </Routes>
          </div>
        </main>
      </Router>
      <Footer />
      </UserProvider>
    </div>
  );
}

export default App;


