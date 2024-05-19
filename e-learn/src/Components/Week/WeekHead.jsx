import classes from "./WeekHead.module.css";
import * as FaIcons from "react-icons/fa6";
import { useTranslation } from 'react-i18next'

export default function WeekHead({ weekNum, onSelect, active,onDelete }) {

    const {t}=useTranslation();
    return (
        <div className={`${classes.week_head} ${active ? classes.active : ''}`} >
            <div className={classes.week_title}>
                <p className={classes.num}></p>
                <p>{t("week")} {weekNum}</p>
            </div>
            <div className={classes.icons}>
                <FaIcons.FaTrash 
                onClick={onDelete} 
                className={classes.leftIcon}/>
                <FaIcons.FaCaretDown 
                onClick={onSelect} 
                className={classes.icon}/>
            </div>
        </div>
    );
}
