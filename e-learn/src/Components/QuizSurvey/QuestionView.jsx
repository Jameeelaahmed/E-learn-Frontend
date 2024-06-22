import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './QuestionView.module.css';
import NextButton from './NextButton';
import BackButton from './BackButton';
import Submit from './Submit';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import { t } from 'i18next';

export default function QuestionView() {
    const location = useLocation();
    const navigate = useNavigate();
    const quiz = location.state?.quiz; // Safely access quiz from location state
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(quiz?.questions ? Array(quiz.questions.length).fill('') : []);
    console.log(quiz);
    const today = new Date();
    const endDate = quiz ? new Date(quiz.end) : null;
    if (endDate) {
        endDate.setHours(23, 59, 59); // Set the end time to 23:59:59 of the end date
    }

    useEffect(() => {
        if (quiz && today > endDate) {
            setCurrentQuestionIndex(-1); // Time is ended
        } else if (quiz && currentQuestionIndex === -1) {
            setCurrentQuestionIndex(0); // Reset index if time was previously ended and now it's not
        }
    }, [currentQuestionIndex, today, endDate, quiz]);

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleOptionClick = (option) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = option;
        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        try {
            const token = getAuthToken();
            const userAnswers = quiz.questions.map((question, index) => ({
                QuestionId: question.Id,
                Option: answers[index]
            }));

            const response = await httpRequest('POST', 'https://elearnapi.runasp.net/api/Quiz/SubmitResponse', token, {
                QuizId: quiz.id,
                Answers: userAnswers
            });

            if (response.statusCode === 200) {
                console.log('Quiz submitted successfully');
                const result = response.data;
                navigate(`/groups/${location.state.groupId}/quizzes/result`, { state: { result } });
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    };

    if (!quiz) {
        return <p>Quiz data is not available.</p>;
    }

    const currentQuestion = currentQuestionIndex !== -1 ? quiz.questions[currentQuestionIndex] : null;

    return (
        <>
            {currentQuestion !== null ? (
                <div className={classes.question_container}>
                    <div className={classes.question}>
                        <p dir='auto' className={classes.description}>{currentQuestion.Text}</p>
                        <div className={classes.options}>
                            {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4, currentQuestion.option5]
                                .filter(option => option)
                                .map((option, index) => (
                                    <p
                                        dir='auto'
                                        key={index}
                                        className={`${classes.option} ${answers[currentQuestionIndex] === option ? classes.selected : ''}`}
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        {option}
                                    </p>
                                ))}
                        </div>
                        <div className={classes.question_footer}>
                            <div className={classes.date_question_container}>
                                <div className={classes.date}>
                                    <p>{t("Start-Date")}:</p>
                                    <p>{quiz.start}</p>
                                </div>
                                <div className={classes.date}>
                                    <p>{t("End-Date")}:</p>
                                    <p>{quiz.end}</p>
                                </div>
                            </div>
                            <div className={classes.buttons}>
                                {currentQuestionIndex > 0 && <BackButton onClick={handleBack}>{t("Back")}</BackButton>}
                                {currentQuestionIndex < quiz.questions.length - 1 ? (
                                    <NextButton onClick={handleNext}>{t("Next")}</NextButton>
                                ) : (
                                    <Submit text={t("Submit")} onClick={handleSubmit} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>{t("Quiz time is ended.")}</p>
            )}
        </>
    );
}
