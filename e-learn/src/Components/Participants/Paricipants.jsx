import classes from '../Assignments/AssignmentResponsesList.module.css';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import { useState, useEffect } from 'react';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';

export default function Participants() {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);

    async function getGroupParticipants() {
        try {
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Group/GetGroupParticipants/5`, getAuthToken());
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
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.grade}</td>
                                    <td>
                                        {/* ADD FILE AS A PARAMETER IN THE OPEN FILE IN BROWSER FUNCTION AND THE FILE NAME THE TEXT */}
                                        <Button text={t("attachment")} />
                                    </td>
                                    <td className={classes.mark}>
                                        {/* {mark[index] ? <input type='number' ref={getMark} placeholder={t('enter-mark')} className={classes.input} /> :
                                            <Button onSelect={() => handleMark(index)} text={markValue} />}
                                        {mark[index] &&
                                            <button onClick={() => handleSave(index)} className={classes.button}>
                                                <FaIcons.FaCheck className={classes.icon}></FaIcons.FaCheck>
                                            </button>
                                        } */}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No participants found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
