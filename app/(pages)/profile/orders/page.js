'use client'

import OrderCard from "@/app/components/OrderCard";
import { useAuth } from "@/app/context/AuthContext";
const { getOrderFish, getOrders } = require("@/app/api/handlers");
const { useEffect, useState } = require("react");
import { useRouter } from 'next/navigation';

const Orders = () => {
    const { user } = useAuth();
    const [myOrders, setMyOrders] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    });

    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await getOrders();

            let userOrder = [];
            orders.map((order) => {
                order.fish.user.id === user.id ? userOrder.push(order) : null;
            });

            setMyOrders(userOrder);
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
                            {myOrders.length > 0 ? (
                                myOrders.slice().reverse().map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))
                            ) : (
                                <p className="text-gray-500">У вас нет заказов.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
