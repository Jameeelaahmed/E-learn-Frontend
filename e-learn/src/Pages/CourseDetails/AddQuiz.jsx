import AddQSModal from '../../Components/QuizSurvey/AddQSModal';
import classes from '../../Components/Assignments/Add-Assignment.module.css';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AddQuiz() {
    const { t } = useTranslation();
    const addQuizRef = useRef();
    const [quizData, setQuizData] = useState([]);

    function handleOpenAddQuizModal() {
        addQuizRef.current.open();
    }

    function collectFormData(data) {
        setQuizData(prevData => [...prevData, data]);
    }

    return (
        <div className={classes.AddAssignment}>
            <p className={classes.create_assignment}>{t("Create Quiz")}</p>
            <AddQSModal ref={addQuizRef} collectFormData={collectFormData} />
            <div className={classes.actions}>
                <button onClick={handleOpenAddQuizModal}>{t("Create")}</button>
            </div>
        </div>
    );
}
