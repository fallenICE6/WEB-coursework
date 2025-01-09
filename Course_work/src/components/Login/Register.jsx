import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Register.module.css'; // Импортируем модульные стили

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            alert("Регистрация прошла успешно!");
            navigate('/login'); // Перенаправляем на страницу входа
        } else {
            const error = await response.json();
            alert(error.error); // Отображаем сообщение об ошибке
        }
    };

    return (
        <div className={styles.form}>
            <h2>Регистрация</h2>
            <div className={styles.form1}>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Имя пользователя" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
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
                <button className={styles.button} type="submit">Зарегистрироваться</button>
            </form>
            </div>
            <p>
                <Link to="/login"> ← Вернуться назад</Link>
            </p>
        </div>
    );
};

export default Register;