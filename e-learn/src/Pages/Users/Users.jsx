import classes from './users.module.css'
import Card from '../../Components/CardMain/Card'
import * as FaIcons from 'react-icons/fa6'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Participants from '../../Components/Participants/Paricipants'
export default function () {

    const { t } = useTranslation();
    const location = useLocation();
    const path = location.pathname;
    console.log(path)
    console.log("iam here ")
    return (
        <div className={classes.users}>
            <div className={classes.cards}>
                <Card text={t("number of participants")} num="55" icon={(<FaIcons.FaPeopleGroup />)}></Card>
                <Card text={t("add-user")} num="55" icon={(<FaIcons.FaPersonCirclePlus />)}></Card>
                <Card text={t("number of participants")} num="55" icon={(<FaIcons.FaPersonCirclePlus />)}></Card>
            </div>
            <Participants></Participants>
        </div>
    )
}