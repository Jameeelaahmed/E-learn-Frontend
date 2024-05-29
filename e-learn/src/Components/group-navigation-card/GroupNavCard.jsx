import classes from './GroupNavCard.module.css'
import pro from '../../assets/avatar.jpg'
import { useTranslation } from 'react-i18next'
import { log } from "../../log";
import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function GroupNavCard() {
    log('<GroupNavCard /> rendered', 2);
    //* LANG 
    const { t } = useTranslation();
    //* LANG 

    const [active, setActive] = useState("");

    function handleActive(link) {
        setActive(link);
    }

    return (
        <div className={classes.group_navigation_card}>
            <p className={classes.group_title}>{t('Computer-Theory')}</p>
            <div className={classes.instructor_profile}>
                <img src={pro} alt=""></img>
                <p>Dr Nagwa</p>
            </div>
            <div className={classes.group_sections}>
                <Link onClick={() => handleActive("material")} className={`${active === "material" ? classes.active : ''}`} to=":groupId">{t('Material')}</Link>
                <Link onClick={() => handleActive("assignment")} className={`${active === "assignment" ? classes.active : ''}`} to="assignments">{t('Assignments')}</Link>
                <Link onClick={() => handleActive("quiz")} className={`${active === "quiz" ? classes.active : ''}`} to="">{t('Quizzes')}</Link>
                <Link onClick={() => handleActive("participants")} className={`${active === "participants" ? classes.active : ''}`} to="participants">{t('Participants')}</Link>
            </div>
        </div>
    )
}