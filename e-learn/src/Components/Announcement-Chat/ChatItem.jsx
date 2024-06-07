import React from "react";
import img from '../../assets/avatar.jpg'
import classes from './chat.module.css'
const ChatItem = ({ user, msg, image }) => {
    return (
        <div
            style={{ animationDelay: `0.8s` }}
            className={`${classes.chat__item} ${user ? user : ""}`}
        >
            <div className={classes.chat__item__content}>
                <div className={classes.chat__msg}>{msg}</div>
                <div className={classes.chat__meta}>
                    <span>16 mins ago</span>
                    {/* <span>Seen 1.03PM</span> */}
                </div>
            </div>
            <img className={classes.img} src={img}></img>
        </div>
    );
};

export default ChatItem;
