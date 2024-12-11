'use client';
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import {
    getOrderFish,
    getUsers, deleteUser,
    getFishUser, deleteFish,
    getOrderUser, deleteOrder,
    getPhotosFish, deletePhoto,
    getRequestUser, deleteRequest
} from "@/app/api/handlers";

const AdminPage = () => {
    const { user, logout, isAdmin } = useAuth();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response);
            } catch (error) {
                console.error('Ошибка при получении пользователей:', error);
                setError('Не удалось загрузить пользователей');
            }
        };

        if (!user || !isAdmin()) {
            router.push('/login'); // Перенаправление на страницу входа, если пользователь не администратор
        } else {
            fetchUsers(); // Получение списка пользователей
        }
    }, [user, router]);

    const handleLogout = async () => {
        await logout();
        router.push('/'); // Перенаправление на главную страницу после выхода
    };

    const handleDeleteUser = async (userId) => {
        try {
            const fishes = await getFishUser(userId);

            if (fishes) {
                fishes.map(async (fish) => {
                    const photos = await getPhotosFish(fish.id);

                    photos.map(async (photo) => {
                        await deletePhoto(photo.id);
                    });

                    const ordersFish = await getOrderFish(fish.id);

                    if (ordersFish) {
                        ordersFish.map(async (order) => {
                            await deleteOrder(order.id);
                        });
                    }

                    await deleteFish(fish.id);
                });
            }

            const orders = await getOrderUser(userId);

            if (orders) {
                orders.map(async (order) => {
                    await deleteOrder(order.id);
                });
            }

            const requests = await getRequestUser(userId);

            if (requests) {
                requests.map(async (request) => {
                    deleteRequest(request.id);
                });
            }

            await deleteUser(userId); // Предполагается, что у вас есть функция для удаления пользователя
            setUsers(users.filter(user => user.id !== userId)); // Обновление состояния пользователей
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
            setError('Не удалось удалить пользователя');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#0013FF]">Админ Панель</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
                <h2 className="text-xl font-bold mb-4">Список пользователей</h2>
                <ul className="space-y-2">
                    {users.length > 0 ? (
                        users.map((item) => (
                            item.id == user.id ? null : (
                                <li key={item.id} className="border-b py-2 flex justify-between items-center">
                                    <span>{item.name} - {item.number}</span>
                                    <button
                                        onClick={() => handleDeleteUser(item.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Удалить
                                    </button>
                                </li>
                            )

                        ))
                    ) : (
                        <p className="text-center text-gray-500">Нет пользователей.</p>
                    )}
                </ul>
                <button
                    onClick={handleLogout}
                    className="mt-4 w-full bg-[#FF4D4D] text-white font-semibold py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                    Выйти
                </button>
            </div>
        </div>
    );
};

export default AdminPage;