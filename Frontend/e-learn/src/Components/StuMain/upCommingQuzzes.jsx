import classes from './upCommingQuiz.module.css'
import img from '../../assets/wavedline.png'
export default function UpCommingQuizzes(){
    return(
        <div className={classes.UpCommingQuizzes}>
            <div className={classes.circle_one}></div>
            <div className={classes.circle_two}></div>
            <p className={classes.group_name}>Group-name</p>
            <div className={classes.name}>
                <p>name</p>
            </div>
        </div>
    )
}