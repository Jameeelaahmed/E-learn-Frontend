import classes from './RadioButton.module.css'
export default function RadioButton({htmlFor,label,name}) {
    return (
        <div className={classes.radio}>
            <label htmlFor={htmlFor} className={classes.radio_container}>
                <p>{label}</p>
                <input type="radio" name={name} id={htmlFor}/>
                <div className={classes.radio_circle}></div>
            </label>
        </div>
    )
}