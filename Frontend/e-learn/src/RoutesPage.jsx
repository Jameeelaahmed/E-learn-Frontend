import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react';
import SemiBody from "./Components/SemiBodyLogin/SemiBody";
import Login from "./Components/Authentication/Login";
import ForgetPassword from "./Components/Authentication/ForgetPassword";
import Otp from "./Components/Authentication/Otp";
import SetNewPassword from "./Components/Authentication/setNewPassword";
import Error from "./Pages/error404/Error";
import RootLayout from "./RootLayout";
import InsMain from "./Pages/MainPageINS/InsMain";
import PrivateRoutes from "./utils/privateRoute";
import Classes from "./Components/Classes/Classes";
import Voting from "./Components/Voting/Voting";
const router = createBrowserRouter([
    {
        path: '/auth',
        element: <SemiBody />,
        errorElement: <Error></Error>,
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
                errorElement: <Error></Error>,
                element: <PrivateRoutes/>,
                children: [
                    { path: '/', element: <InsMain /> },
                    { path:'/groups' ,errorElement:<Error/>, element:<Classes></Classes>},
                    { path:'/voting' ,errorElement:<Error/>, element:<Voting></Voting>},
                    // { path:'/survey' ,errorElement:<Error/>, element:<></ٍ>},
                    // { path:'/announcment' ,errorElement:<Error/>, element:<Voting></Voting>},
                    // { path:'/voting' ,errorElement:<Error/>, element:<Voting></Voting>},
                ]
            },
        ]
    }
]);

export default function RoutesPage() {
    return <RouterProvider router={router}></RouterProvider>;
}
