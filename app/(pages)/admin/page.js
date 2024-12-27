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
    getRequestUser, deleteRequest,
    getFishNames, deleteFishName, postFishName // Предполагается, что у вас есть функция для добавления названий рыб
} from "@/app/api/handlers";

const AdminPage = () => {
    const { user, logout, isAdmin } = useAuth();


    const [error, setError] = useState('');
    const [view, setView] = useState('users'); // Состояние для отслеживания текущего отображаемого списка
    const router = useRouter();

    useEffect(() => {
        if (!user || !isAdmin()) {
            router.push('/login'); // Перенаправление на страницу входа, если пользователь не администратор
        }
    }, [user, router]);

    const handleLogout = async () => {
        await logout();
        router.push('/'); // Перенаправление на главную страницу после выхода
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#0013FF]">Админ Панель</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
                <div className="flex justify-between mb-4">
                    <button
                        onClick={() => setView('users')}
                        className={`mr-2 ${view === 'users' ? 'font-bold' : ''}`}
                    >
                        Пользователи
                    </button>
                    <button
                        onClick={() => setView('fish')}
                        className={`${view === 'fish' ? 'font-bold' : ''}`}
                    >
                        Названия рыб
                    </button>
                </div>
                {view === 'users' ? (
                    <UsersList user={user} setError={setError} />
                ) : (
                    <FishNamesList user={user} setError={setError} />
                )}
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

const UsersList = ({ user, setError }) => {
    const [users, setUsers] = useState([]);

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
        fetchUsers(); // Получение списка пользователей
    }, [user]);

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
                    await deleteRequest(request.id);
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
        <>
            <h2 className="text-xl font-bold mb-4">Список пользователей</h2>
            <ul className="space-y-2">
                {users.length > 0 ? (
                    users.map((item) => (
                        item.id === user.id ? null : (
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
        </>
    );
};

const FishNamesList = ({ user, setError }) => {
    const [fishNames, setFishNames] = useState([]);
    const [newFishName, setNewFishName] = useState(''); // Состояние для нового названия рыбы

    useEffect(() => {
        const fetchFishNames = async () => {
            try {
                const response = await getFishNames();
                setFishNames(response);
            } catch (error) {
                console.error('Ошибка при получении названий рыб:', error);
                setError('Не удалось загрузить названия рыб');
            }
        };
        fetchFishNames(); // Получение списка названий рыб
    }, [user]);

    const handleAddFishName = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        if (!newFishName) {
            setError('Введите название рыбы');
            return;
        }
        try {
            const addedFish = await postFishName(newFishName);
            setFishNames([...fishNames, addedFish]); // Обновление состояния с новым названием
            setNewFishName(''); // Очистка поля ввода
            setError(''); // Сброс ошибки
        } catch (error) {
            console.error('Ошибка при добавлении названия рыбы:', error);
            setError('Не удалось добавить название рыбы');
        }
    };

    const handleDeleteFishName = async (fishId) => {
        try {
            await deleteFishName(fishId); // Удаление названия рыбы
            setFishNames(fishNames.filter(fish => fish.id !== fishId)); // Обновление состояния названий рыб
        } catch (error) {
            console.error('Ошибка при удалении названия рыбы:', error);
            setError('Не удалось удалить название рыбы');
        }
    };
    return (
        <>
            <h2 className="text-xl font-bold mb-4">Список названий рыб</h2>
            <form onSubmit={handleAddFishName} className="mb-4">
                <input
                    type="text"
                    value={newFishName}
                    onChange={(e) => setNewFishName(e.target.value)}
                    placeholder="Введите название рыбы"
                    className="border p-2 rounded w-full"
                />
                <button
                    type="submit"
                    className="mt-2 w-full bg-[#4CAF50] text-white font-semibold py-2 rounded-md hover:bg-green-600 transition duration-200"
                >
                    Добавить
                </button>
            </form>
            <ul className="space-y-2">
                {fishNames.length > 0 ? (
                    fishNames.map((fish) => (
                        <li key={fish.id} className="border-b py-2 flex justify-between items-center">
                            <span>{fish.name}</span>
                            <button
                                onClick={() => handleDeleteFishName(fish.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Удалить
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Нет названий рыб.</p>
                )}
            </ul>
        </>
    );
};

export default AdminPage;
