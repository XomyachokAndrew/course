import Slider from 'react-slick'; // Импортируем Slider
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FishCard = ({ fish }) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
    };

    return (
        <div key={fish.id} className="border rounded-lg p-4 shadow-md">
            {fish.photos.length > 0 ? (
                fish.photos.length > 1 ? ( // Проверяем, больше ли одного фото
                    <Slider {...settings}>
                        {fish.photos.map((photo) => (
                            <div key={photo.id}>
                                <img
                                    src={photo.url}
                                    alt={fish.fish_name.name}
                                    className="w-full h-32 object-cover rounded-md mb-2"
                                />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div>
                        <img
                            src={fish.photos[0].url} // Отображаем единственное фото
                            alt={fish.fish_name.name}
                            className="w-full h-32 object-cover rounded-md mb-2"
                        />
                    </div>
                )
            ) : (
                <p>Нет доступных фото</p>
            )}
            <h2 className="text-lg font-bold">{fish.fish_name.name}</h2>
            <p><strong>Вес:</strong> {fish.weight} кг</p>
            <p><strong>Стоимость за кг:</strong> {fish.cost_per_kg} ₽</p>
            <p><strong>Дата:</strong> {fish.date}</p>
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