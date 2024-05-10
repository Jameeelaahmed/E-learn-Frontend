import classes from './SemiBody.module.css'
import { createBrowserRouter ,RouterProvider} from "react-router-dom";

// const router=createBrowserRouter([
//     {path:'/login',element:<Login/>},
//     {path:'/forgetpassword',element:<ForgetPassword/>},
//     {path:'/otp',element:<Otp/>},
//     {path:'/setnewpassword',element:<SetNewPassword/>},
// ])

export default function SemiBody({children}){
    return(
        <>
        <div className={classes.square_one}></div>
        <div className={classes.square_two}></div>
        <section className={classes.semi_body}>
            {/* <RouterProvider router={router}/> */}
            {children}
        </section>
        </>
        
    )
}