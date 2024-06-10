import classes from './GroupNavCard.module.css'
import pro from '../../assets/avatar.jpg'
import { useTranslation } from 'react-i18next'
import { log } from "../../log";
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';

export default function GroupNavCard() {
    log('<GroupNavCard /> rendered', 2);
    //* LANG 
    const { t } = useTranslation();
    //* LANG 

    const { groupId } = useParams();

    const [active, setActive] = useState("");
    const [groupInfo, setGroupInfo] = useState({});

    function handleActive(link) {
        setActive(link);
    }
    
    async function getGroupInfo() {
        try{
            const token = getAuthToken();
            const response = await httpRequest('get', `https://elearnapi.runasp.net/api/Group/GetById/${groupId}`, token);
            console.log(response);
            if(response.statusCode === 200) {
                setGroupInfo(response.data);
                console.log(groupInfo);
            }
            else{
                console.log(response.message);
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getGroupInfo();
    }, [groupId]);

    return (
        <div className={classes.group_navigation_card}>
            <p className={classes.group_title}>{groupInfo.name/*t('Computer-Theory')*/}</p>
            <div className={classes.instructor_profile}>
                <img src={pro} alt=""></img>
                <p>{groupInfo.instructorName}</p>
            </div>
            <div className={classes.group_sections}>
                <Link onClick={() => handleActive("material")} className={`${active === "material" ? classes.active : ''}`} to={groupId}>{t('Material')}</Link>
                <Link onClick={() => handleActive("assignment")} className={`${active === "assignment" ? classes.active : ''}`} to="assignments">{t('Assignments')}</Link>
                <Link onClick={() => handleActive("quiz")} className={`${active === "quiz" ? classes.active : ''}`} to="">{t('Quizzes')}</Link>
                <Link onClick={() => handleActive("participants")} className={`${active === "participants" ? classes.active : ''}`} to="participants">{t('Participants')}</Link>
            </div>
        </div>
    )
}