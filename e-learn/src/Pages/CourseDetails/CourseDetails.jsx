import { Outlet, useParams, useLocation } from "react-router-dom";
import GroupNavCard from "../../Components/group-navigation-card/GroupNavCard";
import GroupNavCardRespo from "../../Components/group-nav-card-responsive/GroupNavCardRespo";
import classes from './Course.module.css';
import AddWork from "../../Components/Assignments/AddWork";
import AddAssignment from "../../Components/Assignments/Add-Assignment";
import ShowRespones from '../../Components/Assignments/ShowRespones';
import AddQuiz from "./AddQuiz";
import Questionflag from "../Quizzes/Questionflag";

export default function CourseDetails() {
    const location = useLocation();
    const path = location.pathname;
    const { assignmentId, quizId } = useParams();
    const role = getRole();

    function getRole() {
        return localStorage.getItem('role');
    }

    return (
        <div className={classes.course_details}>
            <GroupNavCardRespo />
            <Outlet />
            <div className={classes.col}>
                <GroupNavCard />
                {(role === 'Staff' || role === "Admin") && (
                    (path.endsWith(`assignments`) && <AddAssignment />) ||
                    (path.endsWith(`quizzes`) && <AddQuiz />) ||
                    (path.includes(`assignments/${assignmentId}`) && <ShowRespones />)
                )}
                {role === 'Student' && (path.includes(`assignments/${assignmentId}`) && <AddWork />)}
                {path.includes(`quizzes/${quizId}`) && <Questionflag />}
            </div>
        </div>
    );
}
