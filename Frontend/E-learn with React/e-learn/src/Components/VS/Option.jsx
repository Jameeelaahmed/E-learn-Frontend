import classes from './AddVsModal.module.css';
import { useTranslation } from 'react-i18next';
import { useRef,forwardRef } from 'react';
const Option =forwardRef(function Option({ index,value,onChange },ref) {
    const { t } = useTranslation();
    const optionNumber = index + 1;

    const inputRef = useRef(null);

    const handleChange = () => {
        onChange(index, inputRef.current.value);
    };


    return (
        <div className={classes.option}>
            <div className={classes.input_container}>
                <label htmlFor={`option-${index}`}>{t("option")} {optionNumber}</label>
                <textarea
                    type="text"
                    name={`option-${index}`}
                    id={`option-${index}`}
                    ref={ref ? ref : inputRef}
                    value={value}
                    onChange={handleChange}
                    dir='auto'
                />
            </div>
        </div>
    )
})

export default Option;
