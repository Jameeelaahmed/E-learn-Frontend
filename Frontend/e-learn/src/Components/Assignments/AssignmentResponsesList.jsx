import Button from '../Button/Button'
import classes from './AssignmentResponsesList.module.css'
import { useTranslation } from 'react-i18next'
import responses from '../../response'
import * as FaIcons from 'react-icons/fa6'
import { useState, useRef } from 'react'

export default function AssignmentsResponsesList() {
    const initialMarks = responses.map(() => false); // Initialize marks state for each response
    const [mark, setMark] = useState(initialMarks);
    const { t } = useTranslation()
    const getMark = useRef();
    function handleMark(index) {
        const newMarks = [...mark];
        newMarks[index] = !newMarks[index];
        setMark(newMarks);
    }

    var markValue = t("mark");

    function handleSave(index) {
        var markValue = getMark.current.value;
        console.log(markValue)
        const newMarks = [...mark];
        newMarks[index] = false;
        setMark(newMarks)
    }

    return (
        <div className={classes.track_responses}>
            <div className={classes.tracking}>
                <a href="">{t('assigned')}</a>
                <a href="">{t('turned-in')}</a>
                <a href="">{t("gradded")}</a>
                <a href="">{t('all')}</a>
            </div>
            <div className={classes.table_wrapper}>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <td>{t("Student-Name")}</td>
                            <td>{t("date")}</td>
                            <td>{t("time")}</td>
                            <td>{t("attachment")}</td>
                            <td>{t("mark")}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {responses.map((response, index) => (
                            <tr key={index}>
                                <td>{response.name}</td>
                                <td>{response.Date}</td>
                                <td>{response.Time}</td>
                                <td>
                                    {/* ADD FILE AS A PARMETERT IN THE OPEN FILE IN BROWSER FUNCTION AND THE FILE NAME THE TEXT */}
                                    <Button onSelect={() => openFileInBrowser(/*file Name*/)} text={t("attachment")} />
                                </td>
                                <td className={classes.mark}>
                                    {mark[index] ? <input type='number' ref={getMark} placeholder={t('enter-mark')} className={classes.input} /> :
                                        <Button onSelect={() => handleMark(index)} text={markValue} />}
                                    {mark[index] &&
                                        <button onClick={() => handleSave(index)} className={classes.button}>
                                            <FaIcons.FaCheck className={classes.icon}></FaIcons.FaCheck>
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}
