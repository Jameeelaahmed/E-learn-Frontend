import classes from './LecSec.module.css';
import * as FaIcons from "react-icons/fa6";
import { useState } from 'react';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LecSec({ role, materialTypeName, materialType, materials, weekNum, onDelete, onAddMaterial, id }) {
    const [openFiles, setOpenFiles] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const params = useParams();
    const groupId = params.groupId;


    const { t } = useTranslation();

    const isInstructor = role === 'Staff';

    const toggleOpenFiles = () => {
        setOpenFiles(!openFiles);
    };

    const handleDelete = async (materialId) => {
        if (materialId) {
            try {
                const token = getAuthToken();
                const response = await httpRequest('DELETE', `https://elearnapi.runasp.net/api/Material/Delete/${materialId}`, token);
                if (response.statusCode === 200) {
                    onDelete(materialId); // Notify parent component to update state
                } else {
                    console.error("Failed to delete material:", response.message);
                }
            } catch (error) {
                console.error("Error deleting material:", error);
            }
        }
    };

    const handleFileChange = async (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);

        const token = getAuthToken();
        files.forEach(async (file) => {
            if (file) {
                const formData = new FormData();
                formData.append('Week', weekNum);
                formData.append('File', file);
                formData.append('Type', materialType === "lecture" ? 0 : materialType === "section" ? 1 : ""); // Correctly set the type
                console.log(`Week: ${weekNum}, Type: ${materialType === "lecture" ? "lec" : materialType === "section" ? "sec" : ""}`);

                try {
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
                } catch (error) {
                    console.error("Error adding material:", error);
                }
            }
        });
    };

    return (
        <div className={`${classes.lec_sec_container} ${openFiles ? classes.active_slide : ''}`}>
            <div className={`${classes.lec_sec} ${openFiles ? classes.active : ''}`}>
                <p>{materialTypeName}</p>
                <div className={classes.icons}>
                    {isInstructor &&
                        <label htmlFor={id} className={classes.customFileInput}>
                            <FaIcons.FaCirclePlus className={classes.leftIcon} />
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
                                    <FaIcons.FaTrash
                                        onClick={() => handleDelete(material.id)}
                                        className={classes.leftIcon} />
                                }
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
