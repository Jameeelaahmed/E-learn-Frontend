import { useState, useRef, useEffect } from 'react';
import classes from './chat.module.css';
import { useTranslation } from 'react-i18next';
import Empty from '../Empty/Empty';
import { format, isSameDay, isSameWeek, parseISO, isValid, subDays } from 'date-fns';
import * as FaIcons from 'react-icons/fa6';
import img from '../../assets/avatar.jpg'
export default function Chat({ selectedChat, setViewMode }) {
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const { t } = useTranslation();

    const [chat, setChat] = useState([]);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
    const [contextMessageMenu, setContextMessageMenu] = useState({ visible: false, x: 0, y: 0, messageKey: null });
    const [editMode, setEditMode] = useState({ isEditing: false, messageKey: null });
    const [inputValue, setInputValue] = useState('');
    const [originalMessage, setOriginalMessage] = useState('');

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
                if (editMode.isEditing) {
                    saveEditedMessage();
                } else {
                    addMessage();
                }
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
    }, [chat, editMode]);

    const addMessage = () => {
        if (inputRef.current.value !== "" || chat.some(item => item.uploadedFiles)) {
            const newChatItem = {
                key: chat.length + 1,
                type: "sender",
                msg: inputRef.current.value,
                uploadedFiles: [],
                timestamp: new Date().toISOString(),  // Ensure ISO format
            };

            if (chat.some(item => item.uploadedFiles)) {
                chat.forEach(item => {
                    if (item.uploadedFiles) {
                        newChatItem.uploadedFiles.push(item.uploadedFiles);
                    }
                });
            }

            setChat(prevChat => [...prevChat, newChatItem]);
            setInputValue('');
            scrollToBottom();
        }
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
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

    const startEditingMessage = (key) => {
        const message = chat.find(msg => msg.key === key);
        if (message) {
            setInputValue(message.msg);
            setOriginalMessage(message.msg);
            setEditMode({ isEditing: true, messageKey: key });
        }
    };

    const saveEditedMessage = () => {
        if (inputValue) {
            setChat((prevChat) =>
                prevChat.map((msg) =>
                    msg.key === editMode.messageKey ? { ...msg, msg: inputValue } : msg
                )
            );
            setEditMode({ isEditing: false, messageKey: null });
            setInputValue('');
            setOriginalMessage('');
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

    const cancelEditingMessage = () => {
        setEditMode({ isEditing: false, messageKey: null });
        setInputValue(''); // Clear the input field
        setOriginalMessage(''); // Clear the original message state
    };

    const handleFileInputChange = (event) => {
        const files = event.target.files;
        const newChatItems = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const newChatItem = {
                        key: chat.length + i + 1,
                        type: "sender",
                        msg: "",
                        uploadedImage: reader.result,
                        profileImage: img,
                        timestamp: new Date().toISOString(),  // Ensure ISO format
                    };
                    newChatItems.push(newChatItem);
                    if (newChatItems.length === files.length) {
                        setChat(prevChat => [...prevChat, ...newChatItems]);
                        scrollToBottom();
                    }
                };
                reader.readAsDataURL(file);
            }
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
                                <img className={classes.img} src={selectedChat.image} alt={selectedChat.name} />
                                <p>{selectedChat.name}</p>
                            </div>
                        </div>
                        <div className={classes.blocks}>
                            <div className={classes.back_arrow}>
                                <FaIcons.FaArrowLeft onClick={() => setViewMode('contacts')} /> {/* Set the view mode to 'contacts' */}
                            </div>
                            <div onClick={handleContextMenu} className={classes.settings}>
                                <FaIcons.FaGear />
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
                                            <div className={`${classes.chat__item__content} ${itm.uploadedImage ? classes.img_message : ""}`}>
                                                <div className={`${classes.chat__msg}`}>
                                                    <p className={classes.chat__msg__text}>{itm.msg}</p>
                                                    {itm.uploadedImage && (
                                                        <img className={classes.uploaded__image} src={itm.uploadedImage} alt="Uploaded" />
                                                    )}
                                                    {itm.uploadedFiles && itm.uploadedFiles.map((file, index) => (
                                                        <div key={index} className={classes.uploaded__file}>
                                                            <p>{file.name}</p>
                                                            {/* Add icons for different file types */}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className={classes.chat__meta}>
                                                    <span>{formattedTime}</span>
                                                </div>
                                            </div>
                                            <img className={classes.img} src={img} alt="Profile" />

                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                        {contextMenu.visible && (
                            <ul className={`${classes.contextMenu} ${classes.show}`} style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}>
                                <li>{t("delete")}</li>
                                <li>{t("Contact-info")}</li>
                            </ul>
                        )}
                        {contextMessageMenu.visible && (
                            <ul className={`${classes.contextMenu} ${classes.show}`} style={{ top: `${contextMessageMenu.y}px`, left: `${contextMessageMenu.x}px` }}>
                                <li onClick={() => startEditingMessage(contextMessageMenu.messageKey)}>{t('Edit-message')}</li>
                                <li onClick={() => deleteMessage(contextMessageMenu.messageKey)}>{t('delete')}</li>
                            </ul>
                        )}
                    </div>
                    <div className={classes.content__footer}>
                        <div className={classes.sendNewMessage}>
                            {editMode.isEditing && (
                                <div className={classes.edit_message}>
                                    <div className={classes.edit_icon}>
                                        <FaIcons.FaPen />
                                    </div>
                                    <div className={classes.edited_message}>
                                        <p className={classes.edit}>{t('Edit-message')}</p>
                                        <p className={classes.original_message} dir='auto'>{originalMessage}</p>
                                    </div>
                                </div>
                            )}
                            <div className={classes.write_message}>
                                <button className={classes.addFiles} onClick={() => document.getElementById('fileInput').click()}>
                                    <i className="fa fa-plus"></i>
                                </button>
                                <input
                                    id="fileInput"
                                    type="file"
                                    multiple
                                    style={{ display: 'none' }}
                                    onChange={handleFileInputChange}
                                />
                                <input
                                    dir='auto'
                                    type="text"
                                    ref={inputRef}
                                    value={inputValue}
                                    placeholder={t('Type a message')}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            if (editMode.isEditing) {
                                                saveEditedMessage();
                                            } else {
                                                addMessage();
                                            }
                                        }
                                    }}
                                />
                                {editMode.isEditing && ( // Conditionally render the cancel button when editing
                                    <button className={classes.cancelEdit} onClick={cancelEditingMessage}>
                                        <FaIcons.FaXmark />
                                    </button>
                                )}
                                <button className={classes.sendMessage} onClick={editMode.isEditing ? saveEditedMessage : addMessage}>
                                    {editMode.isEditing ? <FaIcons.FaCheck /> : <FaIcons.FaPaperPlane />}
                                </button>
                            </div>

                        </div>
                    </div>
                </>
            ) : (
                <Empty />
            )}
        </div>
    );
}
