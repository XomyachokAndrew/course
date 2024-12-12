import axios from "axios";
import jwt from "jsonwebtoken";

axios.defaults.baseURL = 'http://localhost:8000/api';

const csrf_token = async () => {
    const response = await axios.get(`/csrf-token`, { withCredentials: true });
    return response.data.csrfToken;
};

// Функция для обработки ошибок
const handleError = (error) => {
    if (error.response) {
        console.error('Ошибка:', error.response.data);
        console.error('Статус:', error.response.status);
        console.error('Заголовки:', error.response.headers);
        throw new Error(`Ошибка ${error.response.status}: ${error.response.data.message || 'Неизвестная ошибка'}`);
    } else if (error.request) {
        console.error('Ошибка запроса:', error.request);
        throw new Error('Ошибка: Запрос не был выполнен. Пожалуйста, проверьте соединение.');
    } else {
        console.error('Ошибка:', error.message);
        throw new Error(`Ошибка: ${error.message}`);
    }
};

const refreshToken = async (token) => {
    if (!token) {
        throw new Error('Token is required for refreshing.');
    }

    // Декодируем токен, чтобы проверить его срок действия
    const decodedToken = jwt.decode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах

    // Проверяем, истек ли срок действия токена
    if (decodedToken.exp < currentTime) {

        const csrfToken = await csrf_token();

        try {
            const response = await axios.post('token/refresh', {}, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    Authorization: `Bearer ${token}`, // Добавляем токен в заголовки
                },
                withCredentials: true,
            });

            return response.data.token;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw new Error('Failed to refresh token.');
        }
    }
    return token;
};

//#region GET

//#region Fish
export const getFishNames = async () => {
    try {
        const response = await axios.get('/fish_names');
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getFishes = async () => {
    try {
        const response = await axios.get('/fishes');
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getFish = async (id) => {
    try {
        const response = await axios.get(`/fishes/${id}`);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getFishUser = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const actualToken = await refreshToken(token);
        const response = await axios.get(`/user/fishes/${id}`, {
            headers: {
                Authorization: `Bearer ${actualToken}`,
            },
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};
//#endregion

//#region Request
export const getRequests = async () => {
    try {
        const response = await axios.get(`/requests`);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getRequest = async (id) => {
    try {
        const response = await axios.get(`/requests/${id}`);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getRequestUser = async (id) => {
    try {
        const response = await axios.get(`/user/requests/${id}`);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};
//#endregion

//#region Order
export const getOrder = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const actualToken = await refreshToken(token);
        const response = await axios.get(`/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${actualToken}`,
            },
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getOrders = async () => {
    try {
        const token = localStorage.getItem('token');
        const actualToken = await refreshToken(token);
        const response = await axios.get(`/orders`, {
            headers: {
                Authorization: `Bearer ${actualToken}`,
            },
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getOrderUser = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const actualToken = await refreshToken(token);
        const response = await axios.get(`/user/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${actualToken}`,
            },
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getOrderFish = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const actualToken = await refreshToken(token);
        const response = await axios.get(`/fish/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${actualToken}`,
            },
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};
//#endregion

export const getUsers = async () => {
    try {
        const token = localStorage.getItem('token');
        const actualToken = await refreshToken(token);
        const response = await axios.get(`/users`, {
            headers: {
                Authorization: `Bearer ${actualToken}`,
            },
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getPhoto = async (id) => {
    try {
        const response = await axios.get(`photos/${id}`);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getPhotosFish = async (id) => {
    try {
        const response = await axios.get(`/fish/photos/${id}`);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getTypes = async () => {
    try {
        const response = await axios.get(`/types`);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};
//#endregion

//#region POST
export const postFishWithPhotos = async (fishData, images) => {
    const formData = new FormData();

    // Добавляем данные рыбы
    Object.keys(fishData).forEach(key => {
        formData.append(key, fishData[key]);
    });

    // Добавляем изображения
    images.forEach((image) => {
        formData.append('images[]', image);
    });

    try {
        const csrfToken = await csrf_token(); // Получаем CSRF-токен
        const token = localStorage.getItem('token');
        const actualToken = await refreshToken(token);
        // Используем axios.post для отправки данных
        const response = await axios.post('/fishes', formData, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
            withCredentials: true,
        });

        return response.data; // Возвращаем данные ответа
    } catch (error) {
        handleError(error); // Обработка ошибок
    }
};

export const postRequest = async (request) => {
    try {
        const csrfToken = await csrf_token();

        const response = await axios.post('/requests', request, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
            withCredentials: true,
        });

        return response.data; // Возвращаем данные о созданном запросе
    } catch (error) {
        handleError(error);
    }
};

export const postOrder = async (order) => {
    try {
        const csrfToken = await csrf_token();
        const token = localStorage.getItem('token');
        const actualToken = await refreshToken(token);
        const response = await axios.post('/orders', order, {
            headers: {
                Authorization: `Bearer ${actualToken}`,
                'X-CSRF-TOKEN': csrfToken,
            },
            withCredentials: true,
        });

        return response.data; // Возвращаем данные о созданном заказе
    } catch (error) {
        handleError(error);
    }
};
//#endregion

//#region DELETE
export const deleteUser = async (id) => {
    try {
        const csrfToken = await csrf_token();

        const token = localStorage.getItem('token');
        const actualToken = await refreshToken(token);

        const response = await axios.delete(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${actualToken}`,
                'X-CSRF-TOKEN': csrfToken,
            },
            withCredentials: true,
        });

        return response.data; // Возвращаем данные о результате удаления пользователя
    } catch (error) {
        handleError(error);
    }
};

export const deleteFish = async (id) => {
    try {
        const csrfToken = await csrf_token();

        const token = localStorage.getItem('token');
        const actualToken = await refreshToken(token);

        const response = await axios.delete(`/fishes/${id}`, {
            headers: {
                Authorization: `Bearer ${actualToken}`,
                'X-CSRF-TOKEN': csrfToken,
            },
            withCredentials: true,
        });

        return response.data; // Возвращаем данные о результате удаления рыбы
    } catch (error) {
        handleError(error);
    }
};

export const deleteOrder = async (id) => {
    try {
        const csrfToken = await csrf_token();

        const token = localStorage.getItem('token');
        const actualToken = await refreshToken(token);

        const response = await axios.delete(`/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${actualToken}`,
                'X-CSRF-TOKEN': csrfToken,
            },
            withCredentials: true,
        });

        return response.data; // Возвращаем данные о результате удаления заказа
    } catch (error) {
        handleError(error);
    }
};

export const deletePhoto = async (id) => {
    try {
        const csrfToken = await csrf_token();

        const token = localStorage.getItem('token');
        const actualToken = await refreshToken(token);

        const response = await axios.delete(`/photos/${id}`, {
            headers: {
                Authorization: `Bearer ${actualToken}`,
                'X-CSRF-TOKEN': csrfToken,
            },
            withCredentials: true,
        });

        return response.data; // Возвращаем данные о результате удаления фотографии
    } catch (error) {
        handleError(error);
    }
};

export const deleteRequest = async (id) => {
    try {
        const csrfToken = await csrf_token();

        const token = localStorage.getItem('token');
        const actualToken = await refreshToken(token);

        const response = await axios.delete(`/requests/${id}`, {
            headers: {
                Authorization: `Bearer ${actualToken}`,
                'X-CSRF-TOKEN': csrfToken,
            },
            withCredentials: true,
        });

        return response.data; // Возвращаем данные о результате удаления запроса
    } catch (error) {
        handleError(error);
    }
};
//#endregion
