import classes from './AddVsModal.module.css'
export default function InputContainer({label,type,nameFor,onLoseFocus}){

    function handleBlur(e){
        onLoseFocus(e.target.value);
    }

    return(
    <div className={classes.input_container}>
        <label htmlFor={nameFor}>{label}</label>
        <input onBlur={handleBlur} type={type} name={nameFor}  dir='auto' />
    </div>
    )
}