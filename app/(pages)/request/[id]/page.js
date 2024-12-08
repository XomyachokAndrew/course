'use client'

import { getRequest } from '@/app/api/handlers';
import { useAuth } from '@/app/context/AuthContext';
import { useEffect, useState } from 'react';

const Request = ({ params }) => {
    const [request, setRequest] = useState({
        user: []
    });
    const { user } = useAuth();
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRequest = async () => {
            if (user) {
                try {
                    const id = (await params).id;
                    const response = await getRequest(id);
                    setRequest(response);
                } catch (error) {
                    setError('Ошибка при загрузке названий рыб');
                }
            }
        };

        fetchRequest();
    }, [user]); // Добавлен user в зависимости

    const formattedDate = new Date(request.date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long', // 'short' для сокращенного названия месяца
        day: 'numeric'
    });
    
    return (
        <div className="flex items-center justify-center min-h-screen mt-16">
            <div className="max-w-2xl border rounded-lg p-6 shadow-md mb-4 bg-white min-w-96">
                <h1 className="text-3xl font-bold mb-4">Заказ: {request.title}</h1>
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