import classes from './SemiBody.module.css'
import { Outlet } from 'react-router-dom';

export default function SemiBody(){
    return(
        <>
        <div className={classes.square_one}></div>
        <div className={classes.square_two}></div>
        <section className={classes.semi_body}>
            <Outlet/>
        </section>
        </>
    )
}