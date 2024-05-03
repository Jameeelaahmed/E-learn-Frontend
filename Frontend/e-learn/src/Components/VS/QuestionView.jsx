import classes from './QuestionView.module.css'
import NextButton from './NextButton'
export default function QuestionView({questionData}) {

    // console.log(questionData)
    return (
        <div className={classes.question_container}>
            <div className={classes.question}>
                <p className={classes.description}>Description</p>
                <div className={classes.options}>
                    <p className={classes.option}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium distinctio minima placeat fuga delectus accusamus aspernatur aut ab consequuntur minus, quia dicta</p>
                    <p className={classes.option}>Option 2</p>
                    <p className={classes.option}>Option 3</p>
                    <p className={classes.option}>Option 4</p >
                </div>
            </div>
            <div className={classes.question_footer}>
                <div className={classes.date_question_container}>
                    <p>Start Date: Date</p>
                    <p>End Date: Date</p>
                </div>
                <NextButton></NextButton>
            </div>
        </div>
    )
}