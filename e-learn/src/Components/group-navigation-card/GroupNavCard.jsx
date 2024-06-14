import classes from './GroupNavCard.module.css';
import pro from '../../assets/avatar.jpg';
import { useTranslation } from 'react-i18next';
import { log } from "../../log";
import { NavLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';

export default function GroupNavCard() {
    log('<GroupNavCard /> rendered', 2);
    const { t } = useTranslation();
    const { groupId } = useParams();
    const [groupInfo, setGroupInfo] = useState({});

    async function getGroupInfo() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('get', `https://elearnapi.runasp.net/api/Group/GetById/${groupId}`, token);
            if (response.statusCode === 200) {
                setGroupInfo(response.data);
            } else {
                console.log(response.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getGroupInfo();
    }, [groupId]);

    return (
        <div className={classes.group_navigation_card}>
            <p className={classes.group_title}>{groupInfo.name}</p>
            <div className={classes.instructor_profile}>
                <img src={pro} alt="Profile"></img>
                <p>{groupInfo.instructorName}</p>
            </div>
            <div className={classes.group_sections}>
                <NavLink
                    to=""
                    end
                    className={({ isActive }) => `${isActive ? classes.active : ''}`}
                >
                    {t('Material')}
                </NavLink>
                <NavLink
                    to="assignments"
                    end
                    className={({ isActive }) => `${isActive ? classes.active : ''}`}
                >
                    {t('Assignments')}
                </NavLink>
                <NavLink
                    to=""
                    end
                    className={({ isActive }) => `${isActive ? classes.active : ''}`}
                >
                    {t('Quizzes')}
                </NavLink>
                <NavLink
                    to="participants"
                    end
                    className={({ isActive }) => `${isActive ? classes.active : ''}`}
                >
                    {t('Participants')}
                </NavLink>
            </div>
        </div>
    );
}
