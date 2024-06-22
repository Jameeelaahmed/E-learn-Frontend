import { useState, useRef, useEffect } from 'react';
import classes from '../../Components/Announcement-Chat/chat.module.css';
import accnounceclasses from './Announcement.module.css';
import { useTranslation } from 'react-i18next';
import { format, isSameDay, isSameWeek, parseISO, isValid, subDays } from 'date-fns';
import * as FaIcons from 'react-icons/fa6';
import img from '../../assets/avatar.jpg';
import ImageModal from '../../Components/Announcement-Chat/ImageModal';
import ChoseGroupModal from './ChoseGroupModal';

export default function Announcement() {
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);
    const { t } = useTranslation();

    const [chat, setChat] = useState([]);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
    const [contextMessageMenu, setContextMessageMenu] = useState({ visible: false, x: 0, y: 0, messageKey: null });
    const [editMode, setEditMode] = useState({ isEditing: false, messageKey: null });
    const [inputValue, setInputValue] = useState('');
    const [originalMessage, setOriginalMessage] = useState('');
    const [groupChosen, setGroupChosen] = useState(false);

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
                    handleSendMessage();
                }
            }
        };

        const handleClick = () => {
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
            return format(date, 'EEEE');
        } else {
            return format(date, 'P');
        }
    };

    const cancelEditingMessage = () => {
        setEditMode({ isEditing: false, messageKey: null });
        setInputValue('');
        setOriginalMessage('');
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
                        type: 'sender',
                        msg: inputValue,
                        uploadedImage: file.type.startsWith('image/') ? reader.result : null,
                        uploadedFiles: !file.type.startsWith('image/') ? [{ name: file.name, type: file.type, content: reader.result }] : [],
                        profileImage: 'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
                        timestamp: new Date().toISOString(),
                        receivers: ['receiver1', 'receiver2'],
                    };
                    newChatItems.push(newChatItem);
                    if (newChatItems.length === files.length) {
                        setChat((prevChat) => [...prevChat, ...newChatItems]);
                        scrollToBottom();
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleSendMessage = () => {
        if (!groupChosen) {
            chooseGroupRef.current.open();
            return;
        }
        addMessage();
        chooseGroupRef.current.resetSelectedGroup();
        setGroupChosen(false);
    };

    const addMessage = () => {
        if (inputRef.current.value !== '' || chat.some((item) => item.uploadedFiles.length > 0)) {
            const newChatItem = {
                key: chat.length + 1,
                type: 'sender',
                msg: inputValue,
                uploadedImage: null,
                uploadedFiles: [],
                profileImage: { img },
                timestamp: new Date().toISOString(),
                receivers: ['receiver1', 'receiver2'],
            };

            chat.forEach((item) => {
                if (item.uploadedFiles.length > 0) {
                    newChatItem.uploadedFiles = newChatItem.uploadedFiles.concat(item.uploadedFiles);
                }
            });

            setChat((prevChat) => [...prevChat, newChatItem]);
            setInputValue('');
            scrollToBottom();
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chat]);

    const ImageModalRef = useRef();
    const handleImageClick = (imageUrl) => {
        ImageModalRef.current.open(imageUrl);
    };

    const getFileIcon = (fileType) => {
        switch (fileType) {
            case 'application/pdf':
                return <FaFilePdf />;
            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return <FaFileWord />;
            case 'application/vnd.ms-excel':
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return <FaFileExcel />;
            case 'application/vnd.ms-powerpoint':
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                return <FaFilePowerpoint />;
            case 'application/zip':
            case 'application/x-rar-compressed':
                return <FaFileArchive />;
            case 'audio/mpeg':
            case 'audio/wav':
                return <FaFileAudio />;
            case 'video/mp4':
            case 'video/x-msvideo':
                return <FaFileVideo />;
            case 'text/plain':
                return <FaFileAlt />;
            case 'text/html':
            case 'application/json':
                return <FaFileCode />;
            default:
                return <FaFileAlt />;
        }
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        const clickY = e.clientY;
        const menuHeight = 100;
        const windowHeight = window.innerHeight;
        const adjustedY = clickY + menuHeight > windowHeight ? clickY - menuHeight : clickY;

        setContextMenu({ visible: true, x: e.clientX, y: adjustedY });
        setContextMessageMenu({ visible: false, x: 0, y: 0, messageKey: null });
    };

    const openFilePicker = () => {
        fileInputRef.current.click();
    };

    const chooseGroupRef = useRef();

    const handleChooseGroup = () => {
        const selectedGroup = chooseGroupRef.current.getSelectedGroup();
        if (selectedGroup) {
            setGroupChosen(true);
            chooseGroupRef.current.close();
            addMessage();
        } else {
            alert('Please choose a group before sending the message.');
        }
    };

    return (
        <div className={`${classes.chatContainer} ${accnounceclasses.chatContainer}`} onContextMenu={handleContextMenu}>
            <h2 className={accnounceclasses.announce}> {t('Announcement')}</h2>
            <div className={classes.messageContainer}>
                {chat.map((item, index) => (
                    <div key={index} className={`${classes.messageItem} ${item.type === 'sender' ? classes.sender : classes.receiver}`}>
                        <img src={item.profileImage} alt="profile" className={classes.profileImage} />
                        <div className={classes.messageContent}>
                            {item.uploadedImage && (
                                <div className={classes.uploadedImage}>
                                    <img
                                        src={item.uploadedImage}
                                        alt="uploaded"
                                        onClick={() => handleImageClick(item.uploadedImage)}
                                    />
                                </div>
                            )}
                            {item.uploadedFiles.length > 0 &&
                                item.uploadedFiles.map((file, fileIndex) => (
                                    <div key={fileIndex} className={classes.uploadedFile}>
                                        {getFileIcon(file.type)}
                                        <a href={file.content} download={file.name}>
                                            {file.name}
                                        </a>
                                    </div>
                                ))}
                            <div
                                className={classes.messageText}
                                onContextMenu={(e) => handleContextMessageMenu(e, item.key, item.type)}
                            >
                                {item.msg}
                            </div>
                        </div>
                        <div className={classes.messageTimestamp}>{getFormattedDate(item.timestamp)}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className={classes.inputContainer}>
                <div className={classes.inputWrapper}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={t('Type your message...')}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <FaIcons.FaPaperclip className={classes.fileIcon} onClick={openFilePicker} />
                    <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileInputChange}
                        multiple
                    />
                    <button onClick={handleSendMessage}>
                        <FaIcons.FaPaperPlane />
                    </button>
                </div>
                {contextMenu.visible && (
                    <div
                        className={classes.contextMenu}
                        style={{ top: contextMenu.y, left: contextMenu.x }}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        <div className={classes.contextMenuItem}>
                            <FaIcons.FaUsers />
                            {t('Choose Group')}
                        </div>
                    </div>
                )}
                {contextMessageMenu.visible && (
                    <div
                        className={classes.contextMenu}
                        style={{ top: contextMessageMenu.y, left: contextMessageMenu.x }}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        <div
                            className={classes.contextMenuItem}
                            onClick={() => startEditingMessage(contextMessageMenu.messageKey)}
                        >
                            <FaIcons.FaEdit />
                            {t('Edit')}
                        </div>
                        <div
                            className={classes.contextMenuItem}
                            onClick={() => deleteMessage(contextMessageMenu.messageKey)}
                        >
                            <FaIcons.FaTrash />
                            {t('Delete')}
                        </div>
                    </div>
                )}
            </div>
            <ImageModal ref={ImageModalRef} />
            <ChoseGroupModal ref={chooseGroupRef} />
        </div>
    );
}
