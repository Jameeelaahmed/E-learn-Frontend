import classes from './AddVsModal.module.css'
export default function InputContainer({label,type,nameFor}){
    return(
    <div className={classes.input_container}>
        <label htmlFor={nameFor}>{label}</label>
        <input type={type} name={nameFor}  dir='auto' />
    </div>
    )
}