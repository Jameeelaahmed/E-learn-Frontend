import classes from './AddQSModal.module.css';
import { useTranslation } from 'react-i18next';
import { log } from '../../log';
import { memo, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const Option = memo(function Option({ index, value, isCorrect, onBlur, onCorrectChange, name }) {
    log('<Option /> rendered');

    const { t } = useTranslation();
    const optionNumber = index + 1;
    const [optionValue, setOptionValue] = useState(value);
    const location = useLocation();
    const path = location.pathname;
    useEffect(() => {
        setOptionValue(value);
    }, [value]);

    const handleBlur = useCallback((e) => {
        onBlur(e.target.value);
    }, [onBlur]);

    const handleChange = (e) => {
        setOptionValue(e.target.value);
    };


    return (
        <div className={classes.option}>
            {path.includes("/quizzes") &&
                <div className={classes.radio}>
                    <label>
                        <input type="radio" name={name} onChange={onCorrectChange} />
                        <div className={classes.radio_circle}></div>
                    </label>
                </div>}
            <div className={classes.input}>
                <label htmlFor={`option-${index}`}>{t("option")} {optionNumber}</label>
                <textarea
                    className={classes.textarea}
                    type="text"
                    name={`option-${index}`}
                    id={`option-${index}`}
                    dir='auto'
                    value={optionValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    );
});

export default Option;
