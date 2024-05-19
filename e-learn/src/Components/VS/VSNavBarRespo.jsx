import classes from './VSNavBarRespo.module.css'
import * as FaIcons from "react-icons/fa6";
import { useTranslation } from 'react-i18next'
import { useRef, useState } from 'react';
import './AddVSModal'
import AddVsModal from './AddVSModal';
import { log } from '../../log';
export default function VSNavBarRespo() {
    const { t } = useTranslation();
    const addVSDialog = useRef();
    function handleOpenAddVSModal() {
        addVSDialog.current.open();
    }
    const [returnFormData, setReturnFormData] = useState([])



    function collectData(data) {
        // Append the new survey data to the existing formData state
        setReturnFormData(prevData => [...prevData, data]);
        // console.log(data)
    }
    return (
        <div className={classes.vs_navigation_bar_responsive}>
            <AddVsModal
                ref={addVSDialog}
                collectFormData={collectData} />
            <div
                className={classes.add_survey}
                onClick={handleOpenAddVSModal}>
                <FaIcons.FaPlus
                    className={classes.icon} />
                <p>{t("add-survey")}</p>
            </div>
            <div className={classes.titles_wrapper}>
                {returnFormData.map((data) => (
                    <div key={data.endTime} className={classes.box}>
                        <p>{data.title}</p>
                        <p>name</p>
                    </div>
                ))}
            </div>
        </div>
    )
}