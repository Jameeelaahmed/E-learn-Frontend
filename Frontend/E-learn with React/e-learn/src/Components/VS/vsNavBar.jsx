import classes from './vsNabBar.module.css'
import * as FaIcons from "react-icons/fa6";
import { useTranslation } from 'react-i18next'
import { useRef } from 'react';
import './AddVSModal'
import AddVsModal from './AddVSModal';
export default function VSNavBar(){
    const {t} = useTranslation();
    const addVSDialog=useRef();
    function handleOpenAddVSModal(){
        addVSDialog.current.open();
    }
    return(
    <div className={classes.vs_navigation_bar}>
        <AddVsModal 
        ref={addVSDialog}></AddVsModal>
        <div 
        className={classes.add_survey} 
        onClick={handleOpenAddVSModal}>
            <FaIcons.FaPlus 
            className={classes.icon} />
            <p>{t("add-survey")}</p>
        </div>
        <ul>
            <li>
                <a href="">
                    <FaIcons.FaSquare className={classes.icon} />
                    <div className={classes.info}>
                        <span>Survey 1</span>
                        <span className={classes.name}>by name</span>
                    </div>
                </a>
            </li>
        </ul>
    </div>
    )
}