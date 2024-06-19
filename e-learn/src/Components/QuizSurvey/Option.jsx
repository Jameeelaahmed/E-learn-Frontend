import classes from './AddQSModal.module.css';
import { useTranslation } from 'react-i18next';
import { log } from '../../log';
import { memo, useCallback } from 'react';
// import {useSta}
const Option = memo(function Option({ index, onBlur }) {
    log('<Option /> rendered');

    // const [counter,setCounter]=use
    const { t } = useTranslation();
    const optionNumber = index + 1;

    const handleBlur = useCallback((e) => {
        onBlur(e.target.value);
    }, []);

    return (
        <div className={classes.option}>
            <div className={classes.input_container}>
                <label htmlFor={`option-${index}`}>{t("option")} {optionNumber}</label>
                <textarea
                    type="text"
                    name={`option-${index}`}
                    id={`option-${index}`}
                    dir='auto'
                    onBlur={handleBlur}
                />
            </div>
        </div>
    )
})

export default Option;
