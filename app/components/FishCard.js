'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import PhotoCard from './PhotoCard';
import { useRouter } from 'next/navigation'; // Импортируйте useRouter для навигации
import { deleteFish, getFish, getOrderFish, getPhotosFish, deletePhoto } from '../api/handlers';

const FishCard = ({ fish }) => {
    const { user } = useAuth();
    const isThisUser = user ? (user.id === fish.user.id) : null;
    const router = useRouter(); // Инициализируем useRouter

    const handleDelete = async (id) => {
        if (confirm('Вы уверены, что хотите удалить эту рыбу?')) {
            try {
                const fishForDelete = await getFish(id);

                if (fishForDelete) {
                    const photos = await getPhotosFish(fishForDelete.id);

                    photos.map(async (photo) => {
                        await deletePhoto(photo.id);
                    });

                    const ordersFish = await getOrderFish(fishForDelete.id);

                    if (ordersFish) {
                        ordersFish.map(async (order) => {
                            await deleteOrder(order.id);
                        });
                    }

                    await deleteFish(fishForDelete.id);
                }

                router.push('/profile'); // Перенаправление после удаления
            } catch (error) {
                console.error('Ошибка при удалении рыбы:', error);
                alert('Произошла ошибка при удалении рыбы. Попробуйте еще раз.');
            }
        }
    };

    return (
        <div
            key={fish.id}
            className="border rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105 bg-white max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl"
            style={{ maxWidth: '272px', maxHeight: '600px', overflow: 'hidden' }} // Добавлено overflow: hidden
        >
            <PhotoCard key={fish.id} photos={fish.photos} fishName={fish.fish_name.name} />
            <h2 className="text-xl font-bold mb-2 text-gray-800">{fish.fish_name.name}</h2>
            <p className="text-lg text-gray-700"><strong>Вес:</strong> {fish.weight} кг</p>
            <p className="text-lg text-gray-700"><strong>Тип:</strong> {fish.type}</p>
            <p className="text-lg text-gray-700"><strong>Стоимость за кг:</strong> {fish.cost_per_kg}₽</p>
            <p className="text-lg text-gray-700"><strong>Дата:</strong> {fish.date}</p>
            <div className="flex flex-col items-start">
                <Link href={`/fish/${fish.id}`} className="mt-2 inline-block w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200 text-center">
                    Подробнее
                </Link>
                {
                    user ? (
                        isThisUser ? (
                            <button
                                onClick={() => handleDelete(fish.id)}
                                className="inline-block w-full text-red-500 py-2 hover:text-red-700" // Уменьшено py
                            >
                                Удалить
                            </button>
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
