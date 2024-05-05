import classes from './AssignmentDetails.module.css'
import * as FaIcons from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import InputText from '../InputText/InputText';

export default function AssignmentDetails(){
    const {t}=useTranslation();
    const [isEdit,setisEdit]=useState(false);
    function handleEdit(){
        setisEdit(prev=>(!prev))
    }

    function handleSave(){
        setisEdit(false)
    }

    return(
        <div className={classes.assignment_details}>
            <div className={classes.assignment_container}>
                <div className={classes.container}>
                    <FaIcons.FaHeading className={classes.icon}/>
                    <InputText type="text" isInput={isEdit} htmlFor="Title"></InputText>
                    {/* <p className={classes.text}>Title</p> */}
                </div>
                <div className={classes.container}>
                    <FaIcons.FaPenClip className={classes.icon}/>
                    <InputText type="text" isInput={isEdit} htmlFor="Description"></InputText>
                    {/* <p className={classes.text}>Description</p> */}
                </div>
                <div className={classes.container}>
                    <FaIcons.FaRegCalendar className={classes.icon}/>
                    <InputText type="date" isInput={isEdit} htmlFor="Due-Date"></InputText>
                    {/* <p className={classes.text}>Due Date</p> */}
                </div>
                <div className={classes.container}>
                    <FaIcons.FaClipboardList className={classes.icon}/>
                    <InputText type="number" isInput={isEdit} htmlFor="Points"></InputText>
                    {/* <p className={classes.text}>Points</p> */}
                </div>
                <div className={classes.container}>
                    <FaIcons.FaPaperclip className={classes.icon}/>
                    <InputText type="text" isInput={isEdit} htmlFor="Attachment"></InputText>
                    {/* <p className={classes.text}>Attachments</p> */}
                </div>
            </div>
            {isEdit? <button onClick={handleSave}>{t("save")}</button> : <button onClick={handleEdit}>{t("edit")}</button>}
            <button>{t("delete")}</button>
        </div>     
    )
}