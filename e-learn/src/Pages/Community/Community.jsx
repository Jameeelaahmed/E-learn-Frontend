import Posts from "../../Components/Community/Posts";
import classes from './Community.module.css'
export default function Community() {
    return (
        <div className={classes.community}>
            <Posts />
        </div>
    );
}