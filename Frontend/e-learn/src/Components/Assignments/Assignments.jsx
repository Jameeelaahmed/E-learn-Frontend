import classes from './Assignments.module.css'
import GroupNavCard from '../group-navigation-card/GroupNavCard'
import Class from '../Class/class'
import AddAssignment from './Add-Assignment'
import { log } from "../../log";
import AssignmentDetails from './AssignmentDetails'
import Classes from '../Classes/Classes'
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
                {/* <Class></Class> */}
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