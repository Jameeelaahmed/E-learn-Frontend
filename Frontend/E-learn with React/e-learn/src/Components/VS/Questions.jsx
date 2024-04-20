import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as FaIcons from 'react-icons/fa6';
import classes from './AddVsModal.module.css';
import Question from './Question';
import Option from './Option';

export default function Questions() {
    const { t } = useTranslation();
    const [questions, setQuestions] = useState([{ description: '', options: ['', ''] }]);
    const optionRefs = useRef([]);

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    function handleAddOption(questionIndex, optionValue = '') {
        const updatedQuestions = [...questions];
        if (updatedQuestions[questionIndex].options.length < 5) {
            updatedQuestions[questionIndex].options.push(optionValue);
            setQuestions(updatedQuestions);
        }
    }

    useEffect(() => {
        console.log(questions);
    }, [questions]);

    function handleAddQuestion() {
        setQuestions([...questions, { description: '', options: ['', ''] }]);
    }

    function handleDeleteOption(questionIndex, optionIndex) {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(updatedQuestions);
    }

    function handleDeleteQuestion(questionIndex) {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(questionIndex, 1);
        setQuestions(updatedQuestions);
    }

    return (
        <div className={classes.questions}>
            {questions.map((question, questionIndex) => (
                <div className={classes.question_container} key={questionIndex}>
                    {questionIndex > 0 && (
                        <p className={classes.x_icon_ques} onClick={() => handleDeleteQuestion(questionIndex)}>
                            <FaIcons.FaCircleXmark />
                        </p>
                    )}
                    <p className={classes.question_index}>
                        {t('Question')} {questionIndex + 1}
                    </p>
                    <Question key={questionIndex}>
                        {question.options.map((option, optionIndex) => (
                            <div className={classes.option} key={`${questionIndex}-${optionIndex}`}>
                                <Option
                                    index={optionIndex}
                                    value={option}
                                    onChange={(value) => handleOptionChange(questionIndex, optionIndex, value)}
                                    ref={optionRefs.current[`${questionIndex}-${optionIndex}`]}
                                />
                                {optionIndex > 1 && (
                                    <FaIcons.FaCircleXmark
                                        className={classes.x_icon}
                                        onClick={() => handleDeleteOption(questionIndex, optionIndex)}
                                    />
                                )}
                            </div>
                        ))}
                        <div className={classes.add_button} onClick={() => handleAddOption(questionIndex)}>
                            <FaIcons.FaPlus className={classes.icon} />
                            <p>{t('Add-Option')}</p>
                        </div>
                    </Question>
                </div>
            ))}
            <div className={classes.add_button} onClick={handleAddQuestion}>
                <FaIcons.FaPlus className={classes.icon} />
                <p>{t('Add-Question')}</p>
            </div>
        </div>
    );
}
