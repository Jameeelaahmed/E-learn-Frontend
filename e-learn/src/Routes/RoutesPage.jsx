import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import SemiBody from '../Components/SemiBodyLogin/SemiBody';
import Login from '../Components/Authentication/Login';
import ForgetPassword from '../Components/Authentication/ForgetPassword';
import Otp from '../Components/Authentication/Otp';
import SetNewPassword from '../Components/Authentication/setNewPassword';
import Error from '../Pages/error404/Error';
import RootLayout from './RootLayout';
import InsMain from '../Pages/MainPageINS/InsMain';
import PrivateRoutes from '../utils/privateRoute';
import Voting from '../Pages/Voting/Voting';
import Groups from '../Pages/Groups/Groups';
import CourseDetails from '../Pages/CourseDetails/CourseDetails';
import Weeks from '../Components/Weeks/Weeks';
import Assignments from '../Pages/Assignments/Assignments';
import AssignmentDetails from '../Components/Assignments/AssignmentDetails';
import AssignmentsResponsesList from '../Components/Assignments/AssignmentResponsesList';
import Participants from '../Components/Participants/Paricipants';
import Profile from '../Pages/Profile/Profile';
import StuMain from '../Pages/MainPageSTU/StuMain';
import Container from '../Pages/Chat/Container';
import Users from '../Pages/Users/Users';


function RoleBasedRoutes() {
    const role = getRole();
    if (role === 'Staff') {
        return <Outlet />;
    } else if (role === 'Student') {
        return <Outlet />;
    } else if (role === 'Admin') {
        return <Outlet />;
    } else {
        return <Navigate to="/auth" />;
    }
}

function getRole() {
    return localStorage.getItem('role');
}

const adminRoutes = [
    { path: 'users', element: <Users /> }
];

const instructorRoutes = [
    { path: '/InsMain', element: <InsMain /> },
    { path: 'profile', element: <Profile /> },
    { path: 'groups', element: <Groups /> },
    {
        path: 'groups/:groupId',
        element: <CourseDetails />,
        children: [
            { path: '', element: <Weeks role={getRole()} /> },
            { path: 'assignments', element: <Assignments /> },
            { path: 'assignments/:assignmentId', element: <AssignmentDetails /> },
            { path: 'assignments/:assignmentId/responses-list', element: <AssignmentsResponsesList /> },
            { path: 'participants', element: <Participants /> }
        ]
    },
    { path: 'voting', element: <Voting /> },
    { path: 'chat', element: <Container /> },
];

const studentRoutes = [
    { path: '/stuMain', element: <StuMain /> },
    { path: 'groups', element: <Groups /> },
    { path: 'profile', element: <Profile /> },
    {
        path: 'groups/:groupId',
        element: <CourseDetails />,
        children: [
            { path: '', element: <Weeks role={getRole()} /> },
            { path: 'assignments', element: <Assignments /> },
            { path: 'assignments/:assignmentId', element: <AssignmentDetails /> },
            { path: 'assignments/:assignmentId/responses-list', element: <AssignmentsResponsesList /> },
            { path: 'participants', element: <Participants /> }
        ]
    },
    { path: 'voting', element: <Voting /> },
    { path: 'chat', element: <Container /> },
];

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <SemiBody />,
        errorElement: <Error />,
        children: [
            { path: '', element: <Login /> },
            { path: 'forgetpassword', element: <ForgetPassword /> },
            { path: 'otp', element: <Otp /> },
            { path: 'set-new-password', element: <SetNewPassword /> },
        ]
    },
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <Error />,
        children: [
            {
                element: <PrivateRoutes />,
                children: [
                    {
                        path: '/',
                        element: <RoleBasedRoutes />,
                        children: [
                            ...getRole() === 'Staff' ? instructorRoutes : [],
                            ...getRole() === "Admin" ? adminRoutes : [],
                            ...getRole() === "Student" ? studentRoutes : [],
                        ],
                    },
                ],
            },
        ],
    },
]);



export default function RoutesPage() {
    return <RouterProvider router={router} />;
}
