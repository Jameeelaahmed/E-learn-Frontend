import classes from './Button.module.css'
import { useLocation } from 'react-router-dom'
export default function Button({ text, onSelect, id, customClass }) {

    const location = useLocation();
    const path = location.pathname;
    console.log(path)
    return (
        <button id={id} onClick={onSelect} className={`${classes.button} ${(path === "/users/adduser" || path === "/users/edituser") ? classes.fit : ""}`} >{text}</button>
    )
}