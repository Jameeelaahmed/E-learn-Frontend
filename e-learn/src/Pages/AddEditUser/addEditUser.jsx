import React, { useState } from 'react';
import user from '../../assets/user.png';
import upload from '../../assets/upload.png';
import classes from './addEditUser.module.css';
import { useTranslation } from 'react-i18next';
import FileUpload from '../../Components/Files/FileUpload';
import Button from '../../Components/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';

const AddEditUser = () => {
    const location = useLocation();
    const path = location.pathname;
    const [imagePreviewUrl, setImagePreviewUrl] = useState(user);
    const [isHovered, setIsHovered] = useState(false); // State for hover
    const [role, setRole] = useState('Instructor'); // State for selected role
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        address: '',
        nationality: '',
        relegion: '',
        faculty: '',
        nId: '',
        userName: '',
        grade: '',
        phoneNumber: '',
        departmentId: ''
    });

    const handleProfileImageUpload = e => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            birthDate: formData.birthDate,
            address: formData.address,
            nationality: formData.nationality,
            relegion: formData.relegion,
            faculty: formData.faculty,
            nId: formData.nId,
            userName: 123456789,
            role: role,
            grade: 'الفرقة الرابعة',
            email: formData.email,
            address: 'قنا',
            departmentId: 1
        };

        try {
            const token = getAuthToken();
            const response = await httpRequest('POST', 'https://elearnapi.runasp.net/api/ApplicationUser/AddSignleUser', token, requestBody);
            console.log(requestBody);
            console.log(response);
            if (response.statusCode === 201) {
                console.log('User added successfully');
                navigate('/users');
                window.location.reload();
            } else {
                console.log(response.message);
            }
        } catch (err) {
            console.log(err);
        }
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
                            <label>{t("Relegion")}</label>
                            <input dir='auto' type="text" />
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
                            <label>{t("Address")}</label>
                            <input dir='auto' type="text" />
                        </div>
                        <div className={classes.input_container}>
                            <label>{t("ID")}</label>
                            <input dir='auto' type="number" />
                        </div>
                    </div>
                    <div className={classes.select}>
                        <select value={role} onChange={handleRoleChange}>
                            <option value="Instructor">{t("Instructor")}</option>
                            <option value="Student">{t("Student")}</option>
                        </select>
                    </div>
                    {path === "/users/adduser" &&
                        <>
                            <FileUpload
                                collectFiles={handleCollectFiles}
                                singleFile={true}
                                fileTypes={['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                            />
                            <Button text={t("add")} customClass="fit" onSelect={handleSubmit} />
                        </>
                    }
                    {path === "/users/edituser" &&
                        <Button text={t("save-changes")} customClass="fit" onSelect={handleSubmit}/>
                    }
                </form>
            </div>
        </div>
    );
};

export default AddEditUser;
