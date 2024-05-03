import Data from './Data'
import classes from './Profile.module.css'
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next'
export default function Profile() {
    const { t } = useTranslation();
    const get_old_Password = useRef()
    const get_new_Password = useRef()
    const confirmPassword = useRef()
    const [changePassword, setChangePassword] = useState(false)
    const [matchPassword, setMatchPassword] = useState(false)
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
        console.log(get_new_Password.current.value)
        console.log(confirmPassword.current.value)
        setChangePassword(false)
    }

    function handleMatchPassword(){
        if(get_new_Password.current.value !== confirmPassword.current.value){
            setMatchPassword(true)
        }else{
            setMatchPassword(false)
        }
    }
    
    if (changePassword) {
        password = (
            <form>
                <div className={classes.password}>
                    <label htmlFor="password" className={classes.label}>{t("password")}</label>
                    <input id="old-password" type="password" ref={get_old_Password} className={classes.input}/>
                    <input id="new-password" type="password" ref={get_new_Password} onBlur={handleMatchPassword} className={classes.input}/>
                    <input id="confirm-password" type="password" ref={confirmPassword} onBlur={handleMatchPassword} className={classes.input}/>
                    {matchPassword && <p className={classes.warning}>{t("not-match")}</p>}
                </div>
                <button onClick={handleSetNewPassword} type='submit' className={classes.button}>{t("set-password")}</button>
            </form>
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
                    <Data label={t("Email")} name="gamilas320@gmail.com" />
                    <Data label={t("Nationality")} name="Egyptian" />
                </div>
            </div>
            <div className={classes.box}>
                <p className={classes.title}>{t("Academic-Information")}</p>
                <div className={classes.row}>
                    <Data label={t("Faculty")} name="Computer Science " />
                    <Data label={t("Student-ID")} name="5555555" />
                </div>
                <div className={classes.row}>
                    <Data label={t("Grade")} name="Senior" />
                    <div></div>
                </div>
            </div>
            <div className={classes.box}>
                <div className={classes.password_container}>
                    <p className={classes.title}>{t("Security-Information")}</p>
                    <button onClick={handleChangePass} className={classes.edit}>{t("edit")}</button>
                </div>
                <div className={classes.password}>
                    {password}
                </div>
            </div>
        </div>
    )
}