import classes from './Profile.module.css'

export default function Data({label,name}){
    return(
        <div className={classes.data}>
            <p className={classes.label}>{label}</p>
            <p className={classes.text}>{name}</p>
        </div> 
    )
}