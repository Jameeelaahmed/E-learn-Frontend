import React, { useState } from 'react';
import classes from '../AddEditUser/addEditUser.module.css';
import { useTranslation } from 'react-i18next';
import FileUpload from '../../Components/Files/FileUpload';
import Button from '../../Components/Button/Button';
import { useLocation } from 'react-router-dom';

export default function AddEditGroup() {
    const location = useLocation();
    const path = location.pathname;
    const { t } = useTranslation();
    const [files, setFiles] = useState([]);

    // Function to handle collected files from FileUpload component
    function handleCollectFiles(files) {
        setFiles(files);
    }

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        // Perform form submission logic based on path
        if (path === '/admingroups/addgroup') {
            // Handle add group logic
            console.log('Adding group:', files);
        } else if (path === '/users/edituser') {
            // Handle edit user logic
            console.log('Editing user:', files);
        }
        // Optionally, you can reset the form or redirect after submission
    }

    return (
        <div className={classes.addEditUser}>
            <div className={classes.form_container}>
                <form onSubmit={handleSubmit}>
                    <div className={classes.row}>
                        <div className={classes.input_container}>
                            <label>{t('group-name')}</label>
                            <input dir='auto' type="text" />
                        </div>
                        <div className={classes.input_container}>
                            <label>{t('ins-name')}</label>
                            <input dir='auto' type="text" />
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.input_container}>
                            <label>{t('id')}</label>
                            <input dir='auto' type="number" />
                        </div>
                        <div className={classes.input_container}>
                            <label>{t('department')}</label>
                            <input dir='auto' type="number" />
                        </div>
                    </div>
                    {path === '/admingroups/addgroup' && (
                        <>
                            <FileUpload
                                collectFiles={handleCollectFiles}
                                singleFile={true}
                                fileTypes={['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                            />
                            <Button text={t('add')} type="submit" customClass="fit" />
                        </>
                    )}
                    {path === '/admingroups/editgroup' && (
                        <Button text={t('save-changes')} type="submit" customClass="fit" />
                    )}
                </form>
            </div>
        </div>
    );
}
