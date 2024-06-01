import { useState, useRef } from 'react';
import classes from './AddWork.module.css';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import FileUpload from '../Files/FileUpload';

export default function AddWork() {
    const { t } = useTranslation();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFiles([...selectedFiles, ...event.target.files]);
    };

    const openFileInBrowser = (file) => {
        const fileUrl = URL.createObjectURL(file);
        window.open(fileUrl, '_blank');
    };

    const handleAddButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={classes.add_work}>
            <FileUpload collectFiles={setSelectedFiles} ref={fileInputRef} onChange={handleFileChange} />
        </div>
    );
}
