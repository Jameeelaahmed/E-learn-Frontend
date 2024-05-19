import { useState, useRef } from 'react';
import classes from './AddWork.module.css';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';

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
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                multiple
            />
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
            <Button text={t("add")} onClick={handleAddButtonClick} />
        </div>
    );
}
