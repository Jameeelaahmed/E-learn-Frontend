import classes from './AddVsModal.module.css';
import { useTranslation } from 'react-i18next';

export default function Option({ index,onBlur }) {
    const { t } = useTranslation();
    const optionNumber = index + 1;

    function handleBlur(e){
        onBlur(e.target.value);
    }

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
}
