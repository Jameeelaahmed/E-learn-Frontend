// import classes from './VotingQuestion.module.css'
import { useState } from 'react';
import classes from './VotingModal.module.css'
import { useTranslation } from 'react-i18next';
import * as FaIcons from 'react-icons/fa6'
export default function VotingQuestion() {
    const {t}=useTranslation();
    const [option, setOption] = useState(["",""])

    function handleAddOption(optionValue = "") {
        const updatedOptions = [...option];
        if (updatedOptions.length < 5) {
            updatedOptions.push(optionValue);
            setOption(updatedOptions);
        }
    }

    function handleDeleteOption(optionIndex) {
        const updatedOptions = [...option];
        updatedOptions.splice(optionIndex, 1);
        setOption(updatedOptions);
    }

    function handleOptionChange(optionIndex, newOptionValue) {
        const updatedOptions = [...option];
        updatedOptions[optionIndex] = newOptionValue;
        setOption(updatedOptions);
    }

    
    function handleQuestionChange(newQuestionValue) {
        const questionValue=newQuestionValue;
        console.log(questionValue)
    }

    return (
        <div className={classes.question}>
            <div className={classes.input_container}>
                <label htmlFor="description">{t("survey-description")}</label>
                <input 
                onBlur={(question) => handleQuestionChange(question.target.value)} type="text" name="description" dir='auto' />
            </div>
            {option.map((option, optionIndex) => (
                <div className={classes.option} key={optionIndex}>
                    <div className={classes.option}>
                        <div className={classes.input_container}>
                            <label htmlFor={`option-${optionIndex +1}`}>{t("option")}{optionIndex + 1}</label>
                            <textarea
                                type="text"
                                name={`option-${optionIndex}`}
                                id={`option-${optionIndex}`}
                                dir='auto'
                                onBlur={(option) => handleOptionChange(optionIndex, option.target.value)}
                                />
                        </div>
                    </div>
                    {optionIndex > 1 &&
                        <FaIcons.FaCircleXmark className={classes.x_icon} onClick={() => handleDeleteOption(optionIndex)} />
                    }
                </div>
            ))}
            <div className={classes.add_button} onClick={() => handleAddOption()}>
                <FaIcons.FaPlus className={classes.icon} />
                <p>{t("Add-Option")}</p>
            </div>
        </div>
    )
}