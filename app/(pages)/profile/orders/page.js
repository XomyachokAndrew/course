'use client'

import OrderCard from "@/app/components/OrderCard";
import { useAuth } from "@/app/context/AuthContext";
const { getOrderFish } = require("@/app/api/handlers");
const { useEffect, useState } = require("react");
import { useRouter, useSearchParams } from 'next/navigation';

const Catalog = () => {
    const { user } = useAuth();
    const search = useSearchParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    });

    useEffect(() => {
        const fetchOrders = async () => {
            const id = search.get('fishId');
            const response = await getOrderFish(id);
            setOrders(response);
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-16">
                    <div className="mt-6">
                        <h1 className="text-2xl font-semibold mb-2">Мои заказы</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {orders.length > 0 ? (
                                orders.slice().reverse().map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))
                            ) : (
                                <p className="text-gray-500">Нет рыб.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
