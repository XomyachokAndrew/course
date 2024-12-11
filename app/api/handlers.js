import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

axios.defaults.baseURL = 'http://localhost:8000/api';

const csrf_token = async () => {
    const response = await axios.get(`/csrf-token`, { withCredentials: true });
    return response.data.csrfToken;
}

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

export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    try {
        const response = await axios(url, options);

        // Если токен истек, попробуйте обновить его
        if (response.status === 401) {
            const refreshResponse = await axios.post('token/refresh', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (refreshResponse.status === 200) {
                const { token: newToken } = refreshResponse.data;
                localStorage.setItem('token', newToken);

                // Повторите оригинальный запрос с новым токеном
                options.headers.Authorization = `Bearer ${newToken}`;
                return axios(url, options);
            } else {
                const router = useRouter();
                router.push('/login');
            }
        }

        return response;
    } catch (error) {
        handleError(error);
    }
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
        const response = await axios.get(`/user/fishes/${id}`);
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
export const getOrders = async () => {
    try {
        const response = await fetchWithAuth(`/orders`, {
            method: 'GET',
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getOrderUser = async (id) => {
    try {
        const response = await fetchWithAuth(`/user/orders/${id}`, {
            method: 'GET',
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getOrderFish = async (id) => {
    try {
        const response = await fetchWithAuth(`/fish/orders/${id}`, {
            method: 'GET',
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
        const response = await fetchWithAuth(`/users`, {
            method: 'GET',
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

        const response = await axios.post('/orders', order, {
            headers: {
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

        const response = await fetchWithAuth(`/users/${id}`, {
            method: 'DELETE',
            headers: {
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
        const response = await axios.delete(`/fishes/${id}`, {
            headers: {
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
        const response = await fetchWithAuth(`/orders/${id}`, {
            method: 'DELETE',
            headers: {
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
        const response = await fetchWithAuth(`/photos/${id}`, {
            method: 'DELETE',
            headers: {
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
        const response = await fetchWithAuth(`/requests/${id}`, {
            method: 'DELETE',
            headers: {
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
