import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation, Link } from 'react-router-dom';
import Button from '../Button/Button';
import classes from './AssignmentResponsesList.module.css';
import responses from '../../response';
import * as FaIcons from 'react-icons/fa6';

export default function AssignmentsResponsesList() {
    const initialMarks = responses.map(() => false);
    const [mark, setMark] = useState(initialMarks);
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation();
    const getMark = useRef();

    const { groupId, assignmentId } = useParams();
    const location = useLocation();
    const path = location.pathname;

    function handleMark(index) {
        const newMarks = [...mark];
        newMarks[index] = !newMarks[index];
        setMark(newMarks);
    }

    let markValue = t("mark");

    function handleSave(index) {
        let markValue = getMark.current.value;
        const newMarks = [...mark];
        newMarks[index] = false;
        setMark(newMarks);
    }

    const filteredResponses = responses.filter(response =>
        response.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={classes.track_responses}>
            <div className={classes.tracking}>
                <Link to={`/groups/${groupId}/assignments/${assignmentId}/responses-list`} className={path === `/groups/${groupId}/assignments/${assignmentId}/responses-list` ? classes.active : ''}>{t('assigned')}</Link>
                <Link to={`/groups/${groupId}/assignments/${assignmentId}/responses-list/turnedIn`} className={path === `/groups/${groupId}/assignments/${assignmentId}/responses-list/turnedIn` ? classes.active : ''}>{t('turned-in')}</Link>
                <Link to={`/groups/${groupId}/assignments/${assignmentId}/responses-list/gradded`} className={path === `/groups/${groupId}/assignments/${assignmentId}/responses-list/gradded` ? classes.active : ''}>{t("gradded")}</Link>
                <Link to={`/groups/${groupId}/assignments/${assignmentId}/responses-list/all`} className={path === `/groups/${groupId}/assignments/${assignmentId}/responses-list/all` ? classes.active : ''}>{t('all')}</Link>
            </div>
            <div className={classes.search}>
                <input
                    type="text"
                    placeholder={t("search")}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className={`${classes.search_input}`}
                />
            </div>
            <div className={classes.table_wrapper}>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <td>{t("Student-Name")}</td>
                            <td>{t("date")}</td>
                            <td>{t("time")}</td>
                            <td>{t("attachment")}</td>
                            <td>{t("mark")}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResponses.map((response, index) => (
                            <tr key={index}>
                                <td>{response.name}</td>
                                <td>{response.Date}</td>
                                <td>{response.Time}</td>
                                <td>
                                    <Button onSelect={() => openFileInBrowser(/*file Name*/)} text={t("attachment")} />
                                </td>
                                <td className={classes.mark}>
                                    {mark[index] ? (
                                        <input type='number' ref={getMark} placeholder={t('enter-mark')} className={classes.input} />
                                    ) : (
                                        <Button onSelect={() => handleMark(index)} text={`${markValue}`} />
                                    )}
                                    {mark[index] && (
                                        <button onClick={() => handleSave(index)} className={classes.button}>
                                            <FaIcons.FaCheck className={classes.icon} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
