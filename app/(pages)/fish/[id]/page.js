'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext'; // Путь к вашему AuthProvider
import { useRouter } from 'next/navigation';
import { getFish } from '@/app/api/handlers';
import Link from 'next/link';
import Slider from 'react-slick'; // Импортируем Slider
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Fish = ({ params }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [fish, setFish] = useState({
        photos: [],
        fish_name: [],
        user: [],
    });

    const isThisUser = user ? (user.id == fish.user.id) : null;

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
        const fetchFish = async () => {
            if (user) {
                try {
                    const id = (await params).id;
                    const response = await getFish(id);
                    setFish(response);
                } catch (error) {
                    setError('Ошибка при загрузке названий рыб');
                }
            }
        };

        fetchFish();
    }, [user]); // Добавлен user в зависимости

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
    };

    return (
        <div className="flex items-center justify-center min-h-screen mt-16">
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4"><strong>Рыба:</strong> {fish.fish_name.name}</h1>
                {fish.photos.length > 0 ? (
                    fish.photos.length > 1 ? (
                        <Slider {...settings}>
                            {fish.photos.map((photo) => (
                                <div key={photo.id}>
                                    <img
                                        src={photo.url}
                                        alt={fish.fish_name.name}
                                        className="w-full object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div>
                            <img
                                src={fish.photos[0].url}
                                alt={fish.fish_name.name}
                                className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    )
                ) : (
                    <div>
                        <img
                            src='404.png'
                            alt="Изображение не найдено"
                            className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                )}
                <p className="text-lg text-gray-700"><strong>Вес:</strong> {fish.weight} кг</p>
                <p className="text-lg text-gray-700"><strong>Стоимость за кг:</strong> {fish.cost_per_kg}₽</p>
                <p className="text-lg text-gray-700"><strong>Дата поимки:</strong> {fish.date}</p>
                <p className="text-lg text-gray-700"><strong>Кто продает:</strong> {fish.user.name}</p>
                <p className="text-lg text-gray-700"><strong>Где продает:</strong> {fish.user.place}</p>
                <div className="flex flex-col items-start">
                    {user && !isThisUser && (
                        <Link href={{
                            pathname: `/orders/add/`,
                            query: {
                                fishId: fish.id,
                            }
                        }}
                            className="mt-2 inline-block w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition duration-200 text-center">
                            Заказать
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

// Компонент для кнопки "Назад"
const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} absolute z-10`}
            style={{ ...style, left: "-12px", display: "block", background: "black", borderRadius: "50%" }} // Изменено на left: "30px"
            onClick={onClick}
        >
            <span style={{ color: "white", padding: "10px" }}>{"<"}</span>
        </div>
    );
};

// Компонент для кнопки "Вперед"
const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} absolute z-10`}
            style={{ ...style, right: "-12px", display: "block", background: "black", borderRadius: "50%" }} // Изменено на right: "30px"
            onClick={onClick}
        >
            <span style={{ color: "white", padding: "10px" }}>{">"}</span>
        </div>
    );
};

export default Fish;