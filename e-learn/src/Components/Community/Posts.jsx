import classes from './Posts.module.css'
import img from '../../assets/avatar.jpg'
import * as FaIcons from "react-icons/fa6";
import { useRef } from 'react';
import PostDetailsModal from './PostDetailsModal';
export default function Posts() {
    const postRef = useRef();

    function handlePostModal() {
        postRef.current.open();
    }

    return (
        <div className={classes.post}>
            <div className={classes.userdetails}>
                <img src={img} alt="" />
                <div className={classes.name}>
                    <p>username</p>
                    <p dir='ltr' className={classes.time}>2 hours ago</p>
                </div>
            </div>
            <div className={classes.post_details}>
                <p className={classes.post_content}>
                    kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
                </p>
                <div className={classes.nav}>
                    <div>
                        <FaIcons.FaEllipsis className={classes.icon} onClick={handlePostModal} />
                        <PostDetailsModal ref={postRef} />
                    </div>
                    <div dir='ltr'>
                        <FaIcons.FaCommentDots className={classes.icon} />
                        <p>4</p>
                    </div>
                    <div dir='ltr'>
                        <FaIcons.FaThumbsUp className={classes.icon} />
                        <p>4</p>
                    </div>
                </div>
            </div>
        </div>
    )
}