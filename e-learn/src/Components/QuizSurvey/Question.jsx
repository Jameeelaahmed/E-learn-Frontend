import classes from './AddQSModal.module.css'
import { useTranslation } from 'react-i18next';
import { log } from '../../log';
import { memo, useCallback } from 'react';
import { useLocation } from "react-router-dom";

const Question = memo(function Question({ children, onLoseFocus }) {
    log('<Questionnnn /> rendered');
    const { t } = useTranslation();
    const handleBlur = useCallback((e) => {
        onLoseFocus(e.target.value);
    }, []);
    const location = useLocation();
    const path = location.pathname;

    return (
        <div className={classes.question}>
            <div className={classes.input}>
                <label htmlFor="description">{t("question-title")}</label>
                <input onBlur={handleBlur} type="text" name="description" dir='auto' />
            </div>
            {path.includes("/quizzes") &&
                <div className={classes.mark}>
                    <label htmlFor="mark">{t("mark")}</label>
                    <input onBlur={handleBlur} type="number" name="mark" dir='auto' />
                </div>
            }

            {children}
        </div>
    )
})

export default Question;