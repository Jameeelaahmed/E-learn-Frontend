import classes from './authentication.module.css'
import FormContainer from './FormContainer'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import { httpRequest } from '../../HTTP';
import { useNavigate } from 'react-router-dom';
export default function ForgetPassword() {
    const {t}=useTranslation();
    const email = useRef();
    const [isEdit, setIsEdit] = useState(false)
    const [isResponseOk, setIsResponseOk] = useState(false);
    const navigate = useNavigate();
    const emailIsInValid = isEdit && !email.current.value.includes('@');

    async function handleSubmit(event) {
        event.preventDefault();
        const Email = email.current.value;
    
        if (!Email) {
            console.error('Email is required');
            return;
        }
        
        try{
            const response = await httpRequest('POST','https://elearnapi.runasp.net/api/Account/Forgot-Password',null,null,Email);
            if(response.statusCode===200){
                console.log(response);
                navigate('/otp', {state: {Email}});
            }else{
                console.log('an error occurred', response);
            }
        }
        catch(error){
            console.log('An error occurred:',error);
        }
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
                        <div className={classes.action}>
                            <Button text={t("ارسل الرمز السري")} id="submit" />
                        </div>
                </form>
            </FormContainer>
        </div>
    )
}