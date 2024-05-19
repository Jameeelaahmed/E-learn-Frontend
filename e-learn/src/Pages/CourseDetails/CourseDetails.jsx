import { Outlet } from "react-router-dom"
import GroupNavCard from "../../Components/group-navigation-card/GroupNavCard"
import GroupNavCardRespo from "../../Components/group-nav-card-responsive/GroupNavCardRespo"
export default function CourseDetails() {
    return (
        <div>
            <GroupNavCard/>
            <Outlet/>
            <GroupNavCardRespo/>
        </div>
    )
}