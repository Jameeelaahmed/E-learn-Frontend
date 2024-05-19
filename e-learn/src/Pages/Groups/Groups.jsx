// Groups.js
import classes from './groups.module.css';
import Group from '../../Components/Group/group';
import { useNavigate } from 'react-router-dom';

export default function Groups() {
    const navigate = useNavigate();

    function handleGroupClick(id){
        navigate(`/groups/${id}`);
    };

    const group = [
        {
            id: 1,
            subTitle: "Computer Theory",
            insName: "Dr. Ahmed"
        },
        {
            id: 2,
            subTitle: "Mathematics",
            insName: "Dr. Sara"
        },
        {
            id: 3,
            subTitle: "Physics",
            insName: "Dr. John"
        },
    ];

    return (
        <ul className={classes.classes}>
            {group.map((item, index) => (
                <Group
                    key={index}
                    subTitle={item.subTitle}
                    insName={item.insName}
                    onClick={() => handleGroupClick(item.id)}  // Ensure onClick is properly handled
                />
            ))}
        </ul>
    );
}
