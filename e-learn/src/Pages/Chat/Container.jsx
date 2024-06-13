import { useState } from 'react';
import Chat from '../../Components/Announcement-Chat/Chat';
import ChatContacts from '../../Components/Announcement-Chat/ChatContacts';
import classes from './container.module.css';

export default function Container() {
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <div className={classes.chat_container}>
            <ChatContacts setSelectedChat={setSelectedChat} />
            <Chat selectedChat={selectedChat} />
        </div>
    );
}
