import { useRef, useImperativeHandle, forwardRef, useState } from "react"
import { createPortal } from "react-dom"
import classes from './postDetailsModal.module.css'
import post from '../../assets/post.png'
import img from '../../assets/avatar.jpg'
const PostDetailsModal = forwardRef(function PostDetailsModal(_, ref) {
    const modalRef = useRef();
    const inputRef = useRef();
    const [comment, setComment] = useState([]);
    useImperativeHandle(ref, () => ({
        open: () => {
            modalRef.current.showModal();
        },
        close: () => {
            modalRef.current.close()
        }
    }))

    function handleInputValue() {
        setComment([...comment, inputRef.current.value])
        inputRef.current.value = '';
    }

    return createPortal(
        <dialog ref={modalRef} className={classes.modal}>
            <div className={classes.container}>
                <div className={classes.img}>
                    <img src={post} alt="" />
                </div>
                <div className={classes.posts_container}>
                    <div className={classes.post_header}>
                        <div>
                            <img className={classes.profile} src={img} alt="" />
                        </div>
                        <div className={classes.name}>
                            <p>username</p>
                            <p dir='ltr'>2 hours ago</p>
                        </div>
                    </div>
                    <div className={classes.post_content}>
                        <div className={classes.comments}>
                            {
                                comment.map((comment, index) => (
                                    <div className={classes.comment}>
                                        <div className={classes.user}>
                                            <img src={img} alt="" className={classes.pro} />
                                            <p>username</p>
                                        </div>
                                        <p key={index} className={classes.com}>{comment}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={classes.add_comment}>
                        <input type="text" placeholder='Add a comment' ref={inputRef} />
                        <button onClick={handleInputValue}>Post</button>
                    </div>
                </div>
            </div>
        </dialog>,
        document.getElementById('root')
    )
})
export default PostDetailsModal;