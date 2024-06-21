import React, { useState } from 'react';
import classes from './QuestionView.module.css';
import NextButton from './NextButton';
import BackButton from './BackButton';
import SubmitButton from '../Button/SubmitButton';
import Button from '../Button/Button';
import { t } from 'i18next';
import UpButton from '../Button/UpButton';
import Submit from './Submit';

export default function QuestionView() {
    const questionData = [
        {
            description: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            startDate: '2024-06-01',
            endDate: '2024-06-30'
        },
        {
            description: 'What is 2 + 2?',
            options: ['3', '4', '5', '6'],
            startDate: '2024-06-01',
            endDate: '2024-06-30'
        },
        {
            description: 'Which planet is known as the Red Planet?',
            options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
            startDate: '2024-06-01',
            endDate: '2024-06-30'
        },
        {
            description: 'What is the largest ocean on Earth?',
            options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
            startDate: '2024-06-01',
            endDate: '2024-06-30'
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleNext = () => {
        if (currentQuestionIndex < questionData.length - 1) {
            console.log("iam here")
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        console.log('Submit');
    };

    const currentQuestion = questionData[currentQuestionIndex];

    return (
        <div className={classes.question_container}>
            <div className={classes.question}>
                <p dir='auto' className={classes.description}>{currentQuestion.description}</p>
                <div className={classes.options}>
                    {currentQuestion.options.map((option, index) => (
                        <p dir='auto' key={index} className={classes.option}>{option}</p>
                    ))}
                </div>
            </div>
            <div className={classes.question_footer}>
                <div className={classes.date_question_container}>
                    <p>Start Date: {currentQuestion.startDate}</p>
                    <p>End Date: {currentQuestion.endDate}</p>
                </div>
                <div className={classes.buttons}>
                    {currentQuestionIndex > 0 && <BackButton onClick={handleBack}>Back</BackButton>}
                    {currentQuestionIndex < questionData.length - 1 ? (
                        <NextButton onClick={handleNext}>Next</NextButton>
                    ) : (
                        <Submit text={t("Submit")} onClick={handleSubmit}>Submit</Submit>
                    )}
                </div>
            </div>
        </div>
    );
}
