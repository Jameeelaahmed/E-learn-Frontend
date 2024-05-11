import { createBrowserRouter ,RouterProvider } from "react-router-dom";
import React from 'react';
import SemiBody from "./Components/SemiBodyLogin/SemiBody";
import Login from "./Components/Authentication/Login";
import ForgetPassword from "./Components/Authentication/ForgetPassword";
import Otp from "./Components/Authentication/Otp";
import SetNewPassword from "./Components/Authentication/setNewPassword";

const router=createBrowserRouter([
    {
        path:'/',
        element:<SemiBody/>,
        children:[
            {path:'/',element:<Login/>},
            {path:'/forgetpassword',element:<ForgetPassword/>},
            {path:'/otp',element:<Otp/>},
            {path:'/set-new-password',element:<SetNewPassword/>}
        ]
    }
])

export default function RoutesPage() {
    return <RouterProvider router={router}></RouterProvider>
};

