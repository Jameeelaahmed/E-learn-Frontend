import classes from './ResponsesList.module.css'
import { useTranslation } from 'react-i18next'
import response from '../../response';
export default function ResponsesList() {
    const { t } = useTranslation();
    return (
        <table className={classes.table}>
            <thead>
                <tr>
                    <th>{t("Student-ID")}</th>
                    <th>{t("Student-Name")}</th>
                    <th>{t("Time")}</th>
                    <th>{t("Date")}</th>
                    <th>{t("Response")}</th>
                </tr>
            </thead>
            <tbody>
                {response.map((data) => (
                    <tr key={data.id}>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.Time}</td>
                        <td>{data.Date}</td>
                        <td>Germany</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}