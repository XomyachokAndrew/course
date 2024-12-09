'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext'; // Путь к вашему AuthProvider
import { useRouter } from 'next/navigation';
import { getFishUser, getRequestUser } from '@/app/api/handlers';
import FishCard from '@/app/components/FishCard';
import RequestCard from '@/app/components/RequestCard';

const Profile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [fishes, setFishes] = useState([]);
    const [requests, setRequests] = useState([]);
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
        const fetchData = async (fetchFunction, setData, errorMessage) => {
            try {
                const response = await fetchFunction(user.id);
                setData(response);
            } catch (error) {
                setError(errorMessage);
            }
        };

        fetchData(getFishUser, setFishes, 'Ytn');
        fetchData(getRequestUser, setRequests, 'Ytn');
    }, [user]); // Добавлен user в зависимости

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen mt-16"> {/* Добавлен отступ сверху */}

            <ProfileInfo user={user} router={router} />

            <RequestSection requests={requests} />

            <FishSection fishes={fishes} />

        </div>
    );
};

const ProfileInfo = ({ user, router }) => {

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
        <div className='absolute left-0 top-0'>
            <div className=" max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md ml-16 mt-24">
                <h1 className="text-3xl font-bold mb-4">Профиль</h1>
                <h2 className="text-2xl font-semibold mb-2">Информация о вас:</h2>
                <p className="mb-2"><strong>Имя:</strong> {user.name}</p>
                <p className="mb-4"><strong>Телефон:</strong> {user.phone}</p>

                <div className="mb-4">
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
                    <button
                        className="mr-2 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-200"
                        onClick={handleOrder} // Добавлен обработчик события
                    >
                        Мои заказы
                    </button>
                </div>
            </div>
        </div>

    );
};

const RequestSection = ({ requests }) => {
    return (
        <div className='left-0'>
            <div className='max-w-2xl mx-auto ml-16 mt-12 h-96'>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold mb-2">Мои запросы</h1>
                    <div className="border rounded-lg p-4 h-full flex flex-col justify-between">
                        {
                            requests.length > 0 ? (
                                requests.slice().reverse().map((request) => ( // Сортировка в обратном порядке
                                    <RequestCard key={request.id} request={request} />
                                ))
                            ) : (
                                <p className="text-gray-500">Здесь будут ваши заказы.</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>

    );
};

const FishSection = ({ fishes }) => {
    return (
        <div className='max-w-3xl mx-auto h-96 mt-12'> {/* Увеличена максимальная ширина */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="mt-6">
                    <h1 className="text-2xl font-semibold mb-2">Мой улов</h1>
                    <div className="border rounded-lg p-4 h-full flex flex-col justify-between">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                            {fishes.length > 0 ? (
                                fishes.slice().reverse().map((fish) => ( // Сортировка в обратном порядке
                                    <FishCard key={fish.id} fish={fish} />
                                ))
                            ) : (
                                <p className="text-gray-500">У вас нет рыб.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;