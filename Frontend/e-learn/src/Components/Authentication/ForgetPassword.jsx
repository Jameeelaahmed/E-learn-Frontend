import classes from './authentication.module.css'
import FormContainer from './FormContainer'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
export default function ForgetPassword() {
    const {t}=useTranslation();
    const email = useRef();
    const [isEdit, setIsEdit] = useState(false)

    const emailIsInValid = isEdit && !email.current.value.includes('@');

    function handleSubmit(event) {
        event.preventDefault();
        email.current.value;
    }

    function handleEmailBlur() {
        setIsEdit(true)
    }

    function handleChange() {
        setIsEdit(false)
    }
    return (
        <div className={classes.authentication}>
            <FormContainer h1Value="هل تواجه مشكلة في تسجيل الدخول؟">
                <form onSubmit={handleSubmit}>
                    <div className={classes.forget_password}>
                        <label htmlFor="">البريد الاكتروني</label>
                        <input
                            type="email"
                            ref={email}
                            onChange={handleChange}
                            onBlur={handleEmailBlur}
                        />
                    </div>
                    {emailIsInValid && <p className={classes.control_error}>enter valid email</p>}
                    <Link to="/otp">
                        <div className={classes.action}>
                            <Button text={t("ارسل الرمز السري")} id="submit" />
                        </div>
                    </Link>
                </form>
            </FormContainer>
        </div>
    )
}