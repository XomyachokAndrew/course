import './arrow.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';

const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-10 transition duration-300 hover:bg-opacity-100"
            onClick={onClick}
        >
            &#10094; {/* Стрелка влево */}
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-10 transition duration-300 hover:bg-opacity-100"
            onClick={onClick}
        >
            &#10095; {/* Стрелка вправо */}
        </div>
    );
};

const PhotoCard = ({ photos, fishName }) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    return (
        photos.length > 0 ? (
            photos.length > 1 ? (
                <Slider {...settings}>
                    {photos.map((photo) => (
                        <div key={photo.id}>
                            <img
                                src={photo.url}
                                alt={fishName}
                                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-md mb-4 transition-transform duration-300"
                                style={{ objectFit: 'cover' }} // Добавлено свойство objectFit
                            />
                        </div>
                    ))}
                </Slider>
            ) : (
                <div>
                    <img
                        src={photos[0].url}
                        alt={fishName}
                        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-md mb-4 transition-transform duration-300"
                        style={{ objectFit: 'cover' }} // Добавлено свойство objectFit
                    />
                </div>
            )
        ) : (
            <div>
                <img
                    src='../404.png'
                    alt={fishName}
                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-md mb-4 transition-transform duration-300"
                    style={{ objectFit: 'cover' }} // Добавлено свойство objectFit
                />
            </div>
        )
    );
};

export default PhotoCard;