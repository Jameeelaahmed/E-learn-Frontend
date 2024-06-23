import classes from './groups.module.css';
import Group from '../../Components/Group/group';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import { useEffect, useState } from 'react';

export default function Groups() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    console.log(path)
    const Params = useParams();
    const groupId = Params.groupId;
    console.log(groupId);
    const [group, setGroup] = useState([]); // Initialize group state
    const [assignments, setAssignments] = useState([]); // Initialize assignments state
    const [quizzes, setQuizzes] = useState([]); // Initialize quizzes state

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
            console.log('fetching Assignment');
            const token = getAuthToken();
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Assignment/GetByGroupId/${groupId}`, token);
            console.log(response);
            if (response.statusCode === 200) {
                console.log('Assignments fetched successfully');
                setAssignments(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    }

    useEffect(() => {
        if (groupId) {
            fetchAssignments(); // Call fetchAssignments when the component mounts or groupId changes
        }
    }, [groupId]);

    async function fetchQuizzes() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Quiz/GetQuizzesFromGroup?groupId=${groupId}`, token);
            // console.log(response);
            if (response.statusCode === 200) {
                console.log('Quizzes fetched successfully');
                setQuizzes(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    }

    useEffect(() => {
        if (groupId) {
            fetchQuizzes(); // Call fetchQuizzes when the component mounts or groupId changes
        }
    }, [groupId]);

    // Handle group click event
    function handleGroupClick(id) {
        navigate(`/groups/${id}`);
    }

    // Handle assignment click event
    function handleAssignmentClick(id) {
        navigate(`/groups/${groupId}/assignments/assignm${id}`);
    }

    // Handle quiz click event and fetch quiz details
    async function handleQuizClick(id) {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Quiz/GetById/${id}`, token);
            console.log('Quiz Id:', id);
            console.log(response);
            if (response.statusCode === 200) {
                console.log('Quiz details fetched successfully');
                const quizData = response.data;
                navigate(`/groups/${groupId}/quizzes/quiz${id}`, { state: { quiz: quizData } });
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    }

    console.log(location.pathname);
    console.log('hello');
    return (
        <ul className={classes.classes}>
            {location.pathname.endsWith("/groups") &&
                group.map((item, index) => (
                    <Group
                        key={index}
                        subTitle={item.name}
                        insName={item.instructorName}
                        onClick={() => handleGroupClick(item.id)}
                    />
                ))
            }
            {location.pathname.endsWith("/assignments") &&
                // assignments.map((item, index) => (
                //     <Group
                //         key={index}
                //         subTitle={item.title}
                //         insName={item.creatorName}
                //         onClick={() => handleAssignmentClick(item.id)}
                //     />
                // ))
                <>
                    <Group
                        key={index}
                        subTitle="cc"
                        insName="ff"
                    // onClick={() => handleAssignmentClick(item.id)}
                    />
                    <Group
                        key={index}
                        subTitle={item.title}
                        insName={item.creatorName}
                        onClick={() => handleAssignmentClick(item.id)}
                    />
                    <Group
                        key={index}
                        subTitle={item.title}
                        insName={item.creatorName}
                        onClick={() => handleAssignmentClick(item.id)}
                    />
                    <Group
                        key={index}
                        subTitle={item.title}
                        insName={item.creatorName}
                        onClick={() => handleAssignmentClick(item.id)}
                    />
                </>
            }
            {location.pathname.endsWith("/quizzes") &&
                quizzes.map((item, index) => (
                    <Group
                        key={index}
                        subTitle={item.title}
                        insName={item.creatorName}
                        onClick={() => handleQuizClick(item.id)}
                    />
                ))
            }
        </ul>
    );
}
