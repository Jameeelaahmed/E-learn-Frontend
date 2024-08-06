import { useRef, useImperativeHandle, forwardRef } from "react"
import { createPortal } from "react-dom"
import classes from './AddPostModal.module.css'
import img from '../../assets/avatar.jpg'
import { useState, useEffect } from "react"
const AddPostModal = forwardRef(function AddPostModal(_, ref) {
    const modalRef = useRef();

    useImperativeHandle(ref, () => ({
        open: () => {
            modalRef.current.showModal();
        },
        close: () => {
            modalRef.current.close();
        }
    }));

    const [content, setContent] = useState('');
    const divRef = useRef(null);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.style.height = 'auto';
            divRef.current.style.height = divRef.current.scrollHeight + 'px';
        }
    }, [content]);

    const handleInput = (e) => {
        setContent(e.target.innerHTML);
    };

    return createPortal(
        <dialog ref={modalRef} className={classes.modal}>
            <div className={classes.container}>
                <img src={img} alt="" className={classes.img} />
                {/* <textarea type="text" className={classes.textarea} /> */}
                <div
                    className="editable"
                    contentEditable="true"
                    onInput={handleInput}
                    ref={divRef}
                    dangerouslySetInnerHTML={{ __html: content }}
                ></div>
            </div>
        </dialog>,
        document.getElementById('root')
    )
})

export default AddPostModal;