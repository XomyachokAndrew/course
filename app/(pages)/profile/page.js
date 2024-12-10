'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import FishCard from '@/app/components/FishCard';
import RequestCard from '@/app/components/RequestCard';
import { getFishUser, getRequestUser } from '@/app/api/handlers';

const Profile = () => {
    const { user, logout } = useAuth();
    const [fishData, setFishData] = useState([]); // Состояние для данных о рыбе
    const [requestData, setRequestData] = useState([]); // Состояние для данных о запросах
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login'); // Перенаправление на страницу входа, если пользователь не аутентифицирован
        } else {
            // Заполнение полей данными пользователя
            const fetchUserData = async () => {
                try {
                    const fishResponse = await getFishUser(user.id); // Предполагается, что у вас есть id пользователя
                    const requestResponse = await getRequestUser(user.id);
                    setFishData(fishResponse);
                    setRequestData(requestResponse);
                } catch (error) {
                    console.error('Ошибка при получении данных:', error);
                }
            };
            fetchUserData(); // Получение данных о рыбе и запросах
        }
    }, [user, router]);

    return (
        <div className="flex items-center justify-center min-h-screen mt-16 ml-12">
            {/* Секция профиля */}
            <ProfileSection user={user} logout={logout} router={router} />

            {/* Секция с FishCard */}
            <FishSection fishes={fishData} />

            {/* Секция с RequestCard */}
            <RequestSection requests={requestData} />
        </div>
    );
};

const ProfileSection = ({ user, logout, router }) => {
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        setName(user.name);
        setPlace(user.place);
        setPhone(user.phone);
    }, [user, router]);

    const handleLogout = async () => {
        await logout();
        router.push('/login'); // Перенаправление на главную страницу после выхода
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        // Здесь вы можете добавить логику для обновления профиля пользователя
        console.log('Обновление профиля:', { name, place, phone });
    };

    const handleAddFish = () => {
        router.push('/fish/add/'); // Перенаправление на страницу добавления рыбы
    };

    const handleAddRequest = () => {
        router.push('/request/add/'); // Перенаправление на страницу добавления рыбы
    };

    const handleOrder = () => {
        router.push('/orders/'); // Перенаправление на страницу добавления рыбы
    };


    return (
        <div id='profile' className="bg-white p-8 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-bold mb-6 text-center text-[#0013FF]">Профиль</h1>

            {/* Вывод фото пользователя */}
            {user.photo && (
                <div className="mb-4 text-center">
                    <img
                        src={user.photo} // Предполагается, что путь к изображению относительный
                        alt="User Photo"
                        className="w-24 h-24 rounded-full mx-auto mb-4" // Стили для изображения
                    />
                </div>
            )}

            <form onSubmit={handleUpdateProfile}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">ФИО:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#0066FF]"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Место:</label>
                    <input
                        type="text"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#0066FF]"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Номер телефона:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#0066FF]"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#0066FF] text-white font-semibold py-2 rounded-md hover:bg-[#0013FF] transition duration-200"
                >
                    Обновить профиль
                </button>
            </form>
            <div className="mt-4 text-center">
                <button onClick={handleLogout} className="text-[#0066FF] hover:text-[#0013FF] transition duration-200">
                    Выйти
                </button>
            </div>
            <div className="mt-2 mb-4">
                <button
                    className="mr-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                    onClick={handleAddRequest}
                >
                    Добавить запрос
                </button>
                <button
                    className="mr-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    onClick={handleAddFish} // Добавлен обработчик события
                >
                    Добавить рыбу
                </button>
            </div>
            <button
                className="mr-2 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-200"
                onClick={handleOrder} // Добавлен обработчик события
            >
                Мои заказы
            </button>
        </div>
    );
}

const FishSection = ({ fishes }) => {
    return (
        <div className="max-w-2xl mx-auto ml-16 mt-12 h-96">
            <h2 className="text-xl font-bold mb-4 text-center">Мой улов</h2>
            <div className="grid grid-cols-2 gap-4 auto-rows-fr"> {/* Две колонки для рыбы */}
                {fishes.length > 0 ? (
                    fishes.slice().reverse().map((fish) => (
                        <FishCard key={fish.id} fish={fish} /> // Предполагается, что у каждого объекта fish есть уникальный id
                    ))
                ) : (
                    <p className="text-center text-gray-500">Нет данных о рыбе.</p>
                )}
            </div>
        </div>
    );
}

const RequestSection = ({ requests }) => {
    return (
        <div className="max-w-xl mx-auto ml-16 mt-12 h-96">
            <h2 className="text-xl font-bold mb-4 text-center">Мои Запросы</h2>
            <div className="grid grid-cols-1 gap-4"> {/* Один элемент в строке для запросов */}
                {requests.length > 0 ? (
                    requests.map((request) => (
                        <RequestCard key={request.id} request={request} /> // Предполагается, что у каждого объекта request есть уникальный id
                    ))
                ) : (
                    <p className="text-center text-gray-500">Нет данных о запросах.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;