import classes from './GroupNavCardRespo.module.css'
import { useTranslation } from 'react-i18next'
import { log } from "../../log";
export default function GroupNavCardRespo(){
    log('<GroupNavCardRespo /> rendered', 2);
    const { t} = useTranslation();
    return(
        <div className={classes.group_navigation_card_responsive}>
            <a href="">{t('Material')}</a>
            <a href="">{t('Assignments')}</a>
            <a href="">{t('Quizzes')}</a>
            <a href="">{t('Participants')}</a>
        </div>
        )
}