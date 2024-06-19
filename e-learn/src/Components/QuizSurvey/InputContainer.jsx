import classes from './AddQSModal.module.css'
import { log } from '../../log'
import { memo } from 'react';
const InputContainer = memo(function InputContainer({ label, type, nameFor }) {
    log('<InputContainer /> rendered', 3);
    return (
        <div className={classes.input_container}>
            <label htmlFor={nameFor}>{label}</label>
            <input type={type} name={nameFor} dir='auto' />
        </div>
    )
})

export default InputContainer;