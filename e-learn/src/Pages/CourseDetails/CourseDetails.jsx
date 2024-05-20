import { Outlet } from "react-router-dom"
import GroupNavCard from "../../Components/group-navigation-card/GroupNavCard"
import GroupNavCardRespo from "../../Components/group-nav-card-responsive/GroupNavCardRespo"
import classes from './Course.module.css'
export default function CourseDetails() {
    return (
        <div className={classes.course_details}>
            <Outlet/>
            <GroupNavCard/>
            <GroupNavCardRespo/>
        </div>
    )
}