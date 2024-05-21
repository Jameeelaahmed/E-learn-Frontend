import classes from './Assignments.module.css';
import { log } from "../../log";
import Groups from '../Groups/Groups';
// import AssignmentDetails from '../../Components/Assignments/AssignmentDetails';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function Assignments() {
    const { t } = useTranslation();
    log('<Assignments /> rendered', 1);
    const location = useLocation();
    const path = location.pathname;
    console.log(path);

    return (
        <div className={classes.assignments}>
            {path === '/groups/assignments' && <Groups />}
        </div>
    );
}
