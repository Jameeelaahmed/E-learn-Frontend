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
import ViewCards from '../Pages/ViewCards/ViewCards';
import AssignmentDetails from '../Components/Assignments/AssignmentDetails';
import AssignmentsResponsesList from '../Components/Assignments/AssignmentResponsesList';
import Participants from '../Components/Participants/Paricipants';
import Profile from '../Pages/Profile/Profile';
import StuMain from '../Pages/MainPageSTU/StuMain';
import Container from '../Pages/Chat/Container';
import Users from '../Pages/Users/Users';
import AddEditUser from '../Pages/AddEditUser/addEditUser';
import AdminGroups from '../Pages/AdminGroups/AdminGroups';
import AddEditGroup from '../Pages/AddEditGroup/AddEditGroup';
import AdminSingleGroup from '../Pages/AdminSingleGroup/AdminSingleGroup';
import QSContainer from '../Pages/QuizSurvey/QSContainer';
import Vote from '../Components/Voting/Vote';
import Announcement from '../Pages/Announcement/Announcement';
import QuestionView from '../Components/QuizSurvey/QuestionView';
import StudentsRespondedList from '../Pages/QuizSurvey/StudentsRespondedList';
// Import necessary components and functions
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
    { path: 'users', element: <Users /> },
    { path: 'users/adduser', element: <AddEditUser /> },
    { path: 'users/edituser', element: <AddEditUser /> },
    { path: 'admingroups', element: <AdminGroups /> },
    { path: 'admingroups/addgroup', element: <AddEditGroup /> },
    { path: 'admingroups/editgroup', element: <AddEditGroup /> },
    { path: 'admingroups/:admingroupID', element: <AdminSingleGroup /> },
    { path: 'admingroups/:admingroupID/assignments', element: <AdminSingleGroup /> },
    { path: 'admingroups/:admingroupID/quiz', element: <AdminSingleGroup /> },
    { path: 'admingroups/:admingroupID/participants', element: <AdminSingleGroup /> },
    { path: 'assignments/:assignmentId', element: <AssignmentDetails /> },
    { path: 'chat', element: <Container /> },
    { path: 'chat/:chatId', element: <Container /> }, // Add this route for chat with ID
    { path: 'survey', element: <QSContainer /> },
    { path: 'announcements', element: <Announcement /> },
    { path: 'voting', element: <Voting /> },
    { path: 'voting/:voteId', element: <Vote /> },
    { path: 'survey', element: <QSContainer /> },
    { path: 'survey/:surveyId', element: <QuestionView /> },
    { path: 'survey/:surveyId/responses', element: <StudentsRespondedList /> },
    { path: 'announcements', element: <Announcement /> },
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
            { path: 'assignments', element: <ViewCards /> },
            { path: 'quizzes', element: <ViewCards /> },
            { path: 'quizzes/:quizId', element: <QuestionView /> },
            { path: 'quizzes/:quizId/quizResponses', element: <StudentsRespondedList /> },
            { path: 'assignments/:assignmentId', element: <AssignmentDetails /> },
            { path: 'assignments/:assignmentId/responses-list', element: <AssignmentsResponsesList /> },
            { path: 'assignments/:assignmentId/responses-list', element: <AssignmentsResponsesList /> },
            { path: 'assignments/:assignmentId/responses-list/turnedIn', element: <AssignmentsResponsesList /> },
            { path: 'assignments/:assignmentId/responses-list/gradded', element: <AssignmentsResponsesList /> },
            { path: 'assignments/:assignmentId/responses-list/all', element: <AssignmentsResponsesList /> },
            { path: 'participants', element: <Participants /> }
        ]
    },
    { path: 'voting', element: <Voting /> },
    { path: 'voting/:voteId', element: <Vote /> },
    { path: 'survey', element: <QSContainer /> },
    { path: 'survey/:surveyId', element: <QuestionView /> },
    { path: 'survey/:surveyId/responses', element: <StudentsRespondedList /> },
    { path: 'announcements', element: <Announcement /> },
    { path: 'chat', element: <Container /> },
    { path: 'chat/:chatId', element: <Container /> }, // Add this route for chat with ID

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
            { path: 'assignments', element: <ViewCards /> },
            { path: 'quizzes', element: <ViewCards /> },
            { path: 'quizzes/:quizId', element: <QuestionView /> },
            { path: 'assignments/:assignmentId', element: <AssignmentDetails /> },
            { path: 'assignments/:assignmentId/responses-list', element: <AssignmentsResponsesList /> },
            { path: 'assignments/:assignmentId/responses-list' },
            { path: 'assignments/:assignmentId/responses-list/turnedIn' },
            { path: 'assignments/:assignmentId/responses-list/gradded' },
            { path: 'assignments/:assignmentId/responses-list/all' },
            { path: 'participants', element: <Participants /> }
        ]
    },
    { path: 'voting', element: <Voting /> },
    { path: 'voting/:voteId', element: <Vote /> },
    { path: 'chat', element: <Container /> },
    { path: 'chat/:chatId', element: <Container /> }, // Add this route for chat with ID

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
                            ...(getRole() === 'Staff' ? instructorRoutes : []),
                            ...(getRole() === 'Admin' ? adminRoutes : []),
                            ...(getRole() === 'Student' ? studentRoutes : []),
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