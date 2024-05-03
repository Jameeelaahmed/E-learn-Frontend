import classes from './Assignments.module.css'
import GroupNavCard from '../group-navigation-card/GroupNavCard'
import GroupNavCardRespo from '../group-nav-card-responsive/GroupNavCardRespo'
import Class from '../Class/class'
import AddAssignment from './Add-Assignment'
import { log } from "../../log";
export default function Assignments() {
    log('<Assignments /> rendered', 1);
    return (
        <div className={classes.assignments}>
            <GroupNavCardRespo></GroupNavCardRespo>
            <Class></Class>
            <div className={classes.col}>
                <GroupNavCard></GroupNavCard>
                <AddAssignment></AddAssignment>
            </div>
        </div>
    )
}