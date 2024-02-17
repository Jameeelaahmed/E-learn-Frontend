import { useState } from 'react';
import './Login.css';

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
            <div className="square-one"></div>
            <div className="square-two"></div>
            <div className="login">
                <h1>تسجيل دخول</h1>
                <form onSubmit={handleSubmit}>
                    <div className="user-name">
                        <label htmlFor="">اسم المستخدم</label>
                        <input
                            type="number"
                            onChange={(event) => handleInputChange('userName', event.target.value)}
                            value={enteredValue.userName}
                        />
                    </div>
                    <div className="password">
                        <label htmlFor="">كلمة المرور</label>
                        <input
                            type="password"
                            onChange={(event) => handleInputChange('password', event.target.value)}
                            value={enteredValue.password}
                        />
                    </div>
                    <input type="submit" value="Login" />
                    <div className="forget">
                        <p>هل نسيت كلمة السر؟</p>
                        <a href="">اعادة تعيين كلمة المرور</a>
                    </div>
                </form>
            </div>
        </>
    );
}
