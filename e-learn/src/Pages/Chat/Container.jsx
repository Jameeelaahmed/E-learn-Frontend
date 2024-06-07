import Chat from '../../Components/Announcement-Chat/Chat'
import ChatContacts from '../../Components/Announcement-Chat/ChatContacts'
import classes from './container.module.css'
export default function Container() {

    return (
        <div className={classes.chat_container}>
            <ChatContacts />
            <Chat />
        </div>
    )
}