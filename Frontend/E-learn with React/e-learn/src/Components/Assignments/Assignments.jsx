import classes from './Assignments.module.css'


export default function Assignments({children}){
    return(
    <div className={classes.assignments}>
        {children}
    </div>
    )
}