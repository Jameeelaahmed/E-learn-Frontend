// Loading.js
import classes from './loading.module.css';

export default function Loading({ color = '#183153' }) {
    const spinnerStyle = {
        '--dot-spinner-color': color
    };

    return (
        <div className={classes.dot_spinner} style={spinnerStyle}>
            <div className={classes.dot_spinner__dot}></div>
            <div className={classes.dot_spinner__dot}></div>
            <div className={classes.dot_spinner__dot}></div>
            <div className={classes.dot_spinner__dot}></div>
            <div className={classes.dot_spinner__dot}></div>
            <div className={classes.dot_spinner__dot}></div>
            <div className={classes.dot_spinner__dot}></div>
            <div className={classes.dot_spinner__dot}></div>
        </div>
    );
}
