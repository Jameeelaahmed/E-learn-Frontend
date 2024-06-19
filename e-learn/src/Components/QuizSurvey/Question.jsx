import classes from './AddQSModal.module.css'
import { useTranslation } from 'react-i18next';
import { log } from '../../log';
import { memo, useCallback } from 'react';
const Question = memo(function Question({ children, onLoseFocus }) {
    log('<Questionnnn /> rendered');
    const { t } = useTranslation();
    const handleBlur = useCallback((e) => {
        onLoseFocus(e.target.value);
    }, []);

    return (
        <div className={classes.question}>
            <div className={classes.input_container}>
                <label htmlFor="description">{t("survey-description")}</label>
                <input onBlur={handleBlur} type="text" name="description" dir='auto' />
            </div>
            {children}
        </div>
    )
})

export default Question;