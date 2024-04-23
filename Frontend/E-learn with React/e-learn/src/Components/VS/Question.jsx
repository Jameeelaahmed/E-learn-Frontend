import classes from './AddVsModal.module.css'
import InputContainer from "./InputContainer"
import { useTranslation } from 'react-i18next';
export default function Question({children,onLoseFocus}) {
    const { t } = useTranslation();
    
    return (
        <div className={classes.question}>
            <InputContainer onLoseFocus={onLoseFocus} label={t("survey-description")} type="text" nameFor="description" />
            {children}
        </div>
    )
}