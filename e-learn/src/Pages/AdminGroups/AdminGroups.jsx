import userClasses from '../Users/users.module.css'
import { Link, useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import classes from '../../Components/Assignments/AssignmentResponsesList.module.css'
import { useState, useEffect } from 'react'
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';

export default function AdminGroups() {
    const { t } = useTranslation();
    const [groups, setGroups] = useState([]);

    const navigate = useNavigate();

    async function getGroups() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', 'https://elearnapi.runasp.net/api/Group/GetAll', token);
            if (response.statusCode === 200) {
                setGroups(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteGroup(groupId) {
        try {
            const token = getAuthToken();
            const response = await httpRequest('DELETE', `https://elearnapi.runasp.net/api/Group/Delete/${groupId}`, token);
            if (response.statusCode === 200) {
                console.log('Deleted');
                getGroups(); // Re-fetch groups after successful deletion
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGroups();
    }, []);

    function handleGroupClick(id) {
        navigate(`/admingroups/${id}`);
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
                            {groups.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td onClick={() => handleGroupClick(item.id)} className={classes.hoverd}>{item.name}</td>
                                    <td>{item.instructorName}</td>
                                    <td>{item.departmentName}</td>
                                    <td className={classes.actions}>
                                        <Link to="/admingroups/editgroup" className={classes.icon} >
                                            <div>
                                                <FaIcons.FaPen />
                                            </div>
                                        </Link>
                                        <div className={classes.icon} onClick={() => handleDeleteGroup(item.id)}>
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
    );
}
