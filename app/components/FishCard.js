'use client'

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import PhotoCard from './PhotoCard';

const FishCard = ({ fish }) => {
    const { user } = useAuth();
    const isThisUser = user ? (user.id == fish.user.id) : null;

    return (
        <div key={fish.id} className="border rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105 bg-white">
            <PhotoCard key={fish.id} photos={fish.photos} fishName={fish.fish_name.name} />
            <h2 className="text-xl font-bold mb-2 text-gray-800">{fish.fish_name.name}</h2>
            <p className="text-lg text-gray-700"><strong>Вес:</strong> {fish.weight} кг</p>
            <p className="text-lg text-gray-700"><strong>Стоимость за кг:</strong> {fish.cost_per_kg}₽</p>
            <p className="text-lg text-gray-700"><strong>Дата:</strong> {fish.date}</p>
            <div className="flex flex-col items-start">
                <Link href={`/fish/${fish.id}`} className="mt-4 inline-block w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200 text-center">
                    Подробнее
                </Link>
                {
                    user ? (
                        isThisUser ? (
                            <Link href={{
                                pathname: `/profile/orders/`,
                                query: {
                                    fishId: fish.id,
                                }
                            }}
                                className="mt-2 inline-block w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition duration-200 text-center">
                                Заказы на рыбу
                            </Link>
                        ) : (
                            <Link href={{
                                pathname: `/orders/add/`,
                                query: {
                                    fishId: fish.id,
                                }
                            }}
                                className="mt-2 inline-block w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition duration-200 text-center">
                                Заказать
                            </Link>
                        )
                    ) : null
                }
            </div>
        </div>
    );
};



export default FishCard;