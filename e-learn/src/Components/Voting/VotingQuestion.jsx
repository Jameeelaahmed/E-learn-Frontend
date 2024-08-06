import { useState } from 'react';
import classes from './VotingModal.module.css';
import { useTranslation } from 'react-i18next';
import * as FaIcons from 'react-icons/fa6';

export default function VotingQuestion({ options, setOptions }) {
    const { t } = useTranslation();

    function handleAddOption(optionValue = "") {
        const updatedOptions = [...options];
        if (updatedOptions.length < 5) {
            updatedOptions.push(optionValue);
            setOptions(updatedOptions);
        }
        console.log("Options after adding: ", updatedOptions);
    }

    function handleDeleteOption(optionIndex) {
        const updatedOptions = [...options];
        updatedOptions.splice(optionIndex, 1);
        setOptions(updatedOptions);
        console.log("Options after deleting: ", updatedOptions);
    }

    function handleOptionChange(optionIndex, newOptionValue) {
        const updatedOptions = [...options];
        updatedOptions[optionIndex] = newOptionValue;
        setOptions(updatedOptions);
        console.log("Options after changing: ", updatedOptions);
    }

    function handleQuestionChange(newQuestionValue) {
        const questionValue = newQuestionValue;
        console.log(questionValue);
    }

    return (
        <div className={classes.question}>
            <div className={classes.input_container}>
                <label htmlFor="description">{t("survey-description")}</label>
                <input
                    onBlur={(question) => handleQuestionChange(question.target.value)}
                    type="text"
                    name="description"
                    dir='auto' />
            </div>
            {options.map((option, optionIndex) => (
                <div className={classes.option} key={optionIndex}>
                    <div className={classes.option}>
                        <div className={classes.input_container}>
                            <label htmlFor={`option-${optionIndex + 1}`}>{t("option")}{optionIndex + 1}</label>
                            <textarea
                                className={classes.textarea}
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
    );
}
