import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../UserContext'; // Импортируйте контекст пользователя
import styles from './Login.module.css';

const Login = () => {
    const { login } = useUser(); // Получаем функцию login из контекста
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const user = await response.json();
            login(user); // Вызываем функцию login из контекста
            navigate('/'); // Перенаправляем на главную страницу
        } else {
            const error = await response.json();
            alert(error.error); // Отображаем сообщение об ошибке
        }
    };

    return (
        <div className={styles.form}>
            <h2>Вход</h2>
            <div className={styles.form1}>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Пароль" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button className={styles.button} type="submit">Войти</button>
            </form>
            </div>
            <p>
                Если нет аккаунта, то <Link to="/register">зарегистрируйтесь</Link>
            </p>
        </div>
    );
};

export default Login;