import classes from './AssignmentDetails.module.css';
import * as FaIcons from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import InputText from '../InputText/InputText';
import Button from '../Button/Button';
import DeleteButton from '../Button/DeleteButton';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteModal from '../DeleteModal/DeleteModal';

export default function AssignmentDetails() {
    const { t } = useTranslation();
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        end: '',
        grade: null
    });
    const params = useParams();
    const assignmentId = params.assignmentId;
    const groupId = params.groupId;
    const navigate = useNavigate();
    const deleteModal = useRef();

    const role = getRole();
    function getRole() {
        return localStorage.getItem('role');
    }

    function handleEdit() {
        setIsEdit(prev => !prev);
    }

    async function handleSave() {
        const assignmentData = {
            Title: formData.title,
            Description: formData.description,
            GroupId: parseInt(groupId, 10), // Ensure GroupId is an integer
            End: formData.end,
            Grade: formData.grade // Optional, can be null
        };

        console.log('Assignment Data Before Save:', assignmentData);

        try {
            const token = getAuthToken();
            console.log('Assignment Data:', assignmentData);
            const response = await httpRequest('PUT', `https://elearnapi.runasp.net/api/Assignment/UpdateAssignment/${assignmentId}`, token, assignmentData);
            console.log('Response:', response);
            if (response.statusCode === 200) {
                console.log('Assignment updated successfully');
                setFormData(response.data); // Update the formData state with the new data
                setIsEdit(false);
            } else {
                console.log('Failed to update assignment', response);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    }

    async function fetchAssignmentDetails() {
        try {
            console.log('Fetching Assignment Details...', assignmentId);
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

    async function handleDelete() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('DELETE', `https://elearnapi.runasp.net/api/Assignment/Delete/${assignmentId}`, token);
            console.log(response);
            if (response.statusCode === 200) {
                console.log('Assignment Deleted Successfully');
                navigate(`/groups/${groupId}/assignments`);
            }
        } catch (error) {
            console.log('an error occurred, ', error);
        } finally {
            deleteModal.current.close(); // Close the modal
            navigate(`/groups/${groupId}/assignments`);
        }
    }

    const displayGrade = formData.grade == null || formData.grade === 0 ? t("ungraded") : formData.grade;
    const displayFilesURLs = formData.filesURLs && formData.filesURLs.length > 0 ? formData.filesURLs : [];

    return (
        <div className={classes.assignment_details}>
            <div className={classes.assignment_container}>
                <form>
                    <div className={classes.container}>
                        <FaIcons.FaHeading className={classes.icon} />
                        <InputText
                            type="text"
                            isInput={isEdit}
                            htmlFor="Title"
                            value={formData.title || ""}
                            onChange={(e) => {
                                console.log('Title Changed:', e.target.value);
                                setFormData({ ...formData, title: e.target.value });
                            }}
                        />
                    </div>
                    <div className={classes.container}>
                        <FaIcons.FaPenClip className={classes.icon} />
                        <InputText
                            type="text"
                            isInput={isEdit}
                            htmlFor="Description"
                            value={formData.description || ""}
                            onChange={(e) => {
                                console.log('Description Changed:', e.target.value);
                                setFormData({ ...formData, description: e.target.value });
                            }}
                        />
                    </div>
                    <div className={classes.container}>
                        <FaIcons.FaRegCalendar className={classes.icon} />
                        <InputText
                            type="date"
                            isInput={isEdit}
                            htmlFor="Due_Date"
                            value={formData.end || ""}
                            onChange={(e) => {
                                console.log('End Date Changed:', e.target.value);
                                setFormData({ ...formData, end: e.target.value });
                            }}
                        />
                    </div>
                    <div className={classes.container}>
                        <FaIcons.FaClipboardList className={classes.icon} />
                        <InputText
                            type="number"
                            isInput={isEdit}
                            htmlFor="Points"
                            value={formData.grade}
                            onChange={(e) => {
                                console.log('Grade Changed:', e.target.value);
                                setFormData({ ...formData, grade: e.target.value });
                            }}
                        />
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
                    <DeleteButton text={t("delete")} delete_button={classes.delete_button} onDelete={() => { deleteModal.current.open(); }}></DeleteButton>
                    <DeleteModal ref={deleteModal} deletedItem={t("assignment")} onDelete={handleDelete} />
                </div>
            )}
        </div>
    );
}
