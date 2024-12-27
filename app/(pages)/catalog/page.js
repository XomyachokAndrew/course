'use client';

import FishCard from "@/app/components/FishCard";
import RequestCard from "@/app/components/RequestCard"; // Импортируйте компонент для отображения запросов
const { getFishes, getRequests } = require("@/app/api/handlers");
const { useEffect, useState } = require("react");

const Catalog = () => {
    const [fishes, setFishes] = useState([]);
    const [requests, setRequests] = useState([]);
    const [showFishes, setShowFishes] = useState(true); // Состояние для переключения между рыбами и запросами
    const [selectedType, setSelectedType] = useState('Все'); // Состояние для выбранного типа рыбы

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

    // Фильтрация рыб по типу
    const filteredFishes = fishes.filter(fish => fish.weight != 0 && (selectedType === 'Все' || fish.type === selectedType));

    return (
        <div className="min-h-screen flex items-center justify-center mt-24">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
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
                {showFishes && (
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
                <div className="mt-6">
                    <h1 className="text-2xl font-semibold mb-2">{showFishes ? 'Рыбы' : 'Запросы'}</h1>
                    {showFishes ? (
                        <FishSection fishes={filteredFishes} />
                    ) : (
                        <RequestSection requests={requests} />
                    )}
                </div>
            </div>
        </div>
    );
};

const FishSection = ({ fishes }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fishes.length > 0 ? (
                fishes.slice().reverse().map((fish) => (
                    <FishCard key={fish.id} fish={fish} />
                ))
            ) : (
                <p className="text-gray-500">Нет рыб.</p>
            )}
        </div>
    )
};

const RequestSection = ({ requests }) => {
    return (
        <div className="flex flex-col">
            {requests.length > 0 ? (
                requests.map((request) => (
                    <RequestCard key={request.id} request={request} />
                ))
            ) : (
                <p className="text-gray-500">Нет запросов.</p>
            )}
        </div>
    )
};

export default Catalog;
