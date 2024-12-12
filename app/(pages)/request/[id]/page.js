'use client'

import { getRequest } from '@/app/api/handlers';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Request = ({ params }) => {
    const [request, setRequest] = useState({
        user: []
    });
    const { user } = useAuth();
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const id = (await params).id;
                const response = await getRequest(id);
                setRequest(response);
            } catch (error) {
                setError('Ошибка при загрузке названий рыб');
            }
        };

        fetchRequest();
    }, [user]); // Добавлен user в зависимости

    const handleBack = async () => {
        router.back();
    };

    const formattedDate = new Date(request.date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long', // 'short' для сокращенного названия месяца
        day: 'numeric'
    });

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="max-w-2xl w-full border rounded-lg p-6 shadow-md mb-4 bg-white min-w-96">
                <div className="flex justify-between mb-4">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
                    >
                        Назад
                    </button>
                </div>
                <h1 className="text-3xl font-bold mb-4">{request.title}</h1>
                <div className="mt-6">
                    <div className="border-t border-gray-200 mt-2 pt-2">
                        <div className="text-gray-600 break-words">
                            {request.description}
                        </div>
                    </div>
                    <div className="border-t border-gray-200 mt-2 pt-2">
                        <div className="text-gray-600">
                            <p><strong>Номер телефона: </strong>{request.user.number}</p>
                            <p><strong>ФИО: </strong>{request.user.name}</p>
                            <p><strong>Где живет: </strong>{request.user.place}</p>
                            <p><strong>Когда оставлен запрос: </strong>{formattedDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Request;
