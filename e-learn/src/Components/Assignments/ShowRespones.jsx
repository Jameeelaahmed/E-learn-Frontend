import classes from './Add-Assignment.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ShowRespones() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { assignmentId, groupId } = useParams();

    function handleOpenResponses() {
        navigate(`/groups/${groupId}/assignments/${assignmentId}/responses-list`);
    }

    return (
        <div>
            <div className={classes.AddAssignment}>
                <p className={classes.create_assignment}>{t("show-details")}</p>
                <div className={classes.actions}>
                    <button onClick={handleOpenResponses}>{t("show")}</button>
                </div>
            </div>
        </div>
    );
}
