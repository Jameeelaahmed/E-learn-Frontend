import classes from './AssignmentDetails.module.css'
import * as FaIcons from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import InputText from '../InputText/InputText';
import Button from '../Button/Button';
import DeleteButton from '../Button/DeleteButton';
export default function AssignmentDetails() {
    const { t } = useTranslation();
    const [isEdit, setisEdit] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        points: "",
        attachements: []
    })
    function handleEdit() {
        setisEdit(prev => (!prev))
    }


    function handleSave() {
        const fd = new FormData();
        const formValues = Object.fromEntries(fd.entries());
        setFormData(formData => ({
            ...formData,
            title: formValues.title,
            description: formValues.Description,
            endDate: formValues.Due_Date,
            points: formValues.Points
        }))

        setisEdit(false)
    }

    return (
        <div className={classes.assignment_details}>
            <div className={classes.assignment_container}>
                <form>
                    <div className={classes.container}>
                        <FaIcons.FaHeading className={classes.icon} />
                        <InputText type="text" isInput={isEdit} htmlFor="Title" name="title"></InputText>
                        {/* <p className={classes.text}>Title</p> */}
                    </div>
                    <div className={classes.container}>
                        <FaIcons.FaPenClip className={classes.icon} />
                        <InputText type="text" isInput={isEdit} htmlFor="Description"></InputText>
                        {/* <p className={classes.text}>Description</p> */}
                    </div>
                    <div className={classes.container}>
                        <FaIcons.FaRegCalendar className={classes.icon} />
                        <InputText type="date" isInput={isEdit} htmlFor="Due_Date"></InputText>
                        {/* <p className={classes.text}>Due Date</p> */}
                    </div>
                    <div className={classes.container}>
                        <FaIcons.FaClipboardList className={classes.icon} />
                        <InputText type="number" isInput={isEdit} htmlFor="Points"></InputText>
                        {/* <p className={classes.text}>Points</p> */}
                    </div>
                    <div className={classes.container}>
                        <FaIcons.FaPaperclip className={classes.icon} />
                        <InputText type="text" isInput={isEdit} htmlFor="Attachment"></InputText>
                        {/* <p className={classes.text}>Attachments</p> */}
                    </div>
                </form>
            </div>
            <div className={classes.button_container}>
                {isEdit ? <Button onSelect={handleSave} text={t("save")} /> : <Button onSelect={handleEdit} text={t("edit")} />}
                <DeleteButton text={t("delete")} delete_button={classes.delete_button}></DeleteButton>
            </div>
        </div>
    )
}