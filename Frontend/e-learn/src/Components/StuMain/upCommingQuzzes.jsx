import classes from './upCommingQuiz.module.css'
import { useTranslation } from 'react-i18next'
export default function UpCommingQuizzes(){
    const {t}=useTranslation()
    return(
        <div className={classes.UpCommingQuizzes}>
            <div className={classes.circle_one}></div>
            <div className={classes.circle_two}></div>
            <p className={classes.group_name}>{t("Group")}</p>
            <div className={classes.name}>
                {/* NAME HERE */}
                <p>name</p>
            </div>
        </div>
    )
}