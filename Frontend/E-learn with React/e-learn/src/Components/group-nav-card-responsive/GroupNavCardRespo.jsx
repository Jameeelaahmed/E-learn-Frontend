import classes from './GroupNavCardRespo.module.css'
import { useTranslation } from 'react-i18next'
export default function GroupNavCardRespo(){
    const { t} = useTranslation();
    return(
        <div className={classes.group_navigation_card_responsive}>
            <a href="">{t('Material')}</a>
            <a href="">{t('Assignments')}</a>
            <a href="">{t('Quiz')}</a>
            <a href="">{t('Participants')}</a>
        </div>
        )
}