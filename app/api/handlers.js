import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/api';

const csrf_token = async () => {
    const response = await axios.get(`/csrf-token`, { withCredentials: true });
    return response.data.csrfToken;
}

export const getFishNames = async () => {
    try {
        const response = await axios.get('/fish_names');
        const options = response.data.data;
        return options;
    } catch (error) {
        console.error('qwe', error);
    }
};

export const postFish = async (fish) => {
    try {
        const csrfToken = await csrf_token();
        const token = localStorage.getItem('token');
        const response = await axios.post('/fishes', fish, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        });
        const options = response.data.data;
        return options;
    } catch (error) {
        console.error('qwe', error);
    }
};

export const getFish = async () => {
    try {
        const response = await axios.get('/fishes');
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