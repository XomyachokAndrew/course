'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { postRequest } from '@/app/api/handlers';

const AddFish = () => {
    const { user } = useAuth();
    const [request, setRequest] = useState({
        user_id: '',
        title: '',
        description: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setRequest(prevData => ({ ...prevData, user_id: user.id }));
        }
    }, [user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRequest(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            await postRequest(request)
            router.push('/profile');

            setSuccess('Запрос успешно добавлена!');
            setRequest({ // Сброс состояния fish
                user_id: user.id,
                title: '',
                description: ''
            });
        } catch (error) {
            setError('Ошибка при добавлении запроса. Попробуйте еще раз.');
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h1 className="text-3xl font-bold mb-4">Добавить Запрос на рыбу</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Название:</label>
                    <input
                        type="text"
                        name='title'
                        value={request.title}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Описание:</label>
                    <textarea
                        name='description'
                        value={request.description}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Добавить
                </button>
            </form>
        </div>
    );
};

export default AddFish;