import classes from './AssignmentDetails.module.css';
import * as FaIcons from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import InputText from '../InputText/InputText';
import Button from '../Button/Button';
import DeleteButton from '../Button/DeleteButton';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import { useParams } from 'react-router-dom';

export default function AssignmentDetails() {
    const { t } = useTranslation();
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({});
    const params = useParams();
    const assignmentId = params.assignmentId;

    const role = getRole();
    function getRole() {
        return localStorage.getItem('role');
    }

    function handleEdit() {
        setIsEdit(prev => (!prev));
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
        }));

        setIsEdit(false);
    }

    async function fetchAssignmentDetails() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Assignment/GetById/${assignmentId}`, token);
            console.log(response);
            if (response.statusCode === 200) {
                setFormData(response.data);
            } else {
                console.log('Failed to fetch assignment...');
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchAssignmentDetails();
    }, [assignmentId]);

    const displayGrade = formData.grade == null || formData.grade === 0 ? t("ungraded") : formData.grade;
    const displayFilesURLs = formData.filesURLs && formData.filesURLs.length > 0 ? formData.filesURLs : [];

    return (
        <div className={classes.assignment_details}>
            <div className={classes.assignment_container}>
                <form>
                    <div className={classes.container}>
                        <FaIcons.FaHeading className={classes.icon} />
                        <InputText type="text" isInput={isEdit} htmlFor="Title" value={formData.title || ""} />
                    </div>
                    <div className={classes.container}>
                        <FaIcons.FaPenClip className={classes.icon} />
                        <InputText type="text" isInput={isEdit} htmlFor="Description" value={formData.description || ""} />
                    </div>
                    <div className={classes.container}>
                        <FaIcons.FaRegCalendar className={classes.icon} />
                        <InputText type="date" isInput={isEdit} htmlFor="Due_Date" value={formData.end || ""} />
                    </div>
                    <div className={classes.container}>
                        <FaIcons.FaClipboardList className={classes.icon} />
                        <InputText type="number" isInput={isEdit} htmlFor="Points" value={displayGrade} />
                    </div>
                    {displayFilesURLs.length > 0 && (
                        <div className={classes.container}>
                            <FaIcons.FaPaperclip className={classes.icon} />
                            <InputText type="text" isInput={isEdit} htmlFor="Attachment" />
                            {displayFilesURLs.map((url, index) => (
                                <a key={index} href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                            ))}
                        </div>
                    )}
                </form>
            </div>
            {role === 'Staff' && (
                <div className={classes.button_container}>
                    {isEdit ? <Button onSelect={handleSave} text={t("save")} /> : <Button onSelect={handleEdit} text={t("edit")} />}
                    <DeleteButton text={t("delete")} delete_button={classes.delete_button}></DeleteButton>
                </div>
            )}
        </div>
    );
}
