import * as FaIcons from 'react-icons/fa6'
import classes from './InsMain.module.css'
import Card from "../../Components/CardMain/Card"
import { useTranslation } from 'react-i18next'
import Button from '../../Components/Button/Button';
export default function InsMain() {
    const { t } = useTranslation();
    return (
        <div className={classes.ins_main}>
            <div className={classes.cards}>
                <Card text={t("total-students-in-groups")} num="55" icon={(<FaIcons.FaPeopleGroup />)}></Card>
                <Card text={t("total-quizzes")} num="50" icon={(<FaIcons.FaClipboard />)}></Card>
                <Card text={t("total-assignments")} num="29"></Card>
            </div>
            <div className={classes.summary}>
                <div className={classes.box}>
                    <div className={classes.head}>
                        <p>{t("Groups")}</p>
                        <Button text={t("see-all")} />
                    </div>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th>{t("Group")}</th>
                                <th>{t("level")}</th>
                                <th>{t("number-of-members")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* MAP HERE */}
                            <tr>
                                <td>Computer theory</td>
                                <td>4</td>
                                <td>100</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={classes.box}>
                    <div className={classes.head}>
                        <p>{t("Quizzes")}</p>
                        <Button text={t("add-quiz")} />
                    </div>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th>{t("Group")}</th>
                                <th>{t("date")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* MAP HERE */}
                            <tr>
                                <td>Image Processing</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}