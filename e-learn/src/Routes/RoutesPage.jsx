import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SemiBody from '../Components/SemiBodyLogin/SemiBody';
import Login from '../Components/Authentication/Login';
import ForgetPassword from '../Components/Authentication/ForgetPassword';
import Otp from '../Components/Authentication/Otp';
import SetNewPassword from '../Components/Authentication/setNewPassword';
import Error from '../Pages/error404/Error';
import RootLayout from './RootLayout';
import InsMain from '../Pages/MainPageINS/InsMain';
import PrivateRoutes from '../utils/privateRoute';
import Voting from '../Components/Voting/Voting';
import Groups from '../Pages/Groups/Groups';
import CourseDetails from '../Pages/CourseDetails/CourseDetails'
import Weeks from '../Components/Weeks/Weeks';
import Assignments from '../Pages/Assignments/Assignments'
import AssignmentDetails from '../Components/Assignments/AssignmentDetails'
import AssignmentsResponsesList from '../Components/Assignments/AssignmentResponsesList'
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
                    { path: '', element: <InsMain /> },
                    { path: 'groups', element: <Groups /> },
                    {
                        path: ':groupId',
                        element: <CourseDetails />,
                        children: [
                            { path: ':groupId', element: <Weeks /> },
                            { path: 'assignments', element: <Assignments /> },
                            { path: 'assignments/:assignmentId', element: <AssignmentDetails /> },
                            { path: ':assignmentId/responses-list', element: <AssignmentsResponsesList /> },
                        ]
                    },
                    { path: 'voting', element: <Voting /> },
                ]
            },
        ]
    },
]);

export default function RoutesPage() {
    return <RouterProvider router={router} />;
}
