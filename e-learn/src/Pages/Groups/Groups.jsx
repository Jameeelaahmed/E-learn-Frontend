import classes from './groups.module.css';
import Group from '../../Components/Group/group';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import { useEffect, useState } from 'react';

export default function Groups() {
    const navigate = useNavigate();
    const location = useLocation();
    const { groupId } = useParams();
    const [group, setGroup] = useState([]); // Initialize group state
    const [assignments, setAssignments] = useState([]); // Initialize assignments state
    // Fetch groups from the API
    async function fetchGroups() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', 'https://elearnapi.runasp.net/api/Group/GetUserGroups', token);
            if (response.statusCode === 200) {
                console.log('Groups fetched successfully');
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

    // Fetch assignments from the API
    async function fetchAssignments() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Assignment/GetByGroupId/${groupId}`, token);
            console.log(response);
            if (response.statusCode === 200) {
                console.log('Assignments fetched successfully');
                setAssignments(response.data); // Update the assignments state with the fetched data
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    }
    useEffect(() => {
        fetchAssignments(); // Call fetchAssignments when the component mounts
    }, []);

    // Handle group click event
    function handleGroupClick(id) {
        navigate(`/groups/${id}`);
    }

    // Handle assignment click event
    function handleAssignmentClick(id) {
        navigate(`assignments/${id}`);
    }

    // const assignments = [
    //     {
    //         id: 1,
    //         subTitle: "Assignment 1",
    //         insName: "Dr. Ahmed"
    //     },
    //     {
    //         id: 2,
    //         subTitle: "Assignment 2",
    //         insName: "Dr. Sara"
    //     },
    //     {
    //         id: 3,
    //         subTitle: "Assignment 3",
    //         insName: "Dr. John"
    //     },
    // ];

    return (
        <ul className={classes.classes}>
            {location.pathname === "/groups" &&
                group.map((item, index) => (
                    <Group
                        key={index}
                        subTitle={item.name}
                        insName={item.instructorName}
                        onClick={() => handleGroupClick(item.id)} // Ensure onClick is properly handled
                    />
                ))
            }
            {location.pathname === `/groups/assignments` &&
                assignments.map((item, index) => (
                    <Group
                        key={index}
                        subTitle={item.title}
                        insName={item.creatorName}
                        onClick={() => handleAssignmentClick(item.id)} // Ensure onClick is properly handled
                    />
                ))
            }
        </ul>
    );
}
