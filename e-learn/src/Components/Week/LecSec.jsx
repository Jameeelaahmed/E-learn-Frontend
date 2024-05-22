import classes from './LecSec.module.css';
import * as FaIcons from "react-icons/fa6";
import { useState } from 'react';

export default function LecSec({ materialType, onDelete }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [openFiles, setOpenFiles] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFiles([...selectedFiles, ...event.target.files]);
    };

    const openFileInBrowser = (file) => {
        const fileUrl = URL.createObjectURL(file);
        window.open(fileUrl, '_blank');
    };

    const toggleOpenFiles = () => {
        setOpenFiles(!openFiles);
    };

    return (
        <div className={`${classes.lec_sec_container} openFiles ? classes.active_slide : ''}`}>
            <div className={`${classes.lec_sec} ${openFiles ? classes.active : ''}`}>
                <p>{materialType}</p>
                <div className={classes.icons}>
                    <label htmlFor="fileInput" className={classes.customFileInput}>
                        <FaIcons.FaCirclePlus className={classes.leftIcon} />
                    </label>
                    <FaIcons.FaCaretDown className={classes.icon} onClick={toggleOpenFiles} />
                </div>
            </div>
            <input type="file" id="fileInput" className={classes.fileInput} multiple onChange={handleFileChange} />
            {openFiles && selectedFiles.length > 0 && (
                <div className={classes.filesContainer}>
                    <ul>
                        {selectedFiles.map((file, index) => (
                            <div className={classes.file_head}>
                                <li key={index} className={classes.file}>
                                    <FaIcons.FaSquare className={classes.file_icon}></FaIcons.FaSquare>
                                    <button onClick={() => openFileInBrowser(file)} className={classes.open_file}>{file.name}</button>
                                </li>
                                <FaIcons.FaTrash
                                    onClick={onDelete}
                                    className={classes.leftIcon} />
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
