import classes from './Button.module.css'
export default function Button({text}){
    return(
        <button className={classes.button}>{text}</button>
    )
}