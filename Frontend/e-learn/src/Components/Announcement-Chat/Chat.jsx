import classes from './chat.module.css'
import * as FaIcons from 'react-icons/fa6'
export default function Chat(){
    return(
        <div className={classes.chat}>
            <div className={classes.messages}>
                
            </div>
            <div className={classes.write_message}>
                <FaIcons.FaPlus className={classes.plus}/>
                <input type='text'/>
                <FaIcons.FaPaperPlane className={classes.send_icon}/>
            </div>
        </div>
    )
}