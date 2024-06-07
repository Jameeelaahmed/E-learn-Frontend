import classes from './ChatContacts.module.css'
import img from '../../assets/avatar.jpg'
import * as FaIcons from 'react-icons/fa6';
export default function ChatContacts() {
    return (
        <div className={classes.chat_contacts}>
            <div className={classes.search_container}>
                <input type="text" className={classes.search} dir="auto" />
                <FaIcons.FaMagnifyingGlass className={classes.search_icon}></FaIcons.FaMagnifyingGlass>
            </div>
            <ul>
                <li>
                    <img className={classes.contact_pic} src={img}></img>
                    <div className={classes.single_chat}>
                        <div className={classes.name}>jameela ahmed</div>
                        {/* <p className="single-chat-message">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat similique, harum tenetur ducimus quisquam numquam, quae itaque perferendis iste vitae accusantium tempore pariatur quibusdam porro dolore dignissimos qui ipsa quas.
                                    </p>  */}
                    </div>
                </li>
                <li>
                    <img className={classes.contact_pic} src={img}></img>
                    <div className={classes.single_chat}>
                        <div className={classes.name}>jameela ahmed</div>
                        {/* <p className="single-chat-message">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat similique, harum tenetur ducimus quisquam numquam, quae itaque perferendis iste vitae accusantium tempore pariatur quibusdam porro dolore dignissimos qui ipsa quas.
                                    </p> */}
                    </div>
                </li>
            </ul>
        </div>
    )
}