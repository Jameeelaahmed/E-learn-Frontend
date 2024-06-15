import { useState } from 'react';
import Chat from '../../Components/Announcement-Chat/Chat';
import ChatContacts from '../../Components/Announcement-Chat/ChatContacts';
import classes from './container.module.css';

export default function Container() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [viewMode, setViewMode] = useState('contacts'); // 'contacts' or 'chat'

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
        setViewMode('chat');
    };

    return (
        <div className={classes.chat_container}>
            <div className={viewMode === 'contacts' ? classes.contacts_visible : classes.contacts_hidden}>
                <ChatContacts setSelectedChat={handleChatSelect} />
            </div>
            <div className={viewMode === 'chat' ? classes.chat_visible : classes.chat_hidden}>
                <Chat selectedChat={selectedChat} setViewMode={setViewMode} />
            </div>
        </div>
    );
}
