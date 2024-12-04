'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext'; // Путь к вашему AuthProvider
import { useRouter } from 'next/navigation';
import { getFishUser } from '@/app/api/handlers';
import FishCard from '@/app/components/FishCard';

const Profile = () => {
    const { token, user, logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [fishes, setFishes] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            setLoading(false);
        }
    }, [user, router]); // Добавлен user и router в зависимости

    useEffect(() => {
        const fetchFishes = async () => {
            if (user) {
                try {
                    const response = await getFishUser(user.id);
                    setFishes(response);
                } catch (error) {
                    setError('Ошибка при загрузке названий рыб');
                }
            }
        };

        fetchFishes();
    }, [user]); // Добавлен user в зависимости

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    const handleAddFish = () => {
        router.push('/fish/add/'); // Перенаправление на страницу добавления рыбы
    };

    return (
        <div className="flex items-center justify-center min-h-screen  mt-16"> {/* Добавлен отступ сверху */}
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-16">
                <h1 className="text-3xl font-bold mb-4">Профиль</h1>
                <h2 className="text-2xl font-semibold mb-2">Информация о вас:</h2>
                <p className="mb-2"><strong>Имя:</strong> {user.name}</p>
                <p className="mb-4"><strong>Телефон:</strong> {user.phone}</p>

                <div className="mb-4">
                    <button className="mr-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
                        Добавить запрос
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                        onClick={handleAddFish} // Добавлен обработчик события
                    >
                        Добавить рыбу
                    </button>
                </div>

                <div className="mt-6">
                    <h1 className="text-2xl font-semibold mb-2">Мои заказы</h1>
                    <div className="border rounded-lg p-4">
                        {/* Здесь заказы будут */}
                        <p className="text-gray-500">Здесь будут ваши заказы.</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h1 className="text-2xl font-semibold mb-2">Мои рыбы</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {fishes.length > 0 ? (
                            fishes.map((fish) => (
                                <FishCard key={fish.id} fish={fish} />
                            ))
                        ) : (
                            <p className="text-gray-500">У вас нет рыб.</p>
                        )}
                    </div>
                </div>
            </div>
            {/* Здесь можно добавить форму для редактирования профиля */}
        </div>
    );
};

export default Profile;