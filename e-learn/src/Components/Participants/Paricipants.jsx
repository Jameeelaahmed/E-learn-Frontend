import { participants } from '../../response'
import classes from '../Assignments/AssignmentResponsesList.module.css'
import { useTranslation } from 'react-i18next'
import Button from '../Button/Button';
export default function Participants() {
    const { t } = useTranslation();
    return (
        <div className={classes.track_responses}>
            <div className={classes.table_wrapper}>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <td>{t("id")}</td>
                            <td>{t("Student-Name")}</td>
                            <td>{t("grade")}</td>
                            <td>{t("profile")}</td>
                            <td>{t("chat")}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((index) => (
                            <tr key={index}>
                                <td>{participants.id}</td>
                                <td>{participants.name}</td>
                                <td>{participants.grade}</td>
                                <td>
                                    {/* ADD FILE AS A PARMETERT IN THE OPEN FILE IN BROWSER FUNCTION AND THE FILE NAME THE TEXT */}
                                    <Button text={t("attachment")} />
                                </td>
                                <td className={classes.mark}>
                                    {/* {mark[index] ? <input type='number' ref={getMark} placeholder={t('enter-mark')} className={classes.input} /> :
                                        <Button onSelect={() => handleMark(index)} text={markValue} />}
                                    {mark[index] &&
                                        <button onClick={() => handleSave(index)} className={classes.button}>
                                            <FaIcons.FaCheck className={classes.icon}></FaIcons.FaCheck>
                                        </button>
                                    } */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}