import Button from '../../Components/Button/Button';
import classes from './openResponses.module.css';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ResponsesModal from './ResponsesModal';

export default function OpenResponses() {
    const { t } = useTranslation();
    const location = useLocation()
    const path = location.pathname;
    const navigate = useNavigate();
    const { quizId, groupId, surveyId } = useParams();
    function handleOpenSurveyResponses() {
        navigate(`/survey/${surveyId}/responses`)
    }

    function handleOpenQuizResponses() {
        navigate(`/groups/${groupId}/quizzes/${quizId}/quizResponses`)
    }
    return (
        <>

            {
                path.includes('/survey') &&
                <div className={classes.responses}>
                    <Button onSelect={handleOpenSurveyResponses} text={t("Open Responses")} />
                </div>
            }
            {
                path.includes('/quiz') &&
                <div className={classes.responses_quiz}>
                    <Button onSelect={handleOpenQuizResponses} text={t("Open Responses")} />
                </div>
            }
        </>
    );
}
