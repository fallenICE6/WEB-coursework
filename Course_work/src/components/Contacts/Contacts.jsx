import React from 'react';
import styles from './Contacts.module.css';
import IconCall from '../../icons/call.png';
import IconMail from '../../icons/mail.png';
import IconLocation from '../../icons/location.png';
import IconInst from '../../icons/inst.png';
import IconTwitter from '../../icons/twitter.png';
import IconFacebook from '../../icons/facebook.png';

function Contacts() {
  return (
    <div className={styles.contactsContainer}>
      <h2 className={styles.title}>Контакты</h2>
      <section className={styles.contacts}>
        
        <div className={styles.contactItem}>
          <img src={IconMail} alt="Email" className={styles.icon} />
          <span className={styles.value}>contact@agency.com</span>
        </div>
        <div className={styles.contactItem}>
          <img src={IconCall} alt="Телефон" className={styles.icon} />
          <span className={styles.value}>+7 (999) 737-77-00</span>
        </div>
        <div className={styles.contactItem}>
          <img src={IconLocation} alt="Адрес" className={styles.icon} />
          <span className={styles.value}>Москва, Россия</span>
        </div>

        <h3 className={styles.subtitle}>Следите за нами в соцсетях:</h3>
        <div className={styles.socials}>
          <a href="https://www.facebook.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <img src={IconFacebook} alt="Facebook" className={styles.socialIcon} />
          </a>
          <a href="https://www.twitter.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <img src={IconTwitter}  alt="Twitter" className={styles.socialIcon} />
          </a>
          <a href="https://www.instagram.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <img src={IconInst}  alt="Instagram" className={styles.socialIcon} />
          </a>
        </div>

        <h3 className={styles.subtitle}>Часы работы:</h3>
        <div className={styles.workHours}>
          <div>Пн-Пт: 9:00 - 18:00</div>
          <div>Сб: 10:00 - 14:00</div>
          <div>Вс: Выходной</div>
        </div>
      </section>
    </div>
  );
}

export default Contacts;