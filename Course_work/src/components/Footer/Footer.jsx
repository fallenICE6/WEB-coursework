import React from 'react';
import Logo from '../logo.jpg'; // Путь к логотипу
import styles from './Footer.module.css'; // Путь к CSS

export default function Footer({ className }) {
    return (
        <div className={className}>
            <footer className={styles.container}>
                <div className={styles.logo}>
                    <img src={Logo} alt="Логотип" />
                </div>
                <div className={styles.content}>
                    <p>&copy; 2025 Рекламное агентство ООО "Flamingo". Все права защищены. Все торговые марки являются собственностью соответствующих владельцев в России и других странах.</p>
                    <div className={styles.background_content}>
                        <a href="#" className={`${styles.link} ${styles.highlightedLink}`}>
                            Программа лояльности
                        </a>
                        <p>|</p>
                        <a href="#" className={`${styles.link} ${styles.highlightedLink}`}>
                            Публичная оферта
                        </a>
                        <p>|</p>
                        <a href="#" className={`${styles.link} ${styles.highlightedLink}`}>
                            Политика конфиденциальности
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}