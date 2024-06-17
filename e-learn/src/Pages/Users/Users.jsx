import classes from './users.module.css'
import * as FaIcons from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom'
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
            <div className={classes.users_head}>
                <p>{t("Participants")}</p>
                <Link to="/users/adduser">
                    <div className={classes.add}>
                        <FaIcons.FaCirclePlus />
                    </div>
                </Link>
            </div>
            <Participants></Participants>
        </div>
    )
}