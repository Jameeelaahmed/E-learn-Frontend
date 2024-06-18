import classes from './DeleteButton.module.css'
import * as FaIcons from "react-icons/fa6";
export default function DeleteButton({ delete_button, text, onDelete }) {
    return (
        <button className={`${classes.delete_button} ${delete_button}`} onClick={onDelete}>
            {text}
        </button>
    )
}