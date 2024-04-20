import classes from './LecSec.module.css'
import * as FaIcons from "react-icons/fa6";
export default function LecSec({materialType}){
    return(
        <div className={classes.lec_sec}>
            <p>{materialType}</p>
            <div className={classes.icons}>
                <FaIcons.FaCirclePlus className={classes.leftIcon}/>
                <FaIcons.FaCaretDown className={classes.icon}/>
            </div>
        </div>   
    )
}