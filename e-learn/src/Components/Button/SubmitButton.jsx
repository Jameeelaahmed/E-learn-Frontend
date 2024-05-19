import classes from './submitbutton.module.css'
import { useTranslation } from 'react-i18next'

export default function SubmitButton({cancel}) {
    const {t}=useTranslation();
    return (
        <div className={classes.actions}>
            <button type="button" onClick={cancel} >{t("Cancel")}</button>
            <button type="submit">{t("Create")}</button>
        </div>
    )
}