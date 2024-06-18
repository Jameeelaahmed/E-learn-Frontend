import GroupsSlider from "../../Components/StuMain/GroupsSlider";
import classes from './StuMain.module.css'
import { useTranslation } from "react-i18next";
import UpCommingQuizzes from "../../Components/StuMain/upCommingQuzzes";
export default function StuMain() {
    const { t } = useTranslation();
    return (
        <>
            <GroupsSlider />
            <div className={classes.foot}>
                <div className={classes.upcoming_quizzes}>
                    <p className={classes.title}>{t("up-comming-quiz")}</p>
                    <UpCommingQuizzes />
                    <UpCommingQuizzes />
                </div>
                <div className={classes.timeline}>
                    <p className={classes.title}>{t("Today's-time-line")}</p>
                    <ul className={classes.time_line}>
                        {/* MAP HERE */}
                        <li>
                            <p className={classes.time}>12:00 pm</p>
                            <p className={classes.group_name}>{t("lecture")} Compiler</p>
                        </li>
                        <li>
                            <p className={classes.time}>03:00 pm</p>
                            <p className={classes.group_name}>{t("section")} Compiler</p>
                        </li>
                        <li>
                            <p className={classes.time}>05:00 pm</p>
                            <p className={classes.group_name}>{t("lecture")} Computer Vision</p>
                        </li>
                    </ul>

                </div>
            </div>
        </>
    )
}