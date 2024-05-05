import Data from './Data'
import classes from './Profile.module.css'
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next'
import Button from '../Button/Button';
export default function Profile() {
    const { t } = useTranslation();
    const get_old_Password = useRef()
    const get_new_Password = useRef()
    const confirmPassword = useRef()
    const emailRef = useRef();
    const [changePassword, setChangePassword] = useState(false)
    const [matchPassword, setMatchPassword] = useState(false)
    const [addEmail, setAddEmail] = useState(false)
    function handleChangePass() {
        setChangePassword(prev => !prev)
    }

    let password = (
        <div className={classes.password}>
            <label className={classes.label}>{t("password")}</label>
            <p>*********</p>
        </div>
    )
    function handleSetNewPassword(e) {
        e.preventDefault()
        if (matchPassword) {
            setChangePassword(false)
        }
    }

    function handleMatchPassword() {
        if (get_new_Password.current.value === confirmPassword.current.value) {
            setMatchPassword(true)
        } else {
            setMatchPassword(false)
        }
    }

    function handleAddEmail() {
        setAddEmail(prev => (!prev))
    }

    function handleSaveEmail() {
        let email = emailRef.current.value;
        setAddEmail(false)
        console.log(email)
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
        )
    }
    return (
        <div className={classes.profile}>
            <img src="../../assets/avatar.jpg" alt="" />
            <div className={classes.box}>
                <p className={classes.title}>{t("Personel-Information")}</p>
                <div className={classes.row}>
                    <Data label={t("Student-Name")} name="jam" />
                    <Data label={t("Relegion")} name="muslim" />
                </div>
                <div className={classes.row}>
                    <Data label={t("Address")} name="st." />
                    <Data label={t("Phone-Num")} name="01004245652" />
                </div>
                <div className={classes.row}>
                    <Data label={t("Nationality")} name="Egyptian" />
                    <div className={classes.email_container}>
                        {/* <label htmlFor="email">{t("email")}</label> */}
                            {addEmail ? <button onClick={handleSaveEmail} className={classes.add_email}>{t("save")}</button>: <button onClick={handleAddEmail}  className={classes.add_email}>{t("add-email")}</button>}
                        <div className={classes.email}>
                            {addEmail ? <input className={`${classes.input} ${classes.email_input}`} type="email" ref={emailRef} /> : <Data name="gamilas320@gmail.com" />}
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.box}>
                <p className={classes.title}>{t("Academic-Information")}</p>
                <div className={classes.row}>
                    <Data label={t("Faculty")} name="Computer Science " />
                    <Data label={t("Student-ID")} name="5555555" />
                </div>
                <div className={classes.row}>
                    <Data label={t("level")} name="Senior" />
                    <Data label={t("department")} name="Computer Science"/>
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
    )
}