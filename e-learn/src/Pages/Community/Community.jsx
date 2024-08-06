import Posts from "../../Components/Community/Posts";
import classes from './Community.module.css'
import { useRef } from 'react';
import img from '../../assets/avatar.jpg'
import AddPostModal from "../../Components/Community/AddPostModal";
import { useTranslation } from "react-i18next";
export default function Community() {
    const postRef = useRef();
    const { t } = useTranslation();
    function handlePostModal() {
        postRef.current.open();
    }
    return (
        <div className={classes.community}>
            <div className={classes.add_post}>
                <AddPostModal ref={postRef} />
                <img src={img} alt="" className={classes.img} />
                <p onClick={handlePostModal}>{t("What's on your mind?")}</p>
            </div>
            <Posts />
        </div>
    );
}