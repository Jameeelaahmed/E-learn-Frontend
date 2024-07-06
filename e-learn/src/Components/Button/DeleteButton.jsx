import classes from './DeleteButton.module.css'
import { useTranslation } from 'react-i18next';
import * as FaIcons from "react-icons/fa6";
export default function DeleteButton({ delete_button, text, onDelete }) {
    const { t } = useTranslation();
    return (
        <button className={`${classes.delete_button} ${delete_button}`} onClick={onDelete}>
            {t("delete")}
        </button>
    )
}