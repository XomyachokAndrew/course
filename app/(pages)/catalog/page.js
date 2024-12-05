'use client'

import FishCard from "@/app/components/FishCard";
import RequestCard from "@/app/components/RequestCard"; // Импортируйте компонент для отображения запросов
const { getFishes, getRequests } = require("@/app/api/handlers");
const { useEffect, useState } = require("react");

const Catalog = () => {
    const [fishes, setFishes] = useState([]);
    const [requests, setRequests] = useState([]);
    const [showFishes, setShowFishes] = useState(true); // Состояние для переключения между рыбами и запросами

    useEffect(() => {
        const fetchFishes = async () => {
            const response = await getFishes();
            setFishes(response);
        }

        const fetchRequests = async () => {
            const response = await getRequests(); // Предполагается, что у вас есть функция для получения запросов
            setRequests(response);
        }

        fetchFishes();
        fetchRequests();
    }, []);

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen mt-16">
                <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-16">
                    <div className="flex justify-between mb-4">
                        <button
                            onClick={() => setShowFishes(true)}
                            className={`py-2 px-4 rounded-lg ${showFishes ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                        >
                            Рыбы
                        </button>
                        <button
                            onClick={() => setShowFishes(false)}
                            className={`py-2 px-4 rounded-lg ${!showFishes ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                        >
                            Запросы
                        </button>
                    </div>
                    <div className="mt-6">
                        <h1 className="text-2xl font-semibold mb-2">{showFishes ? 'Рыбы' : 'Запросы'}</h1>
                        {showFishes ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {fishes.length > 0 ? (
                                    fishes.slice().reverse().map((fish) => (
                                        <FishCard key={fish.id} fish={fish} />
                                    ))
                                ) : (
                                    <p className="text-gray-500">Нет рыб.</p>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                {requests.length > 0 ? (
                                    requests.map((request) => (
                                        <RequestCard key={request.id} request={request} /> // Используйте компонент для отображения запросов
                                    ))
                                ) : (
                                    <p className="text-gray-500">Нет запросов.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
