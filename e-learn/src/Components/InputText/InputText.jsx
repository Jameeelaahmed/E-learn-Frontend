import classes from './InputText.module.css'
export default function InputText({ isInput, type, htmlFor }) {
    let wrapper = (<p>Whatever</p>)
    if (isInput) {
        wrapper = (
            <div className={classes.input_container}>
                <label htmlFor={htmlFor}>{htmlFor}</label>
                <input type={type} id={htmlFor} />
            </div>)
    }
    return (
        <>
            {wrapper}
        </>
    )
}