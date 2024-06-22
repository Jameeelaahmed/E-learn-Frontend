import userClasses from '../Users/users.module.css'
import { Link, useNavigate } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import classes from '../../Components/Assignments/AssignmentResponsesList.module.css'
import { useState } from 'react'
import {httpRequest} from '../../HTTP';
import { useEffect } from 'react';
import {getAuthToken} from '../../Helpers/AuthHelper';
import { use } from 'i18next'

export default function AdminGroups() {
    const { t } = useTranslation();
    const [group, setGroups] = useState([])

    const navigate = useNavigate()

    async function getGroups() {
        try{
            const token = getAuthToken();
            const response = await httpRequest('GET', 'https://elearnapi.runasp.net/api/Group/GetAll', token);
            console.log(response);
            if(response.statusCode === 200){
                setGroups(response.data);
            }else{
                console.log(response);
            }
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getGroups();
    }, [])
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
                            {group.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    {/* <Link to="" > */}
                                    <td onClick={(id) => handleGroupClick(item.id)} className={classes.hoverd}>{item.name}</td>
                                    {/* </Link> */}
                                    <td>{item.instructorName}</td>
                                    <td>{item.departmentName}</td>
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