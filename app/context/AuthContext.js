'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null;
    });

    axios.defaults.baseURL = 'http://localhost:8000/api';

    const csrf_token = async () => {
        const response = await axios.get(`/csrf-token`, { withCredentials: true });
        return response.data.csrfToken;
    }

    const handleError = (error) => {
        let message = 'Произошла ошибка';

        if (error.response) {
            console.error('Ошибка:', error.response.data);
            console.error('Статус:', error.response.status);

            // Проверяем, есть ли сообщение об ошибке в ответе
            if (error.response.data && typeof error.response.data === 'object') {
                message = error.response.data.error || error.response.data.message || message;
            } else {
                message = 'Неизвестная ошибка от сервера';
            }
        } else if (error.request) {
            console.error('Ошибка запроса:', error.request);
            message = 'Ошибка: Запрос не был выполнен. Пожалуйста, проверьте соединение.';
        } else {
            console.error('Ошибка:', error.message);
            message = `Ошибка: ${error.message}`;
        }

        return message;
    };
    
    const register = async (userData) => {
        try {
            const csrfToken = await csrf_token();
            const response = await axios.post('/register', userData, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                },
                withCredentials: true
            });
            return response.data.user.id;
        } catch (error) {
            throw new Error(error);
        }
    };

    const login = async (phone, password) => {
        try {
            // Получаем CSRF токен
            const csrfToken = await csrf_token();
    
            // Выполняем запрос на вход в систему
            const response = await axios.post('/login', { phone, password }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                },
                withCredentials: true // Отправляем куки с запросом
            });
    
            // Извлекаем данные пользователя и токен из ответа
            const userData = response.data.user;
            const authToken = response.data.token;
    
            // Сохраняем токен и данные пользователя в localStorage
            localStorage.setItem('token', authToken);
            localStorage.setItem('user', JSON.stringify(userData));
    
            // Обновляем состояние приложения
            setToken(authToken);
            setUser(userData);
        } catch (error) {
            // Обработка ошибок
            console.error('Ошибка при входе:', handleError(error));
            throw new Error(error); // Пробрасываем ошибку дальше
        }
    };
    
    const logout = async () => {
        try {
            // Получаем CSRF токен
            const csrfToken = await csrf_token();
    
            // Выполняем запрос на выход из системы
            await axios.delete('/logout', {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    Authorization: `Bearer ${token}`, // Используем токен для авторизации
                },
                withCredentials: true // Отправляем куки с запросом
            });
    
            // Удаляем токен и данные пользователя из localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
    
            // Обновляем состояние приложения
            setToken(null);
            setUser(null);
        } catch (error) {
            // Обработка ошибок
            console.error('Ошибка при выходе:', handleError(error));
            // Удаляем токен и пользователя из localStorage в случае ошибки
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setToken(null);
            setUser(null);
        }
    };
    

    axios.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

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

    const isAdmin = () => {
        return user && user.role_id !== 1; // Если роль не 1, значит это администратор
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
