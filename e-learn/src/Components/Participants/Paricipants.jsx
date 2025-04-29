import classes from '../Assignments/AssignmentResponsesList.module.css';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import { useState, useEffect } from 'react';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import { useParams } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom';
import tableClasses from '../../Pages/AdminSingleGroup/AdminSingleGroup.module.css'
export default function Participants() {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const params = useParams();
    const groupId = params.groupId;
    const navigate = useNavigate();
    function getRole() {
        return localStorage.getItem('role');
    }

    const role = getRole();

    async function getGroupParticipants() {
        try {
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Group/GetGroupParticipants/${groupId}`, getAuthToken());
            if (response.statusCode === 200) {
                console.log(response);
                setUsers(response.data);
            } else {
                console.log(response.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    function handleOpenProfile() {
        navigate(`/profile`);
    }
    function handleOpenChat() {
        navigate(`/chat`);
    }

    useEffect(() => {
        getGroupParticipants();
    }, []);

    return (
        <div className={classes.track_responses}>
            <div className={classes.table_wrapper}>
                <div className={tableClasses.table}>
                    <ul>
                        <div className={tableClasses.table_head}>
                            <p>Number</p>
                            <p>{t("id")}</p>
                            <p>{t("Student-Name")}</p>
                            <p>{t("grade")}</p>
                            <p>{t("profile")}</p>
                            <p>{t("chat")}</p>
                            {role === "Admin" && <p>{t("actions")}</p>}
                        </div>
                        {
                            users.length > 0 ? (
                                users.map((user, index) => (
                                    <li key={index}>
                                        <p>{index + 1}</p>
                                        <p>id</p>
                                        <p>{user.name}</p>
                                        <p>{user.grade}</p>
                                        <p>
                                            <Button onSelect={handleOpenProfile} text={t("profile")} />
                                        </p>
                                        <p>
                                            <Button onSelect={handleOpenChat} text={t("chat")} />
                                        </p>
                                    </li>
                                ))
                            ) : (
                                <p>
                                    No participants found
                                </p>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}
