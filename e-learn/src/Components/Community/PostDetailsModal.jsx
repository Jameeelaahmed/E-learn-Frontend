import { useRef, useImperativeHandle, forwardRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import classes from './postDetailsModal.module.css';
import post from '../../assets/post.png';
import img from '../../assets/avatar.jpg';
import * as FaIcons from 'react-icons/fa6'
const PostDetailsModal = forwardRef(function PostDetailsModal(_, ref) {
    const modalRef = useRef();
    const inputRef = useRef();
    const commentsContainerRef = useRef();
    const [comment, setComment] = useState([]);

    useImperativeHandle(ref, () => ({
        open: () => {
            modalRef.current.showModal();
        },
        close: () => {
            modalRef.current.close();
        }
    }));

    function handleInputValue() {
        const inputValue = inputRef.current.value;
        if (inputValue.trim() !== '') {
            setComment([...comment, inputValue]);
            inputRef.current.value = '';
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            handleInputValue();
        }
    }

    useEffect(() => {
        if (commentsContainerRef.current) {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        }
    }, [comment]);

    const handleClose = () => {
        modalRef.current.close();
    };


    return createPortal(
        <dialog ref={modalRef} className={classes.modal}>
            <div className={classes.container}>
                <div className={classes.posts_container}>
                    <div className={classes.post_header}>
                        <div className={classes.user_info}>
                            <div>
                                <img className={classes.profile} src={img} alt="" />
                            </div>
                            <div className={classes.name}>
                                <p>username</p>
                                <p dir='ltr' className={classes.time}>2 hours ago</p>
                            </div>
                        </div>
                        <div className={classes.icon} onClick={handleClose}>
                            <FaIcons.FaXmark className={classes.i} />
                        </div>
                    </div>
                    <div className={classes.post_content}>
                        <div className={classes.comments} ref={commentsContainerRef}>
                            {comment.map((comment, index) => (
                                <div className={classes.comment} key={index}>
                                    <div className={classes.user}>
                                        <img src={img} alt="" className={classes.pro} />
                                        <p>username</p>
                                    </div>
                                    <p className={classes.com}>{comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={classes.add_comment}>
                        <input
                            type="text"
                            placeholder='Add a comment'
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={handleInputValue}>Post</button>
                    </div>
                </div>
            </div>
        </dialog>,
        document.getElementById('root')
    );
});

export default PostDetailsModal;
