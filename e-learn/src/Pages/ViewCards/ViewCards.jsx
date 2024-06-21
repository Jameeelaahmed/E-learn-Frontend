import classes from './ViewCards.module.css';
import { log } from "../../log";
import Groups from '../Groups/Groups';
import { useParams } from 'react-router-dom';
// import AssignmentDetails from '../../Components/Assignments/AssignmentDetails';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function ViewCards() {
    const { t } = useTranslation();
    const { groupId } = useParams();
    log('<Assignments /> rendered', 1);
    const location = useLocation();
    const path = location.pathname;
    return (
        <div className={classes.assignments}>
            {path.endsWith(`assignments`) || path.endsWith('quizzes') && <Groups />}
        </div>
    );
}
