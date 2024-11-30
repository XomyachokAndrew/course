'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Извлекаем пользователя из localStorage при инициализации
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(() => {
        // Извлекаем токен из localStorage при инициализации
        return localStorage.getItem('token') || null;
    });

    // Установите базовый URL для axios
    axios.defaults.baseURL = 'http://localhost:8000/api';

    const csrf_token = async () => {
        const response = await axios.get(`/csrf-token`, { withCredentials: true });
        return response.data.csrfToken;
    }

    const register = async (userData) => {
        try {
            const csrfToken = await csrf_token();
            const response = await axios.post('/register', userData,
                {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken // Добавляем CSRF-токен в заголовки
                    },
                    withCredentials: true
                });
            return response.data.user.id;
        } catch (error) {
            throw new Error(error.response.data.error || 'Login failed');
        }
    };

    const login = async (phone, password) => {
        try {
            const csrfToken = await csrf_token();
            const response = await axios.post('/login', { phone, password },
                {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken // Добавляем CSRF-токен в заголовки
                    },
                    withCredentials: true
                });
            const userData = response.data.user;
            const authToken = response.data.token;

            // Сохраняем токен и пользователя в localStorage
            localStorage.setItem('token', authToken);
            localStorage.setItem('user', JSON.stringify(userData));

            setToken(authToken);
            setUser(userData);
        } catch (error) {
            throw new Error(error.response.data.error || 'Login failed');
        }
    };

    const logout = async () => {
        try {
            const csrfToken = await csrf_token();
            await axios.delete('/logout', {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true
            });
            // Удаляем токен и пользователя из localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            setToken(null);
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    // Устанавливаем токен в заголовки для всех запросов
    axios.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // Обновляем состояние при изменении токена или пользователя
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
