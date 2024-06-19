import classes from './QSNavBar.module.css'
import * as FaIcons from "react-icons/fa6";
import { useTranslation } from 'react-i18next'
import { useRef, useState, useEffect } from 'react';
import AddQSModal from './AddQSModal'
export default function QSNavBar({ VSQData }) {
    const { t } = useTranslation();
    const addVSDialog = useRef();
    function handleOpenAddVSModal() {
        addVSDialog.current.open();
    }
    const [returnFormData, setReturnFormData] = useState([])

    const [isMobile, setIsMobile] = useState(false); // State to track screen size

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 930);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    function collectData(data) {
        setReturnFormData(prevData => [...prevData, data]);
        VSQData(data)
    }

    return (
        <div className={isMobile ? classes.vs_navigation_bar_responsive : classes.vs_navigation_bar}>
            <AddQSModal
                ref={addVSDialog}
                collectFormData={collectData} />
            <div
                className={classes.add_survey}
                onClick={handleOpenAddVSModal}>
                <FaIcons.FaPlus
                    className={classes.icon} />
                <p>{t("add-survey")}</p>
            </div>
            <ul className={isMobile ? classes.titles_wrapper : ""}>
                {returnFormData.map((data) => (
                    <li key={data.endTime}>
                        {isMobile ? (
                            <div className={classes.box}>
                                <p>{data.title}</p>
                                <p>name</p>
                            </div>
                        ) : (
                            <div className={classes.title_wrapper}>
                                <FaIcons.FaSquare className={classes.icon} />
                                <div className={classes.info}>
                                    <span className={classes.title}>{data.title}</span>
                                    <span className={classes.name}>by name</span>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}