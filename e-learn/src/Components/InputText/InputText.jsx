import classes from './InputText.module.css';

export default function InputText({ isInput, type, htmlFor, value }) {
    let wrapper = (
        <div className={classes.input_container}>
            <label htmlFor={htmlFor}>{htmlFor}</label>
            {isInput ? (
                <input type={type} id={htmlFor} defaultValue={value} />
            ) : (
                <p className={classes.text}>{value}</p>
            )}
        </div>
    );

    return <>{wrapper}</>;
}
