import classes from './Assignments.module.css'
import GroupNavCard from '../../Components/group-navigation-card/GroupNavCard'
import Group from '../../Components/Group/group';
import AddAssignment from '../../Components/Assignments/Add-Assignment'
import { log } from "../../log";
import AssignmentDetails from '../../Components/Assignments/AssignmentDetails'
import Groups from '../Groups/Groups';
import AddWork from '../../Components/Assignments/AddWork'
import AssignmentsResponsesList from '../../Components/Assignments/AssignmentResponsesList'
import GroupNavCardRespo from '../../Components/group-nav-card-responsive/GroupNavCardRespo'
import { useTranslation } from 'react-i18next'

export default function Assignments() {
    const { t } = useTranslation()
    log('<Assignments /> rendered', 1);
    return (
        <div className={classes.assignments}>
            <GroupNavCardRespo />
            {/* <Classes/> */}
            {/* <AssignmentDetails/> */}
            <AssignmentsResponsesList />
            <div className={classes.col}>
                <GroupNavCard></GroupNavCard>
                {/* <AddAssignment></AddAssignment> */}
                {/* <AddWork/> */}
            </div>
        </div>
    )
}