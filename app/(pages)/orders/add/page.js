'use client'
import { useAuth } from '@/app/context/AuthContext';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getFish, postOrder } from '@/app/api/handlers';

const OrderPage = () => {
    const { user } = useAuth();
    const search = useSearchParams();
    const [weight, setWeight] = useState(''); // Инициализируем как строку
    const [fish, setFish] = useState({
        photos: [],
        fish_name: {},
        user: {},
        weight: 0,
        cost_per_kg: 0,
    });
    const router = useRouter();

    useEffect(() => {
        const fetchFish = async () => {
            if (user) {
                try {
                    const id = search.get('fishId');
                    const response = await getFish(id);
                    setFish(response);
                } catch (error) {
                    console.error('Ошибка при получении рыбы:', error);
                }
            }
        };

        fetchFish();
    }, [user]);

    const handleChange = (e) => {
        const value = e.target.value;
        setWeight(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postOrder({
                fish_id: fish.id,
                user_id: user.id,
                weight: weight,
            });
            setWeight('');
            router.push('/profile');
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-2xl border rounded-lg p-6 shadow-md mb-4 bg-white min-w-96">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Заказ рыбы</h1>
                    <form onSubmit={handleSubmit} method='POST' className="mb-4">
                        <div className="mb-2">
                            <label className="block text-gray-700"><strong>Рыба:</strong> {fish.fish_name.name}</label>
                            <label className="block text-gray-700"><strong>Вес:</strong> {fish.weight} кг.</label>
                            <label className="block text-gray-700"><strong>Цена за кг:</strong> {fish.cost_per_kg} руб.</label>
                            <label className="block text-gray-700"><strong>У кого заказ:</strong> {fish.user.name}</label>
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700">Сколько хотите:</label>
                            <input
                                type="number"
                                name="weight"
                                value={weight}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 p-2 w-full"
                                min="0" // Устанавливаем минимальное значение
                                max={fish.weight} // Устанавливаем максимальное значение
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Оформить заказ
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
