import Chat from './Chat'
import ChatContacts from './ChatContacts'
import classes from './container.module.css'
export default function Container(){

    return(
        <div className={classes.chat_container}>
            <ChatContacts/>
            <Chat/>
        </div>
    )
}