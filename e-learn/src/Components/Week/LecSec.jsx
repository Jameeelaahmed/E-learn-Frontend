import classes from './LecSec.module.css';
import * as FaIcons from "react-icons/fa6";
import { useState, useRef } from 'react';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DeleteModal from '../DeleteModal/DeleteModal';
import { FaSpinner } from 'react-icons/fa6'; // Import the loading spinner icon
import Loading from '../loading/loading';

export default function LecSec({ role, materialTypeName, materialType, materials, weekNum, onDelete, onAddMaterial, id }) {
    const [openFiles, setOpenFiles] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state for delete operation
    const [fileUploadLoading, setFileUploadLoading] = useState(false); // Loading state for file upload
    const [deleteMaterialId, setDeleteMaterialId] = useState(null); // Store material ID to be deleted
    const params = useParams();
    const groupId = params.groupId;
    const deleteModal = useRef();
    const { t } = useTranslation();

    const isInstructor = role === 'Staff';

    const toggleOpenFiles = () => {
        setOpenFiles(!openFiles);
    };

    const handleDelete = async () => {
        if (deleteMaterialId) {
            setLoading(true); // Set loading to true before the request
            try {
                const token = getAuthToken();
                const response = await httpRequest('DELETE', `https://elearnapi.runasp.net/api/Material/Delete/${deleteMaterialId}`, token);
                if (response.statusCode === 200) {
                    onDelete(deleteMaterialId); // Notify parent component to update state
                } else {
                    console.error("Failed to delete material:", response.message);
                }
            } catch (error) {
                console.error("Error deleting material:", error);
            } finally {
                setLoading(false); // Set loading to false after the request completes
                deleteModal.current.close(); // Close the modal
            }
        }
    };

    const handleFileChange = async (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);

        if (files.length > 0) {
            setFileUploadLoading(true); // Set loading state for file upload

            const token = getAuthToken();
            const formData = new FormData();
            formData.append('Week', weekNum);
            formData.append('Type', materialType === "lecture" ? 0 : materialType === "section" ? 1 : ""); // Correctly set the type

            try {
                for (const file of files) {
                    formData.append('File', file);
                    const response = await httpRequest('POST', `https://elearnapi.runasp.net/api/Material/${groupId}/AddMaterial`, token, formData, 'multipart/form-data');
                    if (response.statusCode === 200) {
                        if (typeof onAddMaterial === 'function') {
                            onAddMaterial(response.data); // Notify parent component to refresh materials list
                        } else {
                            console.error("onAddMaterial is not a function");
                        }
                    } else {
                        console.error("Failed to add material:", response.message);
                    }
                }
            } catch (error) {
                console.error("Error adding material:", error);
            } finally {
                setFileUploadLoading(false); // Unset loading state after all file uploads
            }
        }
    };

    return (
        <div className={`${classes.lec_sec_container} ${openFiles ? classes.active_slide : ''}`}>
            <div className={`${classes.lec_sec} ${openFiles ? classes.active : ''}`}>
                <p>{materialTypeName}</p>
                <div className={classes.icons}>
                    {isInstructor &&
                        <label htmlFor={id} className={classes.customFileInput}>
                            {fileUploadLoading ? (
                                openFiles ? <Loading color="white" /> : <Loading color="#084c61" />
                            ) : (
                                <FaIcons.FaCirclePlus className={classes.leftIcon} />
                            )}
                            <input type="file" id={id} className={classes.fileInput} multiple onChange={handleFileChange} />
                        </label>
                    }
                    <FaIcons.FaCaretDown className={classes.icon} onClick={toggleOpenFiles} />
                </div>
            </div>
            {openFiles && materials && (
                <div className={classes.filesContainer}>
                    <ul>
                        {materials.map((material) => (
                            <div className={classes.file_head} key={material.id}>
                                <li className={classes.file}>
                                    <FaIcons.FaSquare className={classes.file_icon}></FaIcons.FaSquare>
                                    <a href={material.viewUrl} target="_blank" rel="noopener noreferrer" className={classes.open_file}>{material.title}</a>
                                </li>
                                {isInstructor &&
                                    (loading && deleteMaterialId === material.id ? (
                                        // <FaSpinner className={classes.loadingIcon} />
                                        <div className={classes.load}>
                                            <Loading color="#084c61"></Loading>
                                        </div>
                                    ) : (
                                        <FaIcons.FaTrash
                                            onClick={() => {
                                                setDeleteMaterialId(material.id);
                                                deleteModal.current.open();
                                            }}
                                            className={classes.leftIcon} />
                                    ))
                                }
                                <DeleteModal
                                    ref={deleteModal}
                                    onDelete={handleDelete}
                                    deletedItem={t("file")}></DeleteModal>
                            </div>
                        ))}
                    </ul>
                </div >
            )}
        </div >
    );
}
