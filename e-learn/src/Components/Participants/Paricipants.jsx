import { participants } from '../../response'
import classes from '../Assignments/AssignmentResponsesList.module.css'
import { useTranslation } from 'react-i18next'
import Button from '../Button/Button';
import { useState, useEffect } from 'react';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import * as FaIcons from 'react-icons/fa6'
import { Link } from 'react-router-dom';
export default function Participants() {
    const { t } = useTranslation();
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Ahmed",
            grade: "A"
        },
        {
            id: 1,
            name: "Ahmed",
            grade: "A"
        },
        {
            id: 1,
            name: "Ahmed",
            grade: "A"
        },
        {
            id: 1,
            name: "Ahmed",
            grade: "A"
        },
        {
            id: 1,
            name: "Ahmed",
            grade: "A"
        },
        {
            id: 1,
            name: "Ahmed",
            grade: "A"
        },
        {
            id: 1,
            name: "Ahmed",
            grade: "A"
        },
    ]);

    function getRole() {
        return localStorage.getItem('role');
    }

    const role = getRole();

    async function getGroupParticipants() {
        try {
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Group/GetGroupParticipants/${5}`, getAuthToken());
            if (response.statusCode === 200) {
                console.log(response);
                setUsers(response.data);
            }
            else {
                console.log(response.message);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getGroupParticipants();
    }, []);

    return (
        <div className={classes.track_responses}>
            <div className={classes.table_wrapper}>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <td>{t("id")}</td>
                            <td>{t("Student-Name")}</td>
                            <td>{t("grade")}</td>
                            <td>{t("profile")}</td>
                            <td>{t("chat")}</td>
                            {role === "Admin" && <td>{t("actions")}</td>}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((index) => (
                            <tr key={index}>
                                <td>{users.id}</td>
                                <td>{users.name}</td>
                                <td>{users.grade}</td>
                                <td>
                                    {/* ADD FILE AS A PARMETERT IN THE OPEN FILE IN BROWSER FUNCTION AND THE FILE NAME THE TEXT */}
                                    <Button text={t("profile")} />
                                </td>
                                <td>
                                    {/* ADD FILE AS A PARMETERT IN THE OPEN FILE IN BROWSER FUNCTION AND THE FILE NAME THE TEXT */}
                                    <Button text={t("chat")} />
                                </td>
                                {
                                    role === "Admin" &&
                                    <td className={classes.actions}>
                                        <Link to="/users/edituser" className={classes.icon} >
                                            <div>
                                                <FaIcons.FaPen />
                                            </div>
                                        </Link>
                                        <div className={classes.icon}>
                                            <FaIcons.FaTrash />
                                        </div>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}