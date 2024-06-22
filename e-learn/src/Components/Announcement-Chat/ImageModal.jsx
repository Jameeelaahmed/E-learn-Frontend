import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import img1 from '../../assets/avatar.jpg';
import img2 from '../../assets/pexels-stanley-morales-1454360.jpg';
import img3 from '../../assets/pexels-idriss-meliani-2982449.jpg';
import img4 from '../../assets/Untitled-5.png';
import classes from "./ImageModal.module.css";
import * as FaIcons from 'react-icons/fa6'
const ImageModal = forwardRef(function ImageModal(props, ref) {
    const { slideImages } = props;

    const initialSlideImages = [
        { url: img1 },
        { url: img2 },
        { url: img3 },
        { url: img4 },
        { url: img1 },
        { url: img2 },
        { url: img3 },
        { url: img4 },
        { url: img1 },
        { url: img2 },
        { url: img3 },
        { url: img4 },
    ];

    const [slideImage, setSlideImage] = useState(initialSlideImages);

    const ImageModalRef = useRef();

    useImperativeHandle(ref, () => ({
        open: (images) => {
            ImageModalRef.current.showModal(images);
        },
        close: () => {
            ImageModalRef.current.close();
        },
    }));

    const handleThumbnailClick = (clickedImage) => {
        const reorderedImages = initialSlideImages.filter(image => image.url !== clickedImage.url);
        reorderedImages.unshift(clickedImage);

        setSlideImage(reorderedImages);
    };

    const handleCloseClick = () => {
        ImageModalRef.current.close();
    };


    return (
        <dialog className={classes.modal} ref={ImageModalRef}>
            <div className={classes.close}>
                <FaIcons.FaXmark dir="ltr" onClick={handleCloseClick} className={classes.closeButton}>&times;</FaIcons.FaXmark>
            </div>
            <Slide autoplay={false} duration={500} transitionDuration={200}>
                {slideImage.map((image, index) => (
                    <div key={index} className={classes.slide}>
                        <img
                            src={image.url}
                            alt={`slide-${index}`}
                            style={{
                                maxWidth: "100%",
                                height: "auto",
                                display: "block",
                                margin: "auto"
                            }}
                        />
                    </div>
                ))}
            </Slide>
            <div className={classes.thumbnailContainer}>
                {initialSlideImages.map((image, index) => (
                    <img
                        key={index}
                        src={image.url}
                        className={classes.thumbnail}
                        onClick={() => handleThumbnailClick(image)}
                        alt={`slide-${index}`}
                    />
                ))}
            </div>
        </dialog>
    );
});

export default ImageModal;