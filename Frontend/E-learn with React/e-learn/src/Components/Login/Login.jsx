import { useState } from 'react';
import classes from './Login.module.css';

export default function Login() {
    function handleSubmit(event) {
        event.preventDefault();
        // Your login logic can go here
    }

    const [enteredValue, setEnteredValue] = useState({
        userName: '',
        password: ''
    });

    function handleInputChange(identifier, value) {
        setEnteredValue((prevValues) => ({
            ...prevValues,
            [identifier]: value
        }));
    }

    return (
        <>
            <img src="../../assets/undraw_login_re_4vu2.svg" alt="" />
            <div className={classes.square_one}></div>
            <div className={classes.square_two}></div>
            <div className={classes.login}>
                <h1>تسجيل دخول</h1>
                <form onSubmit={handleSubmit}>
                    <div className={classes.user_name}>
                        <label htmlFor="">اسم المستخدم</label>
                        <input
                            type="number"
                            onChange={(event) => handleInputChange('userName', event.target.value)}
                            value={enteredValue.userName}
                        />
                    </div>
                    <div className={classes.password}>
                        <label htmlFor="">كلمة المرور</label>
                        <input
                            type="password"
                            onChange={(event) => handleInputChange('password', event.target.value)}
                            value={enteredValue.password}
                        />
                    </div>
                    <input type="submit" value="Login" />
                    <div className={classes.forget}>
                        <p>هل نسيت كلمة السر؟</p>
                        <a href="">اعادة تعيين كلمة المرور</a>
                    </div>
                </form>
            </div>
        </>
    );
}
