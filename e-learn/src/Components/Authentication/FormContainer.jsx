import classes from './FormContainer.module.css'

export default function FormContainer({children,h1Value}){
    return(
        <div className={classes.form_container}>
            <h1>{h1Value}</h1>
            {children}
        </div>
        )
}