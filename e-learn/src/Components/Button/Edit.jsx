import classes from './Delete.module.css'
import * as FaIcons from "react-icons/fa6";
export default function Edit() {
    return (
        <button className={`${classes.button} ${classes.edit_button} `}>
            <FaIcons.FaPenToSquare className={classes.edit_icon}/>
        </button>

    )
}