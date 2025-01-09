import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Register.module.css'; // Импортируем модульные стили

const RegisterAdmin = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/admin/create', { // Используйте эту конечную точку для администраторов
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            alert("Администратор успешно создан!");
            navigate('/login');
        } else {
            const error = await response.json();
            alert(error.error || "Произошла ошибка при создании администратора."); // Добавим общее сообщение об ошибке
        }
    };

    return (
        <div className={styles.form}>
            <h2>Создание администратора</h2> {/* Изменённый заголовок */}
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
                    <button className={styles.button} type="submit">Create Admin</button>
                </form>
            </div>
            <p>
                <Link to="/login"> ← Вернуться назад</Link>
            </p>
        </div>
    );
};

export default RegisterAdmin;