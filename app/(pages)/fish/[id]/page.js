'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext'; // Путь к вашему AuthProvider
import { useRouter } from 'next/navigation';
import { getFish } from '@/app/api/handlers';
import Link from 'next/link';
import PhotoCard from '@/app/components/PhotoCard';

const Fish = ({ params }) => {
    const { user } = useAuth();
    const [fish, setFish] = useState({
        photos: [],
        fish_name: [],
        user: [],
    });

    const isThisUser = user ? (user.id == fish.user.id) : null;

    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchFish = async () => {
            try {
                const id = (await params).id;
                const response = await getFish(id);
                setFish(response);
            } catch (error) {
                setError('Ошибка при загрузке названий рыб');
            }
        };

        fetchFish();
    }, [user]); // Добавлен user в зависимости

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4"><strong>Рыба:</strong> {fish.fish_name.name}</h1>
                <PhotoCard key={fish.id} photos={fish.photos} fishName={fish.fish_name.name} />
                <p className="text-lg text-gray-700"><strong>Вес:</strong> {fish.weight} кг</p>
                <p className="text-lg text-gray-700"><strong>Стоимость за кг:</strong> {fish.cost_per_kg}₽</p>
                <p className="text-lg text-gray-700"><strong>Дата поимки:</strong> {fish.date}</p>
                <p className="text-lg text-gray-700"><strong>Кто продает:</strong> {fish.user.name}</p>
                <p className="text-lg text-gray-700"><strong>Где продает:</strong> {fish.user.place}</p>
                <div className="flex flex-col items-start">
                    {user && !isThisUser && (
                        <Link href={{
                            pathname: `/orders/add/`,
                            query: {
                                fishId: fish.id,
                            }
                        }}
                            className="mt-2 inline-block w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition duration-200 text-center">
                            Заказать
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Fish;