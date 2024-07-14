import classes from './Button.module.css';
import { useLocation, useParams } from 'react-router-dom';

export default function Button({ text, onSelect, id, customClass }) {
    const location = useLocation();
    const path = location.pathname;
    const { groupId, quizId } = useParams();
    return (
        <button
            id={id}
            onClick={onSelect}
            className={`${classes.button} 
            ${(path === "/users/adduser" ||
                    path === "/users/edituser" ||
                    path === "/admingroups/addgroup" ||
                    path === "/admingroups/editgroup" ||
                    path === `/groups/${groupId}/quizzes/${quizId}/quizResponses`) ? classes.fit : ""} ${customClass}`}
        >
            {text}
        </button>
    );
}
