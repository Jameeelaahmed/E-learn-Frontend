import userClasses from '../Users/users.module.css'
import { Link, useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import classes from '../../Components/Assignments/AssignmentResponsesList.module.css'
import { useState } from 'react'
export default function AdminGroups() {
    const { t } = useTranslation();
    const [group, setGroups] = useState([
        {
            id: 1,
            name: "group name",
            ins_name: "ins name",
            department: "department"
        },
        {
            id: 2,
            name: "group name",
            ins_name: "ins name",
            department: "department"
        },
        {
            id: 3,
            name: "group name",
            ins_name: "ins name",
            department: "department"
        },
        {
            id: 4,
            name: "group name",
            ins_name: "ins name",
            department: "department"
        },
        {
            id: 5,
            name: "group name",
            ins_name: "ins name",
            department: "department"
        },
    ])

    const navigate = useNavigate()

    function handleGroupClick(id) {
        navigate(`/admingroups/admingroup${id}`);
    }
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
                                <td>{t("Instructor Name")}</td>
                                <td>{t("department")}</td>
                                <td>{t("actions")}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {group.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    {/* <Link to="" > */}
                                    <td onClick={(id) => handleGroupClick(item.id)} className={classes.hoverd}>{item.name}</td>
                                    {/* </Link> */}
                                    <td>{item.ins_name}</td>
                                    <td>{item.department}</td>
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
                            ))}
                        </tbody>
                    </table>
                </div >
            </div >
        </>
    )
}