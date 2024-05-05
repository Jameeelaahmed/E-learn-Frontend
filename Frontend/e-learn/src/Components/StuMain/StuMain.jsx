import GroupsSlider from "./GroupsSlider";
import classes from './StuMain.module.css'
import { useTranslation } from "react-i18next";
import UpCommingQuizzes from "./upCommingQuzzes";
export default function StuMain(){
    const {t}=useTranslation();
    return(
        <>
        <GroupsSlider/>
        <div className={classes.foot}>
            <div className={classes.upcoming_quizzes}>
                <p>{t("up-comming-quiz")}</p>
                <UpCommingQuizzes/>
                <UpCommingQuizzes/>
            </div>
            <div className={classes.timeline}>
                <p>{t("Today's-time-line")}</p>
                <ul className={classes.time_line}>
                {/* MAP HERE */}
                    <li>
                        <p className={classes.time}>10:00 Am</p>
                        <p className={classes.group_name}>{t("sec")} algorithm</p>
                    </li>
                    <li>
                        <p className={classes.time}>10:00 Am</p>
                        <p className={classes.group_name}>{t("sec")} algorithm</p>
                    </li>
                    <li>
                        <p className={classes.time}>10:00 Am</p>
                        <p className={classes.group_name}>{t("sec")} algorithm</p>
                    </li>
                </ul>
                
            </div>
        </div>
        </>
    )
}