import classes from './NextButton.module.css'
import { useTranslation } from 'react-i18next'
export default function Submit({ arrow, onClick }) {
    const { t } = useTranslation();
    return (
        <button onClick={onClick} className={classes.submit}>
            <p>{t('submit')}</p>
        </button>
    )
}