import classes from './AddQSModal.module.css';
import { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import * as FaIcons from "react-icons/fa6";
import { log } from '../../log';
import Question from "./Question";
import Option from "./Option";
import { v4 as uuidv4 } from 'uuid';  // Import UUID for generating unique IDs

const Questions = memo(function Questions({ onQuestionChange }) {
    log('<Questions /> rendered');
    const { t } = useTranslation();
    const [questions, setQuestions] = useState([{ id: uuidv4(), description: "", options: ["", ""] }]);

    // Function to handle adding an option to a question
    const handleAddOption = (questionIndex, optionValue = "") => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.push(optionValue);
        setQuestions(updatedQuestions);
    };

    // Function to handle deleting an option from a question
    const handleDeleteOption = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(updatedQuestions);
    };

    // Function to handle adding a new question
    const handleAddQuestion = () => {
        setQuestions([...questions, { id: uuidv4(), description: "", options: ["", ""] }]);
    };

    // Function to handle deleting a question
    const handleDeleteQuestion = (questionIndex) => {
        const updatedQuestions = questions.filter((_, index) => index !== questionIndex);
        setQuestions(updatedQuestions);
    };

    // Function to handle changing an option's value
    const handleOptionChange = (questionIndex, optionIndex, newOptionValue) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = newOptionValue;
        setQuestions(updatedQuestions);
    };

    // Function to handle changing a question's description
    const handleQuestionChange = (questionIndex, newQuestionValue) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].description = newQuestionValue;
        setQuestions(updatedQuestions);
    };

    // Effect to call the onQuestionChange callback when questions state changes
    useEffect(() => {
        onQuestionChange(questions);
        console.log(questions);
    }, [questions, onQuestionChange]);

    return (
        <div className={classes.questions}>
            {questions.map((question, questionIndex) => (
                <div className={classes.question_container} key={question.id}>
                    {questionIndex > 0 && (
                        <p className={classes.x_icon_ques} onClick={() => handleDeleteQuestion(questionIndex)}>
                            <FaIcons.FaCircleXmark />
                        </p>
                    )}
                    <p className={classes.question_index}>{t("Question")} {questionIndex + 1}</p>
                    <Question
                        key={question.id}
                        onLoseFocus={(newQuestionValue) => handleQuestionChange(questionIndex, newQuestionValue)}
                        questionIndex={questionIndex}
                    >
                        {question.options.map((option, optionIndex) => (
                            <div className={classes.option} key={`${question.id}-${optionIndex}`}>
                                <Option
                                    index={optionIndex}
                                    value={option}
                                    onBlur={(newOptionValue) => handleOptionChange(questionIndex, optionIndex, newOptionValue)}
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
                            <p>{t("Add-Option")}</p>
                        </div>
                    </Question>
                </div>
            ))}
            <div className={classes.add_button} onClick={handleAddQuestion}>
                <FaIcons.FaPlus className={classes.icon} />
                <p>{t("Add-Question")}</p>
            </div>
        </div>
    );
});

export default Questions;
