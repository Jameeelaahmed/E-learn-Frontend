import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import classes from './AddModal.module.css';
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FileUpload from "../../Components/Files/FileUpload";
import SubmitButton from "../../Components/Button/SubmitButton";
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';

const AddModal = forwardRef(function AddModal(_, ref) {
    const { admingroupID } = useParams();
    const { t } = useTranslation();
    const [materialData, setMaterialData] = useState({
        week: 0,
        type: 0,
        file: null,
    });
    const [assignmentData, setAssignmentData] = useState({
        title: '',
        grade: 0,
        Description: '',
        endTime: '',
        endDate: '',
        file: null,
    });

    const AddModalRef = useRef();
    const location = useLocation();
    const path = location.pathname;

    useImperativeHandle(ref, () => ({
        open: () => {
            AddModalRef.current.showModal();
        },
        close: () => {
            AddModalRef.current.close();
        }
    }));

    function handleCollectFiles(files) {
        if (files.length > 0) {
            if (path === `/admingroups/${admingroupID}`) {
                setMaterialData((prevData) => ({
                    ...prevData,
                    file: files[0],
                }));
            }
            if (path === `/admingroups/${admingroupID}/assignments`) {
                setAssignmentData((prevData) => ({
                    ...prevData,
                    file: files[0],
                }));
            }
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const token = getAuthToken();
            if (path === `/admingroups/${admingroupID}`) {
                const formData = new FormData();
                formData.append('week', materialData.week);
                formData.append('file', materialData.file);
                formData.append('type', materialData.type);

                const response = await httpRequest('POST', `https://elearnapi.runasp.net/api/Material/${admingroupID}/AddMaterial`, token, formData, 'multipart/form-data');
                console.log(response);
                if (response.statusCode === 200) {
                    console.log("Material added successfully:", response.data);
                    AddModalRef.current.close(); // Close the modal on success
                } else {
                    console.log("Error adding material:", response);
                }
            }
            if (path === `/admingroups/${admingroupID}/assignments`) {
                const formData = new FormData();
                formData.append('Title', assignmentData.title);
                formData.append('Grade', assignmentData.grade);
                formData.append('Description', assignmentData.description); // Fix the extra space issue here
                formData.append('Attachments', assignmentData.file); // Ensure this matches the backend DTO field name

                const endDate = assignmentData.endDate;
                const endTime = assignmentData.endTime;
                const endDateTime = `${endDate}T${endTime}`;
                formData.append('End', endDateTime); // Ensure this matches the backend DTO field name
                formData.append('GroupId', admingroupID); // Ensure this matches the backend DTO field name
                console.log('FormData:', assignmentData);
                const response = await httpRequest('POST', 'https://elearnapi.runasp.net/api/Assignment/Create', token, formData, 'multipart/form-data');
                console.log(response);
                if (response.statusCode === 201) {
                    console.log("Assignment added successfully:", response.data);
                    AddModalRef.current.close(); // Close the modal on success
                } else {
                    console.log("Error adding assignment:", response);
                }
            }
        } catch (error) {
            console.log("An error occurred:", error);
        }
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        if (path === `/admingroups/${admingroupID}`) {
            setMaterialData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        if (path === `/admingroups/${admingroupID}/assignments`) {
            setAssignmentData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    }

    return (
        <dialog ref={AddModalRef} className={classes.modal}>
            <form onSubmit={handleSubmit}>
                {path === `/admingroups/${admingroupID}` &&
                    <>
                        <div className={classes.row}>
                            <div className={classes.input_container}>
                                <label htmlFor="type">{t("File Type")}</label>
                                <select name="type" onChange={handleInputChange}>
                                    <option value="0">{t("Lecture")}</option>
                                    <option value="1">{t("Section")}</option>
                                </select>
                            </div>
                            <div className={classes.input_container}>
                                <label htmlFor="week">{t("Week Number")}</label>
                                <input type="number" name="week" onChange={handleInputChange} />
                            </div>
                        </div>
                        <FileUpload collectFiles={handleCollectFiles} />
                    </>
                }
                {path === `/admingroups/${admingroupID}/assignments` &&
                    <>
                        <div className={classes.row}>
                            <div className={classes.input_container}>
                                <label htmlFor="title">{t("Title")}</label>
                                <input type="text" id="title" dir='auto' name="title" onChange={handleInputChange} />
                            </div>
                            <div className={classes.input_container}>
                                <label htmlFor="grade">{t("Grade")}</label>
                                <input type="number" id="grade" dir='auto' name="grade" onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.input_container}>
                                <label htmlFor="time">{t("End Time")}</label>
                                <input type="time" id="time" dir='auto' name="endTime" onChange={handleInputChange} />
                            </div>
                            <div className={classes.input_container}>
                                <label htmlFor="date">{t("End Date")}</label>
                                <input type="date" dir='auto' name="endDate" onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className={classes.description}>
                            <label htmlFor="description">{t('Description')}</label>
                            <textarea id="description" name="description" onChange={handleInputChange}></textarea>
                        </div>
                        <FileUpload collectFiles={handleCollectFiles} />
                    </>
                }

                <div className={classes.submit_button}>
                    <SubmitButton />
                </div>
            </form>
        </dialog>
    );
});

export default AddModal;
