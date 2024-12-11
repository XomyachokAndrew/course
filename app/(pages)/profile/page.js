'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import FishCard from '@/app/components/FishCard';
import RequestCard from '@/app/components/RequestCard';
import { getFishUser, getOrders, getRequestUser } from '@/app/api/handlers';

const Profile = () => {
    const { user, logout } = useAuth();
    const [fishData, setFishData] = useState([]); // Состояние для данных о рыбе
    const [requestData, setRequestData] = useState([]); // Состояние для данных о запросах
    const [activeSection, setActiveSection] = useState(true); // Состояние для активной секции
    const router = useRouter();
    const [selectedType, setSelectedType] = useState('Все'); // Состояние для выбранного типа рыбы
    const [orderCount, setOrderCount] = useState(0);

    useEffect(() => {
        if (!user) {
            router.push('/login'); // Перенаправление на страницу входа, если пользователь не аутентифицирован
        } else {
            const fetchOrderCount = async () => {
                let count = 0;
                const orders = await getOrders();

                orders.map((order) => {
                    if (order.fish.user.id == user.id) {
                        count++;
                    }
                });

                setOrderCount(count)
            };

            const fetchUserData = async () => {
                try {
                    const fishResponse = await getFishUser(user.id);
                    const requestResponse = await getRequestUser(user.id);
                    setFishData(fishResponse);
                    setRequestData(requestResponse);
                } catch (error) {
                    console.error('Ошибка при получении данных:', error);
                }
            };

            fetchOrderCount();
            fetchUserData(); // Получение данных о рыбе и запросах
        }
    }, [user, router]);

    const filteredFishes = selectedType === 'Все' ? fishData : fishData.filter(fish => fish.type == selectedType);

    return (
        <div className="flex items-center justify-center min-h-screen mt-16">
            {user ? (
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                    <ProfileSection user={user} logout={logout} router={router} orderCount={orderCount} />
                    <div className="flex justify-between mb-4">
                        <button
                            onClick={() => setActiveSection(true)}
                            className={`py-2 px-4 rounded-lg ${activeSection ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                        >
                            Рыбы
                        </button>
                        <button
                            onClick={() => setActiveSection(false)}
                            className={`py-2 px-4 rounded-lg ${!activeSection ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                        >
                            Запросы
                        </button>
                    </div>
                    {activeSection && (
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-2">Фильтровать по типу:</h2>
                            <div className="flex flex-wrap space-x-2">
                                {['Все', 'Живая', 'Охлажденная', 'Мороженная', 'Соленая', 'Сушеная', 'Жаренная'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`py-1 px-3 rounded-lg ${selectedType === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                    >
                                        {type === 'all' ? 'Все' : type.charAt(0).toUpperCase() + type.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeSection ? (
                        <FishSection fishes={filteredFishes} />
                    ) : (
                        <RequestSection requests={requestData} />
                    )}
                </div>
            ) : null}
        </div>
    );
};

const ProfileSection = ({ user, logout, router, orderCount }) => {
    const [name, setName] = useState(user.name || '');
    const [place, setPlace] = useState(user.place || '');
    const [phone, setPhone] = useState(user.phone || '');

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
        router.push('/request/add/'); // Перенаправление на страницу добавления запроса
    };

    const handleMyOrder = () => {
        router.push('/orders/'); // Перенаправление на страницу заказов
    };

    const handleOrder = () => {
        router.push('/profile/orders/'); // Перенаправление на страницу заказов
    };

    return (
        <div id='profile' className="mb-8">
            <h1 className="text-2xl font-bold mb-6 text-center text-[#0013FF]">Профиль</h1>
            {
                user.photo ? (
                    user.photo && (
                        <div className="mb-4 text-center">
                            <img
                                src={user.photo} // Укажите путь к изображению по умолчанию
                                alt="User Photo"
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />
                        </div>)
                ) :
                    <div className="mb-4 text-center">
                        <img
                            src='../../404.png' // Укажите путь к изображению по умолчанию
                            alt="User Photo"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                    </div>
            }

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
                    onClick={handleAddFish}
                >
                    Добавить рыбу
                </button>
                <button
                    className="mr-2 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-200"
                    onClick={handleMyOrder}
                >
                    Мои заказы
                </button>
                <div className="relative inline-block">
                    <button
                        className="mr-2 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-200"
                        onClick={handleOrder}
                    >
                        Заказы
                    </button>
                    {orderCount ? (
                        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {orderCount} {/* Замените orderCount на вашу переменную с количеством заказов */}
                        </span>
                    ) : null}
                </div>
                {/* Кружочек с количеством заказов */}


            </div>
        </div>
    );
};

const FishSection = ({ fishes }) => {
    return (
        <div className="max-w-2xl mx-auto mb-8">
            <h2 className="text-xl font-bold mb-4 text-center">Мой улов</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
                {fishes.length > 0 ? (
                    fishes.slice().reverse().map((fish) => (
                        <FishCard key={fish.id} fish={fish} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Нет данных о рыбе.</p>
                )}
            </div>
        </div>
    );
};


const RequestSection = ({ requests }) => {
    return (
        <div className="max-w-xl mx-auto mb-8">
            <h2 className="text-xl font-bold mb-4 text-center">Мои Запросы</h2>
            <div className="grid grid-cols-1 gap-4">
                {requests.length > 0 ? (
                    requests.map((request) => (
                        <RequestCard key={request.id} request={request} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Нет данных о запросах.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;