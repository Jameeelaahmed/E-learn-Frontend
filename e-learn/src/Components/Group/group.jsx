import classes from './group.module.css'
import { useLocation } from 'react-router-dom'
export default function Group({ subTitle, insName, onClick }) {
    function getRole() {
        return localStorage.getItem('role');
    }
    const role = getRole();
    const location = useLocation();
    const path = location.pathname;
    return (
        <div onClick={onClick} className={classes.class}>
            <p className={classes.title}>{subTitle}</p>
            {role === 'Student' &&
                <div className={classes.groupfoot}>
                    <p className={classes.name}>{insName}</p>
                    {path.includes('assignments') &&
                        <p>grade</p>
                    }
                </div>
            }
        </div>
    )
}