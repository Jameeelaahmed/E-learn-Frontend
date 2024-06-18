import * as FaIcons from 'react-icons/fa6';
import classes from './chatcontacts.module.css';
import img from '../../assets/avatar.jpg';
import { useTranslation } from 'react-i18next';

export default function ChatContacts({ setSelectedChat }) {
    const { t } = useTranslation();

    const contacts = [
        {
            id: 1,
            name: "جميلة أحمد",
            image: img,
            messages: [
                {
                    key: 1,
                    type: "receiver",
                    msg: "Hello Jameela!",
                    image: img
                },
                {
                    key: 2,
                    type: "sender",
                    msg: "Hi, How are you?",
                    image: img
                },
            ],
        },
        {
            id: 2,
            name: "مروان سيد",
            image: img,
            messages: [
                {
                    key: 1,
                    type: "receiver",
                    msg: "Hello Marwan!",
                    image: img
                },
                {
                    key: 2,
                    type: "sender",
                    msg: "Hi Mohamed, How are you?",
                    image: img
                },
            ],
        },
    ];

    return (
        <div className={classes.chat_contacts}>
            <p className={classes.chat_text}>{t("chats")}</p>
            <div className={classes.search_container}>
                <input type="text" className={classes.search} dir="auto" />
                <FaIcons.FaMagnifyingGlass className={classes.search_icon} />
            </div>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact.id} onClick={() => setSelectedChat(contact)}>
                        <img className={classes.contact_pic} src={contact.image} alt={contact.name} />
                        <div className={classes.single_chat}>
                            <div className={classes.name}>{contact.name}</div>
                        </div>
                        <p className={classes.single_chat_message}></p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
