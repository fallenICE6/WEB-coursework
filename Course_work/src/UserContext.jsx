import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Проверяем наличие куки при инициализации состояния
        const userCookie = Cookies.get('user');
        return userCookie ? JSON.parse(userCookie) : null;
    });

    const login = (userData) => {
        setUser(userData);
        Cookies.set('user', JSON.stringify(userData), { expires: 1 }); // Хранить куки 7 дней
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('user');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};