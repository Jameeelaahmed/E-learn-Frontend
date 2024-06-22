import classes from './QSNavBar.module.css';
import * as FaIcons from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AddQSModal from './AddQSModal';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import Edit from '../Button/Edit';
import Delete from '../Button/Delete';

export default function QSNavBar({ VSQData }) {
    const { t } = useTranslation();
    const addVSDialog = useRef();
    const navigate = useNavigate(); // Initialize useNavigate

    const [returnFormData, setReturnFormData] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [noSurveys, setNoSurveys] = useState(false);

    function handleOpenAddVSModal() {
        addVSDialog.current.open();
    }

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 930);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    function collectData(data) {
        setReturnFormData(prevData => [...prevData, data]);
        VSQData(data);
    }

    const role = getRole();

    function getRole() {
        return localStorage.getItem('role');
    }

    let wid = "";
    if (role === "Staff") {
        wid = "changeWidth";
    }

    async function DeleteSurvey(id) {
        try {
            const token = getAuthToken();
            const response = await httpRequest('DELETE', `https://elearnapi.runasp.net/api/Survey/Delete/${id}`, token);
            console.log(response);
            if (response.statusCode === 200) {
                fetchSurveys();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchSurveys() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', 'https://elearnapi.runasp.net/api/Survey/GetFromUserGroups', token);
            console.log(response);
            if (response.statusCode === 200) {
                setReturnFormData(response.data);
                setNoSurveys(false);
            } else if (response.statusCode === 404) {
                setNoSurveys(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSurveys();
    }, [VSQData]);

    const handleSurveyClick = (surveyId) => {
        navigate(`/survey/${surveyId}`); // Navigate to the survey page with the surveyId
    };

    return (
        <div className={isMobile ? classes.vs_navigation_bar_responsive : classes.vs_navigation_bar}>
            <AddQSModal ref={addVSDialog} collectFormData={collectData} />
            <div className={classes.add_survey} onClick={handleOpenAddVSModal}>
                <FaIcons.FaPlus className={classes.icon} />
                <p>{t("add-survey")}</p>
            </div>
            {noSurveys ? (
                <p>{t("no-surveys")}</p>
            ) : (
                <ul className={isMobile ? classes.titles_wrapper : ""}>
                    {returnFormData.map((data) => (
                        <div key={data.id} className={classes.box_wrapper}>
                            <li className={wid} key={data.id} onClick={() => handleSurveyClick(data.id)}>
                                {isMobile ? (
                                    <div className={classes.box}>
                                        <p>{data.text}</p>
                                        <p>{data.creatorName}</p>
                                    </div>
                                ) : (
                                    <div className={classes.title_wrapper}>
                                        <FaIcons.FaSquare className={classes.icon} />
                                        <div className={classes.info}>
                                            <span className={classes.title}>{data.text}</span>
                                            <span className={classes.name}>{data.creatorName}</span>
                                        </div>
                                    </div>
                                )}
                            </li>
                            {role === "Staff" && (
                                <div className={classes.control_buttons}>
                                    <Edit />
                                    <Delete onClick={() => DeleteSurvey(data.id)} />
                                </div>
                            )}
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}
