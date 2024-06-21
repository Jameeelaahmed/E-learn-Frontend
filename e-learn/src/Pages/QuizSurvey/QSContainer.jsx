import QuestionView from "../../Components/QuizSurvey/QuestionView"
import QSNavBar from '../../Components/QuizSurvey/QSNavBar'
import { useState } from "react"
import classes from './QSContainer.module.css'
export default function QSContainer() {
    const [VSQData, setVSQData] = useState([])
    function collectData(data) {
        setVSQData(prevData => [...prevData, data]);
    }
    return (
        <div className={classes.QS_conatiner}>
            <div className={classes.nav_container}>
                <QSNavBar VSQData={collectData}></QSNavBar>
            </div>
            <QuestionView questionData={VSQData}></QuestionView>
        </div>
    )
}