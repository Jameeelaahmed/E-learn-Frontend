import classes from './NextButton.module.css'
import { useTranslation } from 'react-i18next'
export default function BackButton({ arrow, onClick }) {
    const { t } = useTranslation();
    return (
        <button onClick={onClick} className={classes.back_button}>
            <p>{t('Back')}</p>
        </button>
    )
}