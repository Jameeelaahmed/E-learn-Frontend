import classes from './groups.module.css';
import Group from '../../Components/Group/group';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import { useEffect, useState } from 'react';

export default function Groups() {
    const navigate = useNavigate();
    const Loction = useLocation();
    const path = Loction.pathname;
    const [group, setGroup] = useState([]); // Initialize group state
    // console.log(path);
    function handleGroupClick(id) {
        navigate(`group${id}`);
    };
    function handleAssignmentClick(id) {
        navigate(`assignment${id}`);
    };

    async function fetchGroups() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', 'https://elearnapi.runasp.net/api/Group/GetUserGroups', token);
            if (response.statusCode === 200) {
                console.log('Groups fetched successfully');
                console.log(response.data);
                setGroup(response.data); // Update the group state with the fetched data
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    }
    useEffect(() => {

        fetchGroups(); // Call fetchGroups when the component mounts
    
      }, []);
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
                        subTitle={item.name}
                        insName={item.instructorName}
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