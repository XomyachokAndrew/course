'use client'

import FishCard from "@/app/components/FishCard";

const { getFishes } = require("@/app/api/handlers");
const { useEffect, useState } = require("react");

const Catalog = () => {
    const [fishes, setFishes] = useState([]);
    useEffect(() => {
        const fetchFishes = async () => {
            const response = await getFishes();
            setFishes(response);
        }

        fetchFishes();
    });

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen  mt-16"> {/* Добавлен отступ сверху */}
                <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-16">
                    <div className="mt-6">
                        <h1 className="text-2xl font-semibold mb-2">Рыбы</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-3 gap-4">
                            {fishes.length > 0 ? (
                                fishes.map((fish) => (
                                    <FishCard key={fish.id} fish={fish} />
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