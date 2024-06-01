import classes from './upButton.module.css'

export default function ({ classname = "", onClick, children, classwid }) {
    return (
        <div className={classname}>
            <button onClick={onClick} className={`${classes.upButton} ${classwid}`}>
                {children}
            </button>
        </div>
    )
}