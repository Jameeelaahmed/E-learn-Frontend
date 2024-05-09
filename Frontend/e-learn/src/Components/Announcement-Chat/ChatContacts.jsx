import * as FaIcons from 'react-icons/fa6'
import classes from './chatcontacts.module.css'
import img from '../../assets/avatar.jpg'
import { useTranslation } from 'react-i18next'
export default function ChatContacts() {
    const {t}=useTranslation()
    return (
        <div className={classes.chat_contacts}>
            <p className={classes.chat_text}>{t("chats")}</p>
            <div className={classes.search_container}>
                <input type="text" className={classes.search} dir="auto"/>
                <FaIcons.FaMagnifyingGlass className={classes.search_icon}/>
            </div>
            <ul>
                <li>
                    <img className={classes.contact_pic} src={img}></img>
                    <div className={classes.single_chat}>
                        <div className={classes.name}>jameela ahmed</div>
                    </div>
                    <p className={classes.single_chat_message}></p>
                </li>
                <li>
                    <img className={classes.contact_pic} src={img}></img>
                    <div className={classes.single_chat}>
                        <div className={classes.name}>jameela ahmed</div>
                    </div>
                    <p className={classes.single_chat_message}></p>
                </li>
            </ul>
        </div>
    )
}