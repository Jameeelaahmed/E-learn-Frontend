import classes from './class.module.css'

export default function Class({subTitle,insName}){
    return(
        <div className={classes.class}>
            <p>{subTitle}</p>
            <p>{insName}</p>
        </div>
        )
}