import classes from './InputText.module.css';
import { useRef } from 'react';
export default function InputText({ isInput, type, htmlFor, value, onChange }) {

    let wrapper = (
        <div className={classes.input_container}>
            <label htmlFor={htmlFor}>{htmlFor}</label>
            {isInput ? (
                <input type={type} id={htmlFor} value={value} onChange={onChange} />
            ) : (
                <p className={classes.text}>{value}</p>
            )}
        </div>
    );

    return <>{wrapper}</>;
}
