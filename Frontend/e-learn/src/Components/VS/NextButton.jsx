import classes from './NextButton.module.css'
import { useTranslation } from 'react-i18next'
export default function NextButton({ arrow }) {
    const { t } = useTranslation();
    return (
        <button className={classes.button}>
            <p>{t('Next')}</p>
        </button>
    )
}