 import classes from './groups.module.css';

import Group from '../../Components/Group/group';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export default function Groups() {
    const navigate = useNavigate();
    const Loction = useLocation();
    const path = Loction.pathname;
    // console.log(path);
    function handleGroupClick(id) {
        navigate(`group${id}`);
    };
    function handleAssignmentClick(id) {
        navigate(`assignment${id}`);
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
    const assignments = [
        {
            id: 1,
            subTitle: "Assignment 1",
            insName: "Dr. Ahmed"
        },
        {
            id: 2,
            subTitle: "Assignment 2",
            insName: "Dr. Sara"
        },
        {
            id: 3,
            subTitle: "Assignment 3",
            insName: "Dr. John"
        },
    ];

    return (
        <ul className={classes.classes}>
            {path === "/groups" &&
                group.map((item, index) => (
                    <Group
                        key={index}
                        subTitle={item.subTitle}
                        insName={item.insName}
                        onClick={() => handleGroupClick(item.id)}  // Ensure onClick is properly handled
                    />
                ))
            }
            {path === "/groups/assignments" &&
                assignments.map((item, index) => (
                    <Group
                        key={index}
                        subTitle={item.subTitle}
                        insName={item.insName}
                        onClick={() => handleAssignmentClick(item.id)}  // Ensure onClick is properly handled
                    />
                ))
            }
        </ul>
    );
}