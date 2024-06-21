import { useState } from 'react';
import Chat from '../../Components/Announcement-Chat/Chat';
import ChatContacts from '../../Components/Announcement-Chat/ChatContacts';
import classes from './container.module.css';
import { useLocation } from 'react-router-dom';
export default function Container() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [viewMode, setViewMode] = useState('contacts'); // 'contacts' or 'chat'

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
        setViewMode('chat');
    };

    const location = useLocation();
    const path = location.pathname;

    function getRole() {
        return localStorage.getItem('role');
    }
    const role = getRole();

    return (
        <div className={classes.chat_container}>
            {path === '/chat' &&
                <div className={viewMode === 'contacts' ? classes.contacts_visible : classes.contacts_hidden}>
                    <ChatContacts setSelectedChat={handleChatSelect} />
                </div>
            }
            <div className={viewMode === 'chat' ? classes.chat_visible : classes.chat_hidden}>
                <Chat selectedChat={selectedChat} setViewMode={setViewMode} />
            </div>
        </div>
    );
}
