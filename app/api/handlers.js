import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/api';

const csrf_token = async () => {
    const response = await axios.get(`/csrf-token`, { withCredentials: true });
    return response.data.csrfToken;
}

//#region GET

//#region Fish
export const getFishNames = async () => {
    try {
        const response = await axios.get('/fish_names');
        const options = response.data.data;
        return options;
    } catch (error) {
        console.error('qwe', error);
    }
};

export const getFishes = async () => {
    try {
        const response = await axios.get('/fishes');
        const options = response.data.data;
        return options;
    } catch (error) {
        console.error('qwe', error);
    }
};

export const getFish = async (id) => {
    try {
        const response = await axios.get(`/fishes/${id}`);
        const options = response.data.data;
        return options;
    } catch (error) {
        console.error('qwe', error);
    }
};

export const getFishUser = async (id) => {
    try {
        const response = await axios.get(`/user/fishes/${id}`);
        const options = response.data.data;
        return options;
    } catch (error) {
        console.error('qwe', error);
    }
};
//#endregion

//#region Request
export const getRequests = async () => {
    try {
        const response = await axios.get(`/requests`);
        const options = response.data.data;
        return options;
    } catch (error) {
        console.error('qwe', error);
    }
};

export const getRequest = async (id) => {
    try {
        const response = await axios.get(`/requests/${id}`);
        const options = response.data.data;
        return options;
    } catch (error) {
        console.error('qwe', error);
    }
};

export const getRequestUser = async (id) => {
    try {
        const response = await axios.get(`/user/requests/${id}`);
        const options = response.data.data;
        return options;
    } catch (error) {
        console.error('qwe', error);
    }
};
//#endregion

//#region Order
export const getOrderUser = async (id) => {
    try {
        const response = await axios.get(`/user/orders/${id}`);
        const options = response.data.data;
        return options;
    } catch (error) {
        console.error('qwe', error);
    }
};

export const getOrderFish = async (id) => {
    try {
        const response = await axios.get(`/fish/orders/${id}`);
        const options = response.data.data;
        return options;
    } catch (error) {
        console.error('qwe', error);
    }
};
//#endregion

export const getUsers = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        const options = response.data.data;
        return options;
    } catch (error) {
        console.error('qwe', error);
    }
};

export const getPhotosFish = async (id) => {
    try {
        const response = await axios.get(`/fish/photos/${id}`);
        const options = response.data.data;
        return options;
    } catch (error) {
        console.error('qwe', error);
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
        const csrfToken = await csrf_token();
        const token = localStorage.getItem('token');
        const response = await axios.post('/fishes', formData, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', // Устанавливаем заголовок для отправки форм
            },
            withCredentials: true,
        });

        return response.data; // Возвращаем данные о созданной рыбе и загруженных фотографиях
    } catch (error) {
        console.error('Ошибка при отправке данных:', error.response?.data || error.message);
        throw error; // Пробрасываем ошибку для дальнейшей обработки
    }
};

export const postRequest = async (request) => {
    try {
        const csrfToken = await csrf_token();
        const token = localStorage.getItem('token');
        const response = await axios.post('/requests', request, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        return response.data; // Возвращаем данные о созданной рыбе и загруженных фотографиях
    } catch (error) {
        console.error('Ошибка при отправке данных:', error.response?.data || error.message);
        throw error; // Пробрасываем ошибку для дальнейшей обработки
    }
};

export const postOrder = async (order) => {
    try {
        const csrfToken = await csrf_token();
        const token = localStorage.getItem('token');
        const response = await axios.post('/orders', order, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при отправке данных:', error.response?.data || error.message);
        throw error; // Пробрасываем ошибку для дальнейшей обработки
    }
};
//#endregion

//#region DELETE

export const deleteUser = async (id) => {
    try {
        const csrfToken = await csrf_token();
        const token = localStorage.getItem('token');
        const response = await axios.delete(`/users/${id}`, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        return response.data; // Возвращаем данные о созданной рыбе и загруженных фотографиях
    } catch (error) {
        console.error('Ошибка при удалении User:', error.response?.data || error.message);
        throw error; // Пробрасываем ошибку для дальнейшей обработки
    }
}

export const deleteFish = async (id) => {
    try {
        const csrfToken = await csrf_token();
        const token = localStorage.getItem('token');
        const response = await axios.delete(`/fishes/${id}`, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        console.log(response);

        return response.data; // Возвращаем данные о созданной рыбе и загруженных фотографиях
    } catch (error) {
        console.error('Ошибка при удалении Fish:', error.response?.data || error.message);
        throw error; // Пробрасываем ошибку для дальнейшей обработки
    }
}

export const deleteOrder = async (id) => {
    try {
        const csrfToken = await csrf_token();
        const token = localStorage.getItem('token');
        const response = await axios.delete(`/orders/${id}`, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        return response.data; // Возвращаем данные о созданной рыбе и загруженных фотографиях
    } catch (error) {
        console.error('Ошибка при удалении Order:', error.response?.data || error.message);
        throw error; // Пробрасываем ошибку для дальнейшей обработки
    }
}

export const deletePhoto = async (id) => {
    try {
        const csrfToken = await csrf_token();
        const token = localStorage.getItem('token');
        const response = await axios.delete(`/photos/${id}`, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        return response.data; // Возвращаем данные о созданной рыбе и загруженных фотографиях
    } catch (error) {
        console.error('Ошибка при удалении Photo:', error.response?.data || error.message);
        throw error; // Пробрасываем ошибку для дальнейшей обработки
    }
}

export const deleteRequest = async (id) => {
    try {
        const csrfToken = await csrf_token();
        const token = localStorage.getItem('token');
        const response = await axios.delete(`/requests/${id}`, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        return response.data; // Возвращаем данные о созданной рыбе и загруженных фотографиях
    } catch (error) {
        console.error('Ошибка при удалении Request:', error.response?.data || error.message);
        throw error; // Пробрасываем ошибку для дальнейшей обработки
    }
}

//#endregion