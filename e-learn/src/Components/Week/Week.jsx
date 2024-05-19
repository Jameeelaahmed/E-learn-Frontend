import classes from './Week.module.css'
export default function Week({children}){
    return(
        <div className={classes.week}>
            {children}
        </div>
        )
}