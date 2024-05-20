import classes from './VotingNavBar.module.css'
import * as FaIcons from "react-icons/fa6";
import { useTranslation } from 'react-i18next'
import { useRef, useState, useEffect } from 'react';
import VotingModal from './VotingModal';
import { log } from '../../log';
import Delete from '../Button/Delete';
import Edit from '../Button/Edit';
export default function VSNavBar() {
    log('<vsNavbar /> rendered');
    const { t } = useTranslation();
    const addVSDialog = useRef();
    function handleOpenAddVSModal() {
        addVSDialog.current.open();
    }
    const [isMobile, setIsMobile] = useState(false); 

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


    return (
        <div className={isMobile ? classes.vs_navigation_bar_responsive : classes.vs_navigation_bar}>
            <VotingModal
                ref={addVSDialog}
            />
            <div
                className={classes.add_survey}
                onClick={handleOpenAddVSModal}>
                <FaIcons.FaPlus
                    className={classes.icon} />
                <p>{t("add-voting")}</p>
            </div>
            <ul className={isMobile ? classes.titles_wrapper : ""}>
                {/* {returnFormData.map((data) => ( */}
                <div className={classes.box_wrapper}>
                    <li >
                        {isMobile ? (
                            <div className={classes.box}>
                                <p>kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</p>
                                <p>name</p>
                            </div>
                        ) : (
                            <div className={classes.title_wrapper}>
                                <FaIcons.FaSquare className={classes.icon_square} />
                                <div className={classes.info}>
                                    <span className={classes.title}>kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</span>
                                    <span className={classes.name}>by name</span>
                                </div>
                            </div>
                        )}
                    </li>
                    <div className={classes.edit_delete}>
                        <Edit icon={FaIcons.FaPenClip} />
                        <Delete />
                    </div>
                </div>
                {/* ))} */}
            </ul>
        </div>
    )
}