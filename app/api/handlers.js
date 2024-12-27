import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/api';

export const csrf_token = async () => {
    const response = await axios.get(`/csrf-token`, { withCredentials: true });
    return response.data.csrfToken;
};

const handleError = (error) => {
    let errorMessage;

    if (error.response) {
        console.error('Ошибка:', error.response.data);
        console.error('Статус:', error.response.status);
        console.error('Заголовки:', error.response.headers);
        errorMessage = `Ошибка ${error.response.status}: ${error.response.data.message || 'Неизвестная ошибка'}`;
    } else if (error.request) {
        console.error('Ошибка запроса:', error.request);
        errorMessage = 'Ошибка: Запрос не был выполнен. Пожалуйста, проверьте соединение.';
    } else {
        console.error('Ошибка:', error.message);
        errorMessage = `Ошибка: ${error.message}`;
    }

    // Здесь можно добавить дополнительное логирование или обработку ошибок
    throw new Error(errorMessage);
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

// Функция для получения списка рыб с сервера
export const getFishes = async () => {
    try {
        // Выполняем GET-запрос к эндпоинту '/fishes' с помощью axios
        const response = await axios.get('/fishes');
        
        // Возвращаем данные о рыбах из ответа сервера
        return response.data.data;
    } catch (error) {
        // Обрабатываем ошибку, если запрос не удался
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
        const response = await axios.get(`/user/fishes/${id}`, {
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
        const response = await axios.get(`/orders/${id}`, {
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getOrders = async () => {
    try {
        const response = await axios.get(`/orders`, {
            'withCredentials': true,
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getOrderUser = async (id) => {
    try {
        const response = await axios.get(`/user/orders/${id}`, {
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const getOrderFish = async (id) => {
    try {
        const response = await axios.get(`/fish/orders/${id}`, {
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
        const response = await axios.get(`/users`, {
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

export const postFishName = async (fishName) => {
    try {
        const csrfToken = await csrf_token();
        const response = await axios.post('/fish_names', fishName, {
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

        const response = await axios.delete(`/users/${id}`, {
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

export const deleteFishNames = async (id) => {
    try {
        const csrfToken = await csrf_token();

        const response = await axios.delete(`/fish_names/${id}`, {
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

        const response = await axios.delete(`/orders/${id}`, {
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

        const response = await axios.delete(`/photos/${id}`, {
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

        const response = await axios.delete(`/requests/${id}`, {
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

//#region UPDATE
export const putUser = async (user, id) => {
    try {
        const csrfToken = await csrf_token();
        const response = await axios.put(`users/${id}`, user, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
            withCredentials: true,
        });

        localStorage.setItem('user', response.data);
        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
//#endregion