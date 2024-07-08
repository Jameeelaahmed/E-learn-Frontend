import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import classes from './AssignmentResponsesList.module.css';
import * as FaIcons from 'react-icons/fa6';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import tableClasses from '../../Pages/AdminSingleGroup/AdminSingleGroup.module.css';
import FilterModal from '../FilterModal/FilterModal';
export default function AssignmentsResponsesList() {
    const [responses, setResponses] = useState([]);
    const [filteredResponses, setFilteredResponses] = useState([]);
    const [mark, setMark] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation();
    const getMark = useRef();
    const filterModalRef = useRef()
    const { groupId, assignmentId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    function handleMark(index) {
        const newMarks = [...mark];
        newMarks[index] = !newMarks[index];
        setMark(newMarks);
    }

    async function handleSave(index) {
        let markValue = getMark.current.value;
        const responseToUpdate = responses[index];

        try {
            const token = getAuthToken();
            const response = await httpRequest('POST', `https://elearnapi.runasp.net/api/Assignment/GiveGradeToStudent/${responseToUpdate.id}?Mark=${markValue}`, token);
            console.log(response);
            console.log(responseToUpdate.id);
            if (response.statusCode === 200) {
                const updatedResponses = [...responses];
                updatedResponses[index].mark = markValue;
                setResponses(updatedResponses);
                setFilteredResponses(filterResponses(updatedResponses, searchTerm));
            } else {
                console.log('Failed to update mark');
            }
        } catch (error) {
            console.log(error);
        }

        const newMarks = [...mark];
        newMarks[index] = false;
        setMark(newMarks);
    }

    const filterResponses = (responses, term) => {
        return responses.filter(response =>
            response.fullName.toLowerCase().includes(term.toLowerCase())
        );
    };

    async function fetchAssignmentResponses(filter_by) {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Assignment/GetAssignmentResponses/${assignmentId}?filter_by=${filter_by}`, token);
            if (response.statusCode === 200) {
                setResponses(response.data);
                setFilteredResponses(filterResponses(response.data, searchTerm));
                setMark(response.data.map(() => false)); // Initialize the mark state based on the fetched responses
            } else {
                console.log('No data received from API');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let filter_by = null;
        if (path === `/groups/${groupId}/assignments/${assignmentId}/responses-list/turnedIn`) {
            filter_by = 'not graded';
        } else if (path === `/groups/${groupId}/assignments/${assignmentId}/responses-list/gradded`) {
            filter_by = 'graded';
        }
        fetchAssignmentResponses(filter_by);
    }, [path, assignmentId]);

    useEffect(() => {
        setFilteredResponses(filterResponses(responses, searchTerm));
    }, [searchTerm, responses]);

    const handleLinkClick = (filter_by) => {
        let newPath = `/groups/${groupId}/assignments/${assignmentId}/responses-list`;
        if (filter_by === 'not graded') {
            newPath += '/turnedIn';
        } else if (filter_by === 'graded') {
            newPath += '/gradded';
        }
        navigate(newPath);
        fetchAssignmentResponses(filter_by);
    };

    const openFileInBrowser = (fileURL) => {
        window.open(fileURL, '_blank');
    };

    return (
        <div className={classes.track_responses}>
            <div className={classes.tracking}>
                <Link to={`/groups/${groupId}/assignments/${assignmentId}/responses-list`} className={path === `/groups/${groupId}/assignments/${assignmentId}/responses-list` ? classes.active : ''} onClick={() => handleLinkClick(null)}>{t('assigned')}</Link>
                <Link to={`/groups/${groupId}/assignments/${assignmentId}/responses-list/turnedIn`} className={path === `/groups/${groupId}/assignments/${assignmentId}/responses-list/turnedIn` ? classes.active : ''} onClick={() => handleLinkClick('not graded')}>{t('turned-in')}</Link>
                <Link to={`/groups/${groupId}/assignments/${assignmentId}/responses-list/gradded`} className={path === `/groups/${groupId}/assignments/${assignmentId}/responses-list/gradded` ? classes.active : ''} onClick={() => handleLinkClick('graded')}>{t("graded")}</Link>
                <Link to={`/groups/${groupId}/assignments/${assignmentId}/responses-list/all`} className={path === `/groups/${groupId}/assignments/${assignmentId}/responses-list/all` ? classes.active : ''} onClick={() => handleLinkClick(null)}>{t('all')}</Link>
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
            {/* <FaIcons.FaFilter onClick={() => { filterModalRef.current.open(); }} />
            <FilterModal ref={filterModalRef} /> */}
            <div className={classes.table_wrapper}>
                <ul>
                    <div className={tableClasses.table_content}>
                        <div className={tableClasses.table_head}>
                            <p>Number</p>
                            <p>{t("Student-Name")}</p>
                            <p>{t("date")}</p>
                            <p>{t("time")}</p>
                            <p>{t("attachment")}</p>
                            <p>{t("mark")}</p>
                        </div>
                        {filteredResponses.length > 0 ? filteredResponses.map((response, index) => (
                            <li key={response.id}>
                                <p>{response.fullName}</p>
                                <p>{response.uploadDate}</p>
                                <p>{response.uploadTime}</p>
                                <p>
                                    <Button onSelect={() => openFileInBrowser(response.fileURL)} text={t("attachment")} />
                                </p>
                                <p className={classes.mark}>
                                    {response.mark ? (
                                        <span>{response.mark}</span>
                                    ) : (
                                        mark[index] ? (
                                            <input type='number' ref={getMark} placeholder={t('enter-mark')} className={classes.input} />
                                        ) : (
                                            <Button onSelect={() => handleMark(index)} text={t("mark")} />
                                        )
                                    )}
                                    {mark[index] && (
                                        <button onClick={() => handleSave(index)} className={classes.button}>
                                            <FaIcons.FaCheck className={classes.icon} />
                                        </button>
                                    )}
                                </p>
                                <p>{new Date(item.creationDate).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                            </li>
                        )) : (
                            <p>{t("No responses found")}</p>
                        )}
                    </div>
                </ul>
            </div>
        </div>
    );
}
