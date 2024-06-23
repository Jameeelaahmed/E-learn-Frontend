import React, { useState, useEffect } from 'react';
import classes from '../AddEditUser/addEditUser.module.css';
import { useTranslation } from 'react-i18next';
import FileUpload from '../../Components/Files/FileUpload';
import Button from '../../Components/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';

export default function AddEditGroup() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    const { t } = useTranslation();
    const [files, setFiles] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedInstructor, setSelectedInstructor] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');

    // Function to handle collected files from FileUpload component
    function handleCollectFiles(files) {
        setFiles(files);
    }

    // Function to handle form submission
    async function handleSubmit(event) {
        event.preventDefault();

        const requestBody = {
            name: groupName,
            description: description,
            instructorName: selectedInstructor,
            departmentId: selectedDepartment,
        };

        try {
            console.log(requestBody);
            const token = getAuthToken();
            const response = await httpRequest('POST', 'https://elearnapi.runasp.net/api/Group/CreateNew', token, requestBody);
            console.log(response);
            if (response.statusCode === 201) {
                console.log('navigating ..')
                navigate('/admingroups');
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function getAllInstructors() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', 'https://elearnapi.runasp.net/api/ApplicationUser/GetByRoleStaff', token);
            if (response.statusCode === 200) {
                setInstructors(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function getAllDepartments() {
        try {
            const token = getAuthToken();
            const response = await httpRequest('GET', 'https://elearnapi.runasp.net/api/Group/GetAllDepartements', token);
            if (response.statusCode === 200) {
                setDepartments(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllInstructors();
        getAllDepartments();
    }, []);

    return (
        <div className={classes.addEditUser}>
            <div className={classes.form_container}>
                <form onSubmit={handleSubmit}>
                    <div className={classes.row}>
                        <div className={classes.input_container}>
                            <label>{t('group-name')}</label>
                            <input dir='auto' type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                        </div>
                        <div className={classes.input_container}>
                            <label>{t('ins-name')}</label>
                            <select dir='auto' value={selectedInstructor} onChange={(e) => setSelectedInstructor(e.target.value)}>
                                <option value="">{t('select-instructor')}</option>
                                {instructors.map((instructor, index) => (
                                    <option key={index} value={instructor.id}>
                                        {instructor.firstName + ' ' + instructor.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.input_container}>
                            <label>{t('description')}</label>
                            <input dir='auto' type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className={classes.input_container}>
                            <label>{t('department')}</label>
                            <select dir='auto' value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                                <option value="">{t('select-department')}</option>
                                {departments.map((department, index) => (
                                    <option key={index} value={department.id}>
                                        {department.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {path === '/admingroups/addgroup' && (
                        <>
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
