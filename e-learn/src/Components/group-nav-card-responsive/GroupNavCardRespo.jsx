import classes from './GroupNavCardRespo.module.css'
import { useTranslation } from 'react-i18next'
import { log } from "../../log";
import { Link } from 'react-router-dom';
export default function GroupNavCardRespo() {
    log('<GroupNavCardRespo /> rendered', 2);
    const { t } = useTranslation();
    return (
        <div className={classes.group_navigation_card_responsive}>
            <Link to=":groupId">{t('Material')}</Link>
            <Link to="assignments">{t('Assignments')}</Link>
            <Link to="">{t('Quizzes')}</Link>
            <Link to="">{t('Participants')}</Link>
        </div>
    )
}