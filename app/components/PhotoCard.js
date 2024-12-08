import Slider from 'react-slick'; // Импортируем Slider
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PhotoCard = ({ photos, fishName }) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
    };

    return (
        photos.length > 0 ? (
            photos.length > 1 ? ( // Проверяем, больше ли одного фото
                <Slider {...settings}>
                    {photos.map((photo) => (
                        <div key={photo.id}>
                            <img
                                src={photo.url}
                                alt={fishName}
                                className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </Slider>
            ) : (
                <div>
                    <img
                        src={photos[0].url} // Отображаем единственное фото
                        alt={fishName}
                        className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300"
                    />
                </div>
            )
        ) : (
            <div>
                <img
                    src='404.png' // Отображаем единственное фото
                    alt={fishName}
                    className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300"
                />
            </div>
        )
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

export default PhotoCard;