// ImagePopup.js
import React from 'react';
import Slider from 'react-slick';
import { FaTimes } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classes from './ImagePopup.module.css';

const ImagePopup = ({ images, closePopup }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className={classes.popup}>
            <div className={classes.popupContent}>
                <FaTimes className={classes.closeIcon} onClick={closePopup} />
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index} className={classes.imageContainer}>
                            <img src={image} alt={`Slide ${index}`} className={classes.image} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ImagePopup;
