import classes from './AddQSModal.module.css';
import { useTranslation } from 'react-i18next';
import { log } from '../../log';
import { memo, useState, useEffect, useCallback } from 'react';

const Option = memo(function Option({ index, value, onBlur }) {
    log('<Option /> rendered');

    const { t } = useTranslation();
    const optionNumber = index + 1;

    const [optionValue, setOptionValue] = useState(value);

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
            <div className={classes.input_container}>
                <label htmlFor={`option-${index}`}>{t("option")} {optionNumber}</label>
                <textarea
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
