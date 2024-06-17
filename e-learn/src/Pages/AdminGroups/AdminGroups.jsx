import userClasses from '../Users/users.module.css'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import classes from '../../Components/Assignments/AssignmentResponsesList.module.css'
export default function AdminGroups() {
    const { t } = useTranslation();
    return (
        <>
            <div className={userClasses.users_head}>
                <p>{t("Groups")}</p>
                <Link to="/admingroups/addgroup">
                    <div className={userClasses.add}>
                        <FaIcons.FaCirclePlus />
                    </div>
                </Link>
            </div>
            <div className={classes.track_responses}>
                <div className={classes.table_wrapper}>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <td>{t("id")}</td>
                                <td>{t("group-name")}</td>
                                <td>{t("instructor-name")}</td>
                                <td>{t("department")}</td>
                                <td>{t("actions")}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {users.map((index) => ( */}
                            <tr >
                                <td>id</td>
                                <td>group name</td>
                                <td>ins name</td>
                                <td>department</td>
                                <td className={classes.actions}>
                                    <Link to="/admingroups/editgroup" className={classes.icon} >
                                        <div>
                                            <FaIcons.FaPen />
                                        </div>
                                    </Link>
                                    <div className={classes.icon}>
                                        <FaIcons.FaTrash />
                                    </div>
                                </td>

                            </tr>
                            {/* ))} */}
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    )
}