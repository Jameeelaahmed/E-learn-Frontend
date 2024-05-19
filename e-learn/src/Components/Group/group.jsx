import classes from './group.module.css'

export default function Group({subTitle,insName,onClick}){
    return(
        <div onClick={onClick} className={classes.class}>
            <p>{subTitle}</p>
            <p>{insName}</p>
        </div>
        )
}