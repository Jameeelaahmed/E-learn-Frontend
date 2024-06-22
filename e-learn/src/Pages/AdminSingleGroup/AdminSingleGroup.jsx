import { useRef, useState, useEffect } from 'react';
import classes from './AdminSingleGroup.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa6'
import AddModal from './AddModal';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';

export default function AdminSingleGroup() {
    const { t } = useTranslation();
    const navigate = useNavigate(); // Initialize useHistory hook
    const location = useLocation();
    const path = location.pathname;
    const [activeSection, setActiveSection] = useState('material');
    const [direction, setDirection] = useState('left');
    const sections = ['Material', 'Assignments', 'Quizzes', 'Participants'];
    const { admingroupID, assignmentId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [material, setMaterial] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [participants, setParticipants] = useState([]);
    const param = useParams();
    const groupId = param.admingroupID;

    const AddModalRef = useRef();

    function handleAddModal() {
        AddModalRef.current.open();
    }

    // Define paths for each section with correct interpolation
    const sectionPaths = {
        Material: `/admingroups/${admingroupID}`,
        Assignments: `/admingroups/${admingroupID}/assignments`,
        Quizzes: `/admingroups/${admingroupID}/quiz`,
        Participants: `/admingroups/${admingroupID}/participants`
    };

    const handleClick = (section) => {
        const newSectionIndex = sections.indexOf(section);
        const oldSectionIndex = sections.indexOf(activeSection);
        if (newSectionIndex > oldSectionIndex) {
            setDirection('right');
        } else if (newSectionIndex < oldSectionIndex) {
            setDirection('left');
        }
        setActiveSection(section);
        navigate(sectionPaths[section]);
    };

    function handleOpen(viewUrl) {
        const officeUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(viewUrl)}`;
        window.open(officeUrl, '_blank');
    }

    async function getMaterial() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Material/GetAllFromGroup/${groupId}`, token);
            console.log(response);
            if (response.statusCode === 200) {
                setMaterial(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('an error occurred:', error);
        }
    }

    useEffect(() => {
        getMaterial();
    }, [groupId])

    async function getAssignments() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Assignment/GetByGroupId/${groupId}`, token);
            console.log(response);
            if (response.statusCode === 200) {
                setAssignments(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('an error occurred:', error);
        }
    }
    useEffect(() => {
        getAssignments();
    }, [groupId])

    async function getQuizzes() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Quiz/GetQuizzesFromGroup?groupId=${groupId}`, token);
            console.log(response);
            if (response.statusCode === 200) {
                setQuizzes(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('an error occurred:', error);
        }
    }
    useEffect(() => {
        getQuizzes();
    }, [path, groupId, admingroupID])

    async function getParticipants() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Group/GetGroupParticipants/${groupId}`, token);
            console.log(response);
            if (response.statusCode === 200) {
                setParticipants(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('an error occurred:', error);
        }
    }
    useEffect(() => {
        getParticipants();
    }, [groupId])
    return (
        <>
            <div className={classes.add_button}>
                <div className={classes.search}>
                    <input
                        type="text"
                        placeholder={t("search")}
                        value={searchTerm}
                        className={`${classes.search_input}`}
                    />
                </div>
                <div onClick={handleAddModal} className={classes.add}>
                    <FaIcons.FaCirclePlus />
                </div>
                <AddModal ref={AddModalRef}></AddModal>
            </div>
            <div className={classes.head}>
                {sections.map((section) => (
                    <div
                        key={section}
                        className={`${classes.section} ${activeSection === section ? classes.active : ''} ${activeSection === section && direction === 'right' ? classes.activeRight : ''} ${activeSection === section && direction === 'left' ? classes.activeLeft : ''}`}
                        onClick={() => handleClick(section)}
                    >
                        <p>{t(section)}</p>
                    </div>
                ))}
            </div>
            <div className={classes.table}>
                <ul>
                    {path === `/admingroups/${admingroupID}` &&
                        <div className={classes.table_content}>
                            <div className={classes.table_head}>
                                <p>Number</p>
                                <p>{t("Material name")}</p>
                                <p>{t("Instructor Name")}</p>
                                <p>{t("Week Number")}</p>
                                <p>{t("Material Type")}</p>
                                <p>{t("Date")}</p>
                            </div>
                            {material.map((item, index) => (
                                <li key={item.id}>
                                    <p>{index + 1}</p>
                                    <p onClick={() => handleOpen(item.viewUrl)} className={classes.hoverd}>{item.title}</p>
                                    <p>{item.creatorName}</p>
                                    <p>{item.week}</p>
                                    <p>{item.type === 0 ? t("Lecture") : t("Section")}</p>
                                    <p>{new Date(item.creationDate).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                                </li>
                            ))}
                        </div>
                    }
                    {path === `/admingroups/${admingroupID}/assignments` &&
                        <>
                            <div className={classes.table_head}>
                                <p>Number</p>
                                <p>{t("Assignment Title")}</p>
                                <p>{t("Instructor Name")}</p>
                                <p>{t("Total Marks")}</p>
                                <p>{t("Date")}</p>
                            </div>
                            {/* MAP  */}
                            {assignments.map((item, index) => (
                                <li key={item.id}>
                                    <p>{index + 1}</p>
                                    <p className={classes.hoverd}>{item.title}</p>
                                    <p>{item.creatorName}</p>
                                    <p>{item.grade || 0}</p>
                                    <p>{new Date(item.end).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                                </li>
                            ))}

                        </>
                    }
                    {path === `/admingroups/${admingroupID}/quiz` &&
                        <>
                            <div className={classes.table_head}>
                                <p>Number</p>
                                <p className={classes.hoverd}>{t("Quiz Title")}</p>
                                <p>{t("Instructor Name")}</p>
                                <p>{t("Total Marks")}</p>
                                <p>{t("Date")}</p>
                            </div>

                            {/* MAP  */}
                            {quizzes.map((item, index) => (
                                <li key={item.id}>
                                    <p>{index + 1}</p>
                                    <p>{item.title}</p>
                                    <p>{item.creatorName}</p>
                                    <p>{item.grade || 0}</p>
                                    <p>{new Date(item.end).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                                </li>
                            ))}
                        </>
                    }
                    {path === `/admingroups/${admingroupID}/participants` &&
                        <>
                            <div className={classes.table_head}>
                                <p>Number</p>
                                <p>{t("ID")}</p>
                                <p>{t("Name")}</p>
                                <p>{t("department")}</p>
                                <p>{t("Level")}</p>
                            </div>
                            {/* MAP  */}
                            {participants.map((item, index) => (
                                <li key={item.id}>
                                    <p>{index + 1}</p>
                                    <p>{item.userName}</p>
                                    <p>{item.name}</p>
                                    <p>{item.departmentName}</p>
                                    <p>{item.grade}</p>
                                </li>
                            ))}
                        </>
                    }
                </ul>
            </div>
        </>
    );
}
