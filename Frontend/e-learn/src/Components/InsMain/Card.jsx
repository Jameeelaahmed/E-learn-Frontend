import classes from './Card.module.css'
import * as FaIcons from "react-icons/fa6";
export default function Card({text,num,icon}){
    return(
        <div className={classes.card}>
            <div>
                <p>{text}</p>
                <p>{num}</p>
            </div>
            {icon}
        </div>
    )
}