import classes from './LecSec.module.css';
import * as FaIcons from "react-icons/fa6";
import { useState } from 'react';

export default function LecSec({ role, materialType, onDelete, material }) {
    const [openFiles, setOpenFiles] = useState(false);

    const isInstructor = role === 'Staff';

    const toggleOpenFiles = () => {
        setOpenFiles(!openFiles);
    };

    return (
        <div className={`${classes.lec_sec_container} ${openFiles ? classes.active_slide : ''}`}>
            <div className={`${classes.lec_sec} ${openFiles ? classes.active : ''}`}>
                <p>{materialType}</p>
                <div className={classes.icons}>
                    {isInstructor &&
                        <label htmlFor="fileInput" className={classes.customFileInput}>
                            <FaIcons.FaCirclePlus className={classes.leftIcon} />
                        </label>
                    }
                    <FaIcons.FaCaretDown className={classes.icon} onClick={toggleOpenFiles} />
                </div>
            </div>
            <input type="file" id="fileInput" className={classes.fileInput} multiple onChange={() => {}} />
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
                                    onClick={onDelete}
                                    className={classes.leftIcon} />
                            }
                        </div>
                    </ul>
                </div>
            )}
        </div>
    );
}
