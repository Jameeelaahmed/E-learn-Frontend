import AddQSModal from '../../Components/QuizSurvey/AddQSModal';
import classes from '../../Components/Assignments/Add-Assignment.module.css';
import { useRef } from 'react'
import { useTranslation } from 'react-i18next';
export default function AddQuiz() {
    const { t } = useTranslation();
    const addQuizRef = useRef();
    function handleOpenAddQuizModal() {
        addQuizRef.current.open();
    }
    return (
        <div className={classes.AddAssignment}>
            <p className={classes.create_assignment}>{t("Create Quiz")}</p>
            <AddQSModal ref={addQuizRef} />
            <div className={classes.actions}>
                <button onClick={handleOpenAddQuizModal}>{t("Create")}</button>
            </div>
        </div>
    )
}