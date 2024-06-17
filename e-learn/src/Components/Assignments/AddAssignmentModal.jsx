import { useRef, forwardRef, useImperativeHandle, useState, useCallback } from "react";
import classes from './AddAssignmentModal.module.css';
import FileUpload from "../Files/FileUpload";
import { useTranslation } from "react-i18next";
import { httpRequest } from '../../HTTP';
import { getAuthToken } from "../../Helpers/AuthHelper";
import SubmitButton from "../Button/SubmitButton";
import { useParams } from "react-router-dom";

const AddAssignmentModal = forwardRef(function AddAssignmentModal({ onSuccess }, ref) {
    const { t } = useTranslation();
    const { groupId } = useParams();
    const [assignmentData, setAssignmentData] = useState({
        title: "",
        grade: "",
        endTime: "",
        endDate: "",
        description: "",
        files: [],
    });

    const addAssignmentDialog = useRef();
    useImperativeHandle(ref, () => ({
        open: () => {
            addAssignmentDialog.current.showModal();
        },
        close: () => {
            addAssignmentDialog.current.close();
        }
    }));

    function handleCollectFiles(files) {
        setAssignmentData((prevData) => ({
            ...prevData,
            files: files,
        }));
    }

    const handleCancelClick = useCallback((e) => {
        if (ref && ref.current) {
            ref.current.close();
            e.target.form.reset();
        }
    }, [ref]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);

        // Collecting EndDate and EndTime and combining them into a single DateTime string
        const endDate = e.target.elements.EndDate.value;
        const endTime = e.target.elements.EndTime.value;
        const endDateTime = `${endDate}T${endTime}`;

        fd.append('GroupId', groupId);
        fd.append('End', endDateTime);  // Ensure this matches the backend DTO field name
        
        assignmentData.files.forEach(file => {
            fd.append('Attachements', file);  // Ensure this matches the backend DTO field name
        });

        // Log FormData contents for debugging
        for (let pair of fd.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            const token = getAuthToken();
            console.log('Request Body:', fd);
            console.log(endDateTime);
            const response = await httpRequest('POST', 'https://elearnapi.runasp.net/api/Assignment/Create', token, fd, 'multipart/form-data');
            console.log('Response:', response);
            if (response.statusCode === 201) {
                console.log('Assignment created successfully');
                ref.current.close(); // Close the modal
                onSuccess(); // Call the onSuccess callback to update the assignments list
            } else {
                console.log('Failed to create assignment', response);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    }, [assignmentData.files, groupId, onSuccess]);

    return (
        <dialog ref={addAssignmentDialog} className={classes.modal}>
            <form method="dialog" className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.input_container}>
                    <label htmlFor="title">{t("title")}</label>
                    <input type="text" id="title" dir='auto' name="Title" required />
                </div>
                <div className={classes.input_container}>
                    <label htmlFor="grade">{t("grade")}</label>
                    <input type="number" id="grade" dir='auto' name="Grade" />
                </div>
                <div className={classes.row}>
                    <div className={classes.input_container}>
                        <label htmlFor="endTime">{t("end-time")}</label>
                        <input type="time" id="endTime" dir='auto' name="EndTime" required />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="endDate">{t("end-date")}</label>
                        <input type="date" id="endDate" dir='auto' name="EndDate" required />
                    </div>
                </div>
                <div className={classes.description}>
                    <label htmlFor="description">{t('description')}</label>
                    <textarea id="description" name="Description" required></textarea>
                </div>
                <FileUpload collectFiles={handleCollectFiles} />
                <SubmitButton cancel={handleCancelClick} />
            </form>
        </dialog>
    );
});

export default AddAssignmentModal;
