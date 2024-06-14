import { useState, useRef, useEffect } from 'react';
import classes from './chat.module.css';
import { useTranslation } from 'react-i18next';
import Empty from '../Empty/Empty';
import { format, isSameDay, isSameWeek } from 'date-fns';
export default function Chat({ selectedChat }) {
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const { t } = useTranslation();

    const [chat, setChat] = useState([]);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
    const [contextMessageMenu, setContextMessageMenu] = useState({ visible: false, x: 0, y: 0, messageKey: null });
    const [edittMessage, setEditMessage] = useState(false);
    useEffect(() => {
        if (selectedChat) {
            setChat(selectedChat.messages);
        }
    }, [selectedChat]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === 13 && inputRef.current.value !== "") {
                addMessage();
            }
        };

        const handleClick = () => {
            setContextMenu({ visible: false, x: 0, y: 0 });
            setContextMessageMenu({ visible: false, x: 0, y: 0, messageKey: null });
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("click", handleClick);
        scrollToBottom();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("click", handleClick);
        };
    }, [chat]);

    const addMessage = () => {
        if (inputRef.current.value !== "") {
            const newChatItem = {
                key: chat.length + 1,
                type: "sender",
                msg: inputRef.current.value,
                image: "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
                timestamp: new Date().toISOString(),  // Ensure ISO format
            };
            setChat((prevChat) => [...prevChat, newChatItem]);
            inputRef.current.value = "";
            scrollToBottom();
        }
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        const clickY = e.clientY;
        const menuHeight = 100;
        const windowHeight = window.innerHeight;
        const adjustedY = (clickY + menuHeight > windowHeight) ? clickY - menuHeight : clickY;

        setContextMessageMenu({ visible: false, x: 0, y: 0, messageKey: null });
        setContextMenu({ visible: true, x: e.clientX, y: adjustedY });
    };

    const handleContextMessageMenu = (e, messageKey, type) => {
        e.preventDefault();
        e.stopPropagation();
        const clickY = e.clientY;
        const menuHeight = 100;
        const windowHeight = window.innerHeight;
        const adjustedY = clickY + menuHeight > windowHeight ? clickY - menuHeight : clickY;

        if (type === 'sender') {
            setContextMenu({ visible: false, x: 0, y: 0 });
            setContextMessageMenu({ visible: true, x: e.clientX, y: adjustedY, messageKey });
        }

        if (type === 'receiver') {
            setContextMenu({ visible: false, x: 0, y: 0 });
            setContextMessageMenu({ visible: false, x: e.clientX, y: adjustedY, messageKey });
        }
    };

    const editMessage = (key) => {
        setEditMessage()
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


    const getFormattedDate = (timestamp) => {
        // Parse ISO timestamp to Date object
        const date = parseISO(timestamp);

        if (!isValid(date)) {
            return '';
        }

        const today = new Date();
        if (isSameDay(date, today)) {
            return t('Today');
        } else if (isSameDay(subDays(today, 1), date)) {
            return t('Yesterday');
        } else if (isSameWeek(date, today)) {
            return format(date, 'EEEE'); // Day name if same week
        } else {
            return format(date, 'P'); // Date format for new week
        }
    };


    useEffect(() => {
        scrollToBottom();
    }, [chat]);
    return (
        <div className={classes.main__chatcontent}>
            {selectedChat ? (
                <>
                    <div className={classes.content__header}>
                        <div className={classes.blocks}>
                            <div className={classes.current_chatting_user}>
                                <>
                                    <img className={classes.img} src={selectedChat.image} alt={selectedChat.name} />
                                    <p>{selectedChat.name}</p>
                                </>
                            </div>
                        </div>

                        <div className={classes.blocks}>
                            <div className={classes.settings}>
                                <i className="fa fa-cog"></i>
                            </div>
                        </div>
                    </div>
                    <div className={classes.content__body} onContextMenu={handleContextMenu}>
                        <div className={classes.chat__items}>
                            {chat.map((itm, index) => {
                                const date = new Date(itm.timestamp);
                                let formattedTime = 'Invalid time';
                                try {
                                    if (!isNaN(date)) {
                                        formattedTime = format(date, 'h:mm a'); // Non-digital time format
                                    }
                                } catch (e) {
                                    console.error('Error parsing date:', e);
                                }

                                const showDate = index === 0 || !isSameDay(date, new Date(chat[index - 1].timestamp));
                                let formattedDate = '';
                                try {
                                    if (!isNaN(date)) {
                                        if (index === 0 || !isSameWeek(date, new Date(chat[index - 1].timestamp))) {
                                            formattedDate = format(date, 'P'); // Format as date if new week
                                        } else {
                                            formattedDate = format(date, 'EEEE'); // Format as day name if same week
                                        }
                                    }
                                } catch (e) {
                                    console.error('Error parsing date:', e);
                                }
                                return (
                                    <div key={itm.key}>
                                        {showDate && formattedDate && (
                                            <div className={classes.chat__date}>
                                                <p>
                                                    {formattedDate}
                                                </p>
                                            </div>
                                        )}
                                        <div
                                            className={`${classes.chat__item} ${itm.type === "sender" ? classes.sender : ""} ${itm.type === "receiver" ? classes.receiver : ""}`}
                                        >
                                            <div className={`${classes.chat__item__content}`} onContextMenu={(e) => handleContextMessageMenu(e, itm.key, itm.type)}>
                                                <div className={classes.chat__msg} dir='auto'>{itm.msg}</div>
                                                <div className={classes.chat__meta}>
                                                    <span dir='ltr'>{formattedTime}</span>
                                                </div>
                                            </div>
                                            <img className={classes.img} src={itm.image} alt="avatar" />
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                        {contextMenu.visible && (
                            <ul className={`${classes.contextMenu} ${classes.show}`} style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}>
                                <li>Option 1</li>
                                <li>Option 2</li>
                            </ul>
                        )}
                        {contextMessageMenu.visible && (
                            <ul className={`${classes.contextMenu} ${classes.show}`} style={{ top: `${contextMessageMenu.y}px`, left: `${contextMessageMenu.x}px` }}>
                                <li onClick={() => editMessage(contextMessageMenu.messageKey)}>Edit</li>
                                <li onClick={() => deleteMessage(contextMessageMenu.messageKey)}>Delete</li>
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
                </>
            ) : (
                <Empty message="Select a chat to start messaging" />
            )}
        </div>
    );
}
