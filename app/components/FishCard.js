'use client'

import Slider from 'react-slick'; // Импортируем Slider
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const FishCard = ({ fish }) => {
    const { user } = useAuth();
    const isThisUser = user ? (user.id == fish.user.id) : null;
    const router = useRouter();

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
    };

    const handleAddOrder = () => {
        router.push(
            '/orders/add/',
            {
                fishId: fish.id,
                fishName: fish.name,
                fishDescription: fish.description,
            },
        ); // Перенаправление на страницу добавления рыбы
    };

    return (
        <div key={fish.id} className="border rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105 bg-white">
            {fish.photos.length > 0 ? (
                fish.photos.length > 1 ? ( // Проверяем, больше ли одного фото
                    <Slider {...settings}>
                        {fish.photos.map((photo) => (
                            <div key={photo.id}>
                                <img
                                    src={photo.url}
                                    alt={fish.fish_name.name}
                                    className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div>
                        <img
                            src={fish.photos[0].url} // Отображаем единственное фото
                            alt={fish.fish_name.name}
                            className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                )
            ) : (
                <div>
                    <img
                        src='404.png' // Отображаем единственное фото
                        alt={fish.fish_name.name}
                        className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
                    />
                </div>
            )}
            <h2 className="text-xl font-bold mb-2 text-gray-800">{fish.fish_name.name}</h2>
            <p className="text-lg text-gray-700"><strong>Вес:</strong> {fish.weight} кг</p>
            <p className="text-lg text-gray-700"><strong>Стоимость за кг:</strong> {fish.cost_per_kg}₽</p>
            <p className="text-lg text-gray-700"><strong>Дата:</strong> {fish.date}</p>
            <div className="flex flex-col items-start">
                <Link href={`/fish/${fish.id}`} className="mt-4 inline-block w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200 text-center">
                    Подробнее
                </Link>
                {
                    user ? (
                        isThisUser ? null : (
                            <Link href={{
                                pathname: `/orders/add/`,
                                query: {
                                  fishId: fish.id,
                                }
                              }} className="mt-2 inline-block w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition duration-200 text-center">
                                Заказать
                            </Link>
                        )
                    ) : null
                }
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

export default FishCard;