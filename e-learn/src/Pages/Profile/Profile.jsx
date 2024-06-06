import Data from '../../Components/Profile/Data';
import classes from './Profile.module.css';
import { useState, useRef, useEffect } from 'react';
import img from '../../assets/avatar.jpg';
import { useTranslation } from 'react-i18next';
import Button from '../../Components/Button/Button';
import { httpRequest } from '../../HTTP';

export default function Profile() {
    const { t } = useTranslation();
    const get_old_Password = useRef();
    const get_new_Password = useRef();
    const confirmPassword = useRef();
    const emailRef = useRef();
    const [changePassword, setChangePassword] = useState(false);
    const [matchPassword, setMatchPassword] = useState(false);
    const [addEmail, setAddEmail] = useState(false);
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false); // State for email confirmation message
    const [error, setError] = useState(''); // State for error message
    const [profile, setProfile] = useState({});
    const [profilePictureUrl, setProfilePictureUrl] = useState(img);

    function handleChangePass() {
        setChangePassword(prev => !prev);
    }

    let password = (
        <div className={classes.password}>
            <label className={classes.label}>{t("password")}</label>
            <p>*********</p>
        </div>
    );

    async function handleSetNewPassword(e) {
        e.preventDefault();
        if (matchPassword) {
            const requestBody = {
                currentPassword : get_old_Password.current.value,
                newPassword : get_new_Password.current.value,
                confirmPassword : confirmPassword.current.value
            }
            try{
                const response = await httpRequest('PUT', 'https://elearnapi.runasp.net/api/Account/Change-Password', localStorage.getItem('token'), requestBody);
                console.log(response);
                if(response.statusCode === 200){
                    console.log('Password changed successfully');
                }else{
                    console.log('Error changing password');
                }
            }
            catch(err){
                console.log(err);
            }

            setChangePassword(false);
        }
    }

    function handleMatchPassword() {
        if (get_new_Password.current.value === confirmPassword.current.value) {
            setMatchPassword(true);
        } else {
            setMatchPassword(false);
        }
    }

    function handleAddEmail() {
        setAddEmail(prev => !prev);
        setError('');
        setEmailSent(false);
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    async function handleSaveEmail() {
        const Email = emailRef.current.value;
        if (!validateEmail(Email)) {
            setError(t("Invalid email address"));
            return;
        }
        try {
            var response = await httpRequest('POST', 'https://elearnapi.runasp.net/api/Account/Add-Email', localStorage.getItem('token'), Email);
            console.log(response);
            if (response.statusCode === 200) {
                localStorage.setItem('email', Email); // Update email in local storage
                setEmail(Email);
                console.log('Email added successfully');
                setEmailSent(true); // Set emailSent to true on successful email addition
                setAddEmail(false); // Hide the Add email input and button
                setError('');
            } else {
                console.log('Error adding email');
                setError(t("Error adding email"));
            }
        } catch (err) {
            console.log(err);
            setError(t("Error adding email"));
        }
    }

    if (changePassword) {
        password = (
            <div className={classes.password}>
                <label htmlFor="old-password" className={classes.label}>{t("old-password")}</label>
                <input id="old-password" type="password" ref={get_old_Password} className={classes.input} />
                <label htmlFor="new-password" className={classes.label}>{t("new-password")}</label>
                <input id="new-password" type="password" ref={get_new_Password} onBlur={handleMatchPassword} className={classes.input} />
                <label htmlFor="confirm-password" className={classes.label}>{t("confirm-password")}</label>
                <input id="confirm-password" type="password" ref={confirmPassword} onBlur={handleMatchPassword} className={classes.input} />
                {!matchPassword && <p className={classes.warning}>{t("not-match")}</p>}
            </div>
        );
    }
    
    async function userProfile() {
        const token = localStorage.getItem('token');
        const response = await httpRequest('GET', 'https://elearnapi.runasp.net/api/Account/Get-User-Profile', token);
        if (response.statusCode === 200) {
            console.log('Profile fetched successfully');
            console.log(response);
            setProfile(response.data);
            const profilePictureName = response.data.profilePictureName;
            if(profilePictureName){
                setProfilePictureUrl(`https://elearnapi.runasp.net/api/files/ViewFile/ProfilePictures/${profilePictureName}`);
            }
        } else {
            console.log(response);
        }
    }

    useEffect(() => {
        userProfile();
    }, []);

    const fullName = localStorage.getItem('fullName');
    const userEmail = profile.Email;
    console.log(userEmail);
    const userName = localStorage.getItem('userName');

    return (
        <div className={classes.profile}>
            <div className={classes.image}>
                <img src={profilePictureUrl} alt="Profile Picture" />
            </div>
            <div className={classes.box}>
                <p className={classes.title}>{t("Personel-Information")}</p>
                <div className={classes.row}>
                    <Data label={t("Student-Name")} name={fullName} />
                    <Data label={t("Relegion")} name={profile.relegion} />
                </div>
                <div className={classes.row}>
                    <Data label={t("Address")} name={profile.address} />
                    <Data label={t("Phone-Num")} name={profile.phoneNumber ? profile.phoneNumber : 'لا يوجد'} />
                </div>
                <div className={classes.row}>
                    <Data label={t("Nationality")} name={profile.nationality} />
                    <div className={classes.email_container}>
                        <Data label={t("Email")} name={userEmail && userEmail !== 'null' ? userEmail : email} />
                        {(!userEmail || userEmail === 'null') && (
                            <>
                                {addEmail && (
                                    <div>
                                        <input className={`${classes.input} ${classes.email_input}`} type="email" ref={emailRef} />
                                        <button onClick={handleSaveEmail} className={classes.add_email}>{t("save")}</button>
                                    </div>
                                )}
                                {!addEmail && !emailSent && (
                                    <button onClick={handleAddEmail} className={classes.add_email}>{t("add-email")}</button>
                                )}
                            </>
                        )}
                        {error && <p className={classes.error}>{error}</p>} {/* Display error message */}
                        {emailSent && <p className={classes.success}>{t("Email sent with confirmation link.")}</p>} {/* Display confirmation message */}
                    </div>
                </div>
            </div>
            <div className={classes.box}>
                <p className={classes.title}>{t("Academic-Information")}</p>
                <div className={classes.row}>
                    <Data label={t("Faculty")} name={profile.faculty} />
                    <Data label={t("Student-ID")} name={userName} />
                </div>
                <div className={classes.row}>
                    <Data label={t("level")} name={profile.level ? profile.level : 'لا يوجد'} />
                    <Data label={t("department")} name={profile.department} />
                </div>
            </div>
            <div className={classes.box}>
                <div className={classes.password_container}>
                    <p className={classes.title}>{t("Security-Information")}</p>
                    <div className={classes.password_button}>
                        {changePassword ? <Button onSelect={handleSetNewPassword} className={classes.edit} text={t("Save")} /> :
                            <Button onSelect={handleChangePass} className={classes.edit} text={t("change-password")} />}
                    </div>
                </div>
                <div className={classes.password}>
                    {password}
                </div>
            </div>
        </div>
    );
}
