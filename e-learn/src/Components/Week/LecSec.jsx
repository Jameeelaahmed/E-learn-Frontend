import classes from './LecSec.module.css';
import * as FaIcons from "react-icons/fa6";
import { useState } from 'react';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LecSec({ role, materialType, onDelete, material, weekNum, onAddMaterial }) {
    const [openFiles, setOpenFiles] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const params = useParams();
    const groupId = params.groupId;
    const { t } = useTranslation();

    const isInstructor = role === 'Staff';

    const toggleOpenFiles = () => {
        setOpenFiles(!openFiles);
    };

    const handleDelete = async () => {
        if (material && material.id) {
            try {
                const token = getAuthToken();
                const response = await httpRequest('DELETE', `https://elearnapi.runasp.net/api/Material/Delete/${material.id}`, token);
                if (response.statusCode === 200) {
                    onDelete(material.id); // Notify parent component to update state
                } else {
                    console.error("Failed to delete material:", response.message);
                }
            } catch (error) {
                console.error("Error deleting material:", error);
            }
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    
        if (file) {
            const formData = new FormData();
            formData.append('Week', weekNum);
            formData.append('File', file);
            formData.append('Type', materialType.includes(t("Lecture")) ? 0 : 1);
            console.log(`Week ${formData.weekNum}`);
            console.log(materialType);
            console.log(t("Lecture"));
            const token = getAuthToken();
            try {
                const response = await httpRequest('POST', `https://elearnapi.runasp.net/api/Material/${groupId}/AddMaterial`, token, formData, 'multipart/form-data');
                console.log(response);
    
                if (response.statusCode === 200) {
                    console.log("Material added successfully:", response.data);
                    if (typeof onAddMaterial === 'function') {
                        onAddMaterial(response.data); // Notify parent component to refresh materials list
                    } else {
                        console.error("onAddMaterial is not a function");
                    }
                } else {
                    console.error("Failed to add material:", response.message);
                }
            } catch (error) {
                console.error("Error adding material:", error);
            }
        }
    };
    

    return (
        <div className={`${classes.lec_sec_container} ${openFiles ? classes.active_slide : ''}`}>
            <div className={`${classes.lec_sec} ${openFiles ? classes.active : ''}`}>
                <p>{materialType}</p>
                <div className={classes.icons}>
                    {isInstructor &&
                        <label htmlFor="fileInput" className={classes.customFileInput}>
                            <FaIcons.FaCirclePlus className={classes.leftIcon} />
                            <input type="file" id="fileInput" className={classes.fileInput} onChange={handleFileChange} />
                        </label>
                    }
                    <FaIcons.FaCaretDown className={classes.icon} onClick={toggleOpenFiles} />
                </div>
            </div>
            {openFiles && material && (
                <div className={classes.filesContainer}>
                    <ul>
                        <div className={classes.file_head}>
                            <li className={classes.file}>
                                <FaIcons.FaSquare className={classes.file_icon}></FaIcons.FaSquare>
                                <a href={material.viewUrl} target="_blank" rel="noopener noreferrer" className={classes.open_file}>{material.title}</a>
                            </li>
                            {isInstructor &&
                                <FaIcons.FaTrash
                                    onClick={handleDelete}
                                    className={classes.leftIcon} />
                            }
                        </div>
                    </ul>
                </div>
            )}
        </div>
    );
}
