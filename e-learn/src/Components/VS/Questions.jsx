import classes from './AddVsModal.module.css'
import Question from "./Question";
import Option from "./Option";
import { useState, useEffect, createContext, memo } from 'react';
import { useTranslation } from 'react-i18next';
import * as FaIcons from "react-icons/fa6";
import { log } from '../../log';

const Questions = memo(function Questions({onQuestionChange}) {
    log('<Questions /> rendered');
    const { t } = useTranslation();
    const [questions, setQuestions] = useState([{ description: "", options: ["", ""] }]);


    function handleAddOption(questionIndex, optionValue = "") {
        const updatedQuestions = [...questions];
        if (updatedQuestions[questionIndex].options.length < 5) {
            updatedQuestions[questionIndex].options.push(optionValue);
            setQuestions(updatedQuestions);
        }
    }

    function handleDeleteOption(questionIndex, optionIndex) {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(updatedQuestions);
    }
    

    function handleAddQuestion() {
        setQuestions([...questions, { description: "", options: ["", ""] }]);
    }


    function handleDeleteQuestion(questionIndex) {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(questionIndex, 1)
        setQuestions(updatedQuestions)
    }

    function handleOptionChange(questionIndex, optionIndex, newOptionValue) {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = newOptionValue;
        setQuestions(updatedQuestions);
    }


    function handleQuestionChange(questionIndex, newQuestionValue) {
        const updatedQuestions=[...questions];
        updatedQuestions[questionIndex].description=newQuestionValue;
        setQuestions(updatedQuestions)
    }

    useEffect(()=>{
        onQuestionChange(questions)
        console.log(questions)
    })

    // console.log(questions)

    const questionId = Math.floor(Math.random() * 100000);
    const optionId = Math.floor(Math.random() * 100000);
    return (
        <div className={classes.questions}>
            {questions.map((question, questionIndex) => (
                <div className={classes.question_container} key={questionIndex}>
                    {questionIndex > 0 && <p className={classes.x_icon_ques} onClick={() => handleDeleteQuestion(questionIndex)}><FaIcons.FaCircleXmark /></p>}
                    <p className={classes.question_index}>{t("Question")} {questionIndex + 1}</p>
                    <Question
                        key={questionIndex}
                        onLoseFocus={(newQuestionValue) => handleQuestionChange(questionIndex, newQuestionValue)}
                        questionIndex={questionIndex}>
                        {question.options.map((option, optionIndex) => (
                            <div className={classes.option} key={`${questionIndex}-${optionIndex}`}>
                                <Option
                                    index={optionIndex}
                                    value={option}
                                    onBlur={(newOptionValue) => handleOptionChange(questionIndex, optionIndex, newOptionValue)}
                                />
                                {optionIndex > 1 &&
                                    <FaIcons.FaCircleXmark className={classes.x_icon} onClick={() => handleDeleteOption(questionIndex, optionIndex)} />
                                }
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
    )
})

export default Questions;