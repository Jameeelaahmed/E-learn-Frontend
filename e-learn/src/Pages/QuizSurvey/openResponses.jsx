import Button from '../../Components/Button/Button';
import classes from './openResponses.module.css';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import ResponsesModal from './ResponsesModal';

export default function openResponses() {
    const { t } = useTranslation();

    return (
        <div className={classes.responses}>
            <Link to="/survey/:surveyId/responses">
                <Button text={t("Open Responses")} />
            </Link>
        </div>
    );
}
