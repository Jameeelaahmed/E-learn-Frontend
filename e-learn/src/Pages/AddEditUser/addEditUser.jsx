import React, { useState } from 'react';
import user from '../../assets/user.png';
import upload from '../../assets/upload.png'
import classes from './addEditUser.module.css';
import { useTranslation } from 'react-i18next';
import FileUpload from '../../Components/Files/FileUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUpload } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Components/Button/Button';
import { useLocation } from 'react-router-dom';
const AddEditUser = () => {

    const location = useLocation();
    const path = location.pathname;
    const [imagePreviewUrl, setImagePreviewUrl] = useState(user);
    const [isHovered, setIsHovered] = useState(false); // State for hover
    const { t } = useTranslation();

    const handleProfileImageUpload = e => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    function handleCollectFiles(files) {
        setImagePreviewUrl(files[0] ? URL.createObjectURL(files[0]) : user);
    }

    const imageLoaded = imagePreviewUrl && imagePreviewUrl !== user;

    return (
        <div className={classes.addEditUser}>
            <div className={classes.image}>
                <label name="photo-upload">
                    <div className={`img-wrap img-upload ${imageLoaded ? 'loaded' : 'default'}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {imageLoaded ? (
                            <img src={imagePreviewUrl} alt="Profile" className={classes.img} />
                        ) : (
                            isHovered ? (
                                <img src={upload} alt="Upload" className={classes.img_upload} />
                            ) : (
                                <img src={user} alt="Profile" className={classes.img} />
                            )
                        )}
                        <input id="photo-upload" type="file" onChange={handleProfileImageUpload} style={{ display: 'none' }} />
                    </div>
                </label>
            </div>
            <div className={classes.form_container}>
                <form>
                    <div className={classes.row}>
                        <div className={classes.input_container}>
                            <label>{t("first-name")}</label>
                            <input dir='auto' type="text" />
                        </div>
                        <div className={classes.input_container}>
                            <label>{t("last-name")}</label>
                            <input dir='auto' type="text" />
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.input_container}>
                            <label>{t("birthdate")}</label>
                            <input dir='auto' type="date" />
                        </div>
                        <div className={classes.input_container}>
                            <label>{t("national-id")}</label>
                            <input dir='auto' type="number" />
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.input_container}>
                            <label>{t("nationality")}</label>
                            <input dir='auto' type="text" />
                        </div>
                        <div className={classes.input_container}>
                            <label>{t("email")}</label>
                            <input dir='auto' type="email" />
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.input_container}>
                            <label>{t("grade")}</label>
                            <input dir='auto' type="text" />
                        </div>
                        <div className={classes.input_container}>
                            <label>{t("department")}</label>
                            <input dir='auto' type="text" />
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.input_container}>
                            <label>{t("Phone-Num")}</label>
                            <input dir='auto' type="number" />
                        </div>
                        <div className={classes.input_container}>
                            <label>{t("ID")}</label>
                            <input dir='auto' type="number" />
                        </div>
                    </div>
                    {path === "/users/adduser" &&
                        <>
                            <FileUpload
                                collectFiles={handleCollectFiles}
                                singleFile={true}
                                fileTypes={['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                            />
                            <Button text={t("add")} customClass="fit" ></Button>
                        </>
                    }
                    {path === "/users/edituser" &&
                        <Button text={t("save-changes")} customClass="fit" ></Button>
                    }
                </form>
            </div>
        </div>
    );
}

export default AddEditUser;
