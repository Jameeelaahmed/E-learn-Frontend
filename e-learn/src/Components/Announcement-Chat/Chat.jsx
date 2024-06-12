import { useState, useRef, useEffect } from 'react';
import classes from './chat.module.css';
import img from '../../assets/avatar.jpg';
import { useTranslation } from 'react-i18next';

export default function Chat() {
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const { t } = useTranslation();

    const initialChatItems = [
        {
            key: 1,
            image: "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
            type: "sender",
            msg: "Hi Tim, How are you?",
        },
    ];

    const [chat, setChat] = useState(initialChatItems);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, type: null, messageKey: null });

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === 13 && inputRef.current.value !== "") {
                addMessage();
            }
        };

        const handleClick = () => {
            setContextMenu({ visible: false, x: 0, y: 0, type: null, messageKey: null });
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("click", handleClick);
        scrollToBottom();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("click", handleClick);
        };
    }, []);

    const addMessage = () => {
        if (inputRef.current.value !== "") {
            const newChatItem = {
                key: chat.length + 1,
                type: "sender",
                msg: inputRef.current.value,
                image: "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
            };
            setChat((prevChat) => [...prevChat, newChatItem]);
            inputRef.current.value = "";
            scrollToBottom();
        }
    };

    const handleContextMenu = (e, messageKey = null) => {
        e.preventDefault();
        const clickY = e.clientY;
        const menuHeight = 100;
        const windowHeight = window.innerHeight;

        const adjustedY = (clickY + menuHeight > windowHeight) ? clickY - menuHeight : clickY;

        setContextMenu({ visible: false, x: 0, y: 0, type: null, messageKey: null });

        setTimeout(() => {
            setContextMenu({ visible: true, x: e.clientX, y: adjustedY, type: messageKey ? 'message' : 'general', messageKey });
        }, 0);
    };

    const editMessage = (key) => {
        const newMessage = prompt("Edit your message:");
        if (newMessage) {
            setChat((prevChat) =>
                prevChat.map((msg) =>
                    msg.key === key ? { ...msg, msg: newMessage } : msg
                )
            );
        }
    };

    const deleteMessage = (key) => {
        setChat((prevChat) => prevChat.filter((msg) => msg.key !== key));
    };

    return (
        <div className={classes.main__chatcontent} onContextMenu={(e) => handleContextMenu(e)}>
            <div className={classes.content__header}>
                <div className={classes.blocks}>
                    <div className={classes.current_chatting_user}>
                        <img className={classes.img} src={img} alt="current chatting user" />
                        <p>Tim Hover</p>
                    </div>
                </div>

                <div className={classes.blocks}>
                    <div className={classes.settings}>
                        <i className="fa fa-cog"></i>
                    </div>
                </div>
            </div>
            <div className={classes.content__body}>
                <div className={classes.chat__items}>
                    {chat.map((itm) => (
                        <div
                            key={itm.key}
                            className={`${classes.chat__item} ${itm.type === "sender" ? classes.sender : ""} ${itm.type === "receiver" ? classes.receiver : ""}`}
                            onContextMenu={(e) => itm.type === 'sender' && handleContextMenu(e, itm.key)}
                        >
                            <div className={`${classes.chat__item__content}`}>
                                <div className={classes.chat__msg} dir='auto'>{itm.msg}</div>
                                <div className={classes.chat__meta}>
                                    <span>16 mins ago</span>
                                </div>
                            </div>
                            <img className={classes.img} src={img} alt="avatar" />
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                {contextMenu.visible && (
                    <ul className={`${classes.contextMenu} ${classes.show}`} style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}>
                        {contextMenu.type === 'message' ? (
                            <>
                                <li onClick={() => editMessage(contextMenu.messageKey)}>Edit</li>
                                <li onClick={() => deleteMessage(contextMenu.messageKey)}>Delete</li>
                            </>
                        ) : (
                            <>
                                <li onClick={() => alert('Action 1')}>{t("Delete")}</li>
                                <li onClick={() => alert('Action 2')}>{t("contact-info")}</li>
                            </>
                        )}
                    </ul>
                )}
            </div>
            <div className={classes.content__footer}>
                <div className={classes.sendNewMessage}>
                    <button className={classes.addFiles}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <input
                        type="text"
                        placeholder="Type a message here"
                        ref={inputRef}
                    />
                    <button className={classes.btnSendMsg} id="sendMsgBtn" onClick={addMessage}>
                        <i className="fa fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
