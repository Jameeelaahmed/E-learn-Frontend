// RoutesPage.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SemiBody from './Components/SemiBodyLogin/SemiBody';
import Login from './Components/Authentication/Login';
import ForgetPassword from './Components/Authentication/ForgetPassword';
import Otp from './Components/Authentication/Otp';
import SetNewPassword from './Components/Authentication/setNewPassword';
import Error from './Pages/error404/Error';
import RootLayout from './RootLayout';
import InsMain from './Pages/MainPageINS/InsMain';
import PrivateRoutes from './utils/privateRoute';
import Voting from './Components/Voting/Voting';
import Groups from './Pages/Groups/Groups';
import CourseDetails from './Pages/CourseDetails/CourseDetails';
import Weeks from './Components/Weeks/Weeks';

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <SemiBody />,
        errorElement: <Error />,
        children: [
            { path: '/auth', element: <Login /> },
            { path: 'forgetpassword', element: <ForgetPassword /> },
            { path: 'otp', element: <Otp /> },
            { path: 'set-new-password', element: <SetNewPassword /> },
        ]
    },
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                errorElement: <Error/>,
                element: <PrivateRoutes />,
                children: [
                    { path: '/', element: <InsMain/> },
                    {
                        path: '/groups',
                        errorElement: <Error />,
                        element: <Groups />,
                        children: [
                            {
                                path: ':groupId',
                                element: <CourseDetails/>,
                                errorElement: <Error/>,
                                children: [
                                    { path: 'weeks', element: <Weeks/>, errorElement: <Error/> },
                                ]
                            },
                        ]
                    },
                    { path: '/voting', errorElement: <Error />, element: <Voting /> },
                ]
            },
        ]
    },
]);

export default function RoutesPage() {
    return <RouterProvider router={router} />;
}
