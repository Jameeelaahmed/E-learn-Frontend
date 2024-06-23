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

    function handleCollectFiles(files) {
        if (files.length > 0) {
            setMaterialData((prevData) => ({
                ...prevData,
                file: files[0],
            }));
        }
    }

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

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const token = getAuthToken();
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
        } catch (error) {
            console.log("Error adding material:", error);
        }
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setMaterialData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
                                <input type="text" id="title" dir='auto' name="title" />
                            </div>
                            <div className={classes.input_container}>
                                <label htmlFor="grade">{t("Grade")}</label>
                                <input type="number" id="grade" dir='auto' name="grade" />
                            </div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.input_container}>
                                <label htmlFor="time">{t("End Time")}</label>
                                <input type="time" id="time" dir='auto' name="endTime" />
                            </div>
                            <div className={classes.input_container}>
                                <label htmlFor="date">{t("End Date")}</label>
                                <input type="date" dir='auto' name="endDate" />
                            </div>
                        </div>
                        <div className={classes.description}>
                            <label htmlFor="description">{t('Description')}</label>
                            <textarea id="description" name="description"></textarea>
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
