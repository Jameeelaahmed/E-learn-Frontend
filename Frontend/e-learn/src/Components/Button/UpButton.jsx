import classes from './upButton.module.css'

export default function ({ classname = "",onClick, children }) {
    return (
        <div className={classname}>
            <button onClick={onClick} className={classes.upButton}>
                {children}
            </button>
        </div>
    )
}