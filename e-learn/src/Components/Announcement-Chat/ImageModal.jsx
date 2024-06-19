import { forwardRef, useImperativeHandle } from "react";
import { Slide } from "react-slideshow-image";
import classes from "./ImageModal.module.css";
import "react-slideshow-image/dist/styles.css";
const ImageModal = forwardRef(function ImageModal(props, ref) {
    const { slideImages } = props;

    useImperativeHandle(ref, () => ({
        open: (images) => {
            ref.current.showModal(images); // Changed ImageModal to ref
        },
        close: () => {
            ref.current.close(); // Changed ImageModal to ref
        },
    }));

    return (
        <dialog className={classes.modal}>
            <Slide>
                {slideImages &&
                    slideImages.map((slideImage, index) => (
                        <div key={index}>
                            <div className="slide" style={{ backgroundImage: `url(${slideImage.url})` }}>
                                <span className="caption">{slideImage.caption}</span>
                            </div>
                        </div>
                    ))}
            </Slide>
        </dialog>
    );
});

export default ImageModal;
