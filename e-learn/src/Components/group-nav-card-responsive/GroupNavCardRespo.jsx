import classes from './GroupNavCardRespo.module.css'
import { useTranslation } from 'react-i18next'
import { log } from "../../log";
import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function GroupNavCardRespo() {
    log('<GroupNavCardRespo /> rendered', 2);
    const { t } = useTranslation();

    const [active, setActive] = useState("");

    function handleActive(link) {
        setActive(link);
    }
    return (
        <div className={classes.group_navigation_card_responsive}>
            <Link onClick={() => handleActive("material")} className={`${active === "material" ? classes.active : ''}`} to=":groupId">{t('Material')}</Link>
            <Link onClick={() => handleActive("assignment")} className={`${active === "assignment" ? classes.active : ''}`} to="assignments">{t('Assignments')}</Link>
            <Link onClick={() => handleActive("quiz")} className={`${active === "quiz" ? classes.active : ''}`} to="">{t('Quizzes')}</Link>
            <Link onClick={() => handleActive("participants")} className={`${active === "participants" ? classes.active : ''}`} to="participants">{t('Participants')}</Link>
        </div>
    )
}