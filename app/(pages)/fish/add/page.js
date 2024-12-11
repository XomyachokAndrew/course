'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFishNames, getTypes, postFishWithPhotos } from '@/app/api/handlers';
import { useAuth } from '@/app/context/AuthContext';

const AddFish = () => {
    const { user } = useAuth();
    const [fishNames, setFishNames] = useState([]);
    const [fishTypes, setFishTypes] = useState([]); // Пример типов рыбы
    const [selectedFish, setSelectedFish] = useState('');
    const [selectedType, setSelectedType] = useState(''); // Состояние для хранения выбранного типа
    const [weight, setWeight] = useState('');
    const [cost_per_kg, setCost] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [images, setImages] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await getTypes();
                setFishTypes(response);
            } catch (error) {
                setError('Ошибка при загрузке названий рыб');
            }
        };
        const fetchFishNames = async () => {
            try {
                const response = await getFishNames();
                setFishNames(response);
            } catch (error) {
                setError('Ошибка при загрузке названий рыб');
            }
        };

        fetchTypes();
        fetchFishNames();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await postFishWithPhotos(
                {
                    fish_name_id: selectedFish,
                    type_id: selectedType, // Передаем выбранный тип
                    user_id: user.id,
                    weight: weight,
                    cost_per_kg: cost_per_kg
                },
                images
            );
            router.push('/profile');

            setSuccess('Рыба успешно добавлена!');
            setSelectedFish('');
            setSelectedType(''); // Очистка выбора типа
            setCost('');
            setWeight('');
            setImages([]);
        } catch (error) {
            setError('Ошибка при добавлении рыбы. Попробуйте еще раз.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-3xl font-bold mb-4">Добавить Рыбу</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Тип рыбы:</label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        >
                            <option value="">Выберите тип</option>
                            {fishTypes.map((type) => (
                                <option key={type.name} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Название:</label>
                        <select
                            value={selectedFish}
                            onChange={(e) => setSelectedFish(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        >
                            <option value="">Выберите название</option>
                            {fishNames.map((fish) => (
                                <option key={fish.name} value={fish.id}>{fish.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Вес (кг):</label>
                        <input
                            type="number"
                            step="0.01"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            required
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Цена за килограмм:</label>
                        <input
                            type="number"
                            step="0.01"
                            value={cost_per_kg}
                            onChange={(e) => setCost(e.target.value)}
                            required
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Загрузить фото:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImages(Array.from(e.target.files))} // Сохраняем все выбранные файлы
                            multiple // Позволяем выбирать несколько файлов
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
        </div>
    );
};

export default AddFish;
