import classes from './Button.module.css'
export default function Button({text,onSelect}){
    return(
        <button onClick={onSelect} className={classes.button}>{text}</button>
    )
}