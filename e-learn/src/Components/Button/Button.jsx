import classes from './Button.module.css'
export default function Button({text,onSelect,id}){
    return(
        <button id={id} onClick={onSelect} className={classes.button}>{text}</button>
    )
}