import { useRef } from 'react';
import classes from './authentication.module.css';
import FormContainer from './FormContainer';
import { useTranslation } from 'react-i18next'

export default function Login() {
    const {t}=useTranslation();
    const email=useRef();
    const password=useRef();

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className={classes.authentication}>
            <img src="../../assets/undraw_login_re_4vu2.svg" alt="" />
            <FormContainer h1Value="تسجيل دخول">
                <form onSubmit={handleSubmit}>
                    <div className={classes.user_name}>
                        <label htmlFor="user-name">اسم المستخدم</label>
                        <input
                            id="user-name"
                            className={classes.input}
                            type="number"
                            ref={email}
                        />
                    </div>
                    <div className={classes.password}>
                        <label htmlFor="password">كلمة المرور</label>
                        <input
                            id="password"
                            className={classes.input}
                            type="password"
                            ref={password}
                        />
                    </div>
                    <input type="submit" value="تسجيل دخول" />
                    <div className={classes.forget}>
                        <p>هل نسيت كلمة المرور؟</p>
                        <a href="">نسيت كلمة المرور</a>
                    </div>
                </form>
            </FormContainer>
        </div>
    );
}
