// FileItem.js
import { FaFile, FaSpinner, FaTrash } from "react-icons/fa";
import classes from './FileItem.module.css';

export default function FileItem({ file, deleteFile }) {
    return (
        <li className={classes.file_item}>
            <FaFile />
            <p>{file.name}</p>
            <div className="actions">
                <div className="loading">{file.isUploading && <FaSpinner className="fa-spin" />}</div>
                {!file.isUploading && <FaTrash onClick={() => deleteFile(file.name)} />}
            </div>
        </li>
    )
}
