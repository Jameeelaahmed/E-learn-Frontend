import classes from './Assignments.module.css'
import GroupNavCard from '../group-navigation-card/GroupNavCard'
import Group from '../Group/group';
import AddAssignment from './Add-Assignment'
import { log } from "../../log";
import AssignmentDetails from './AssignmentDetails'
import Groups from '../../Pages/Groups/Groups';
import AddWork from './AddWork'
import AssignmentsResponsesList from './AssignmentResponsesList'
import GroupNavCardRespo from '../group-nav-card-responsive/GroupNavCardRespo'
import { useTranslation } from 'react-i18next'

export default function Assignments(){
    const {t}=useTranslation()
    log('<Assignments /> rendered', 1);
    return (
        <div className={classes.assignments}>
            <GroupNavCardRespo/>
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