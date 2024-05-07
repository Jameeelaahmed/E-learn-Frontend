import { useState } from 'react';
import classes from './AddWork.module.css';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
export default function AddWork() {
    const {t}=useTranslation()
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFiles([...selectedFiles, ...event.target.files]);
    };

    const openFileInBrowser = (file) => {
        const fileUrl = URL.createObjectURL(file);
        window.open(fileUrl, '_blank');
    };

    return (
        <div className={classes.add_work}>
            {selectedFiles.length > 0 && (
                <div>
                    <ul>
                        {selectedFiles.map((file, index) => (
                            <li key={index}>
                                <button onClick={() => openFileInBrowser(file)}>{file.name}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Wrap the button around the file input */}
            <label htmlFor="add_file">
                <input type="file" multiple onChange={handleFileChange} id="add_file" />
            </label>
            <Button text={t("add")}></Button>
        </div>
    );
}
