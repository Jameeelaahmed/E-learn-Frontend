import { useRef } from 'react';
import classes from './authentication.module.css';
import FormContainer from './FormContainer';
import { useTranslation } from 'react-i18next';
import { httpRequest } from '../../HTTP';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const { t } = useTranslation();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();
        
        const username = email.current.value;
        const userPassword = password.current.value;
        
        if (!username || !userPassword) {
            console.error('Username and password are required');
            return;
        }

        const requestBody = {
            UserName: username, // Use the username from the form
            Password: userPassword // Use the password from the form
        };
    
        try {
            const response = await httpRequest('POST', 'https://elearnapi.runasp.net/api/Account/LogIn', null, requestBody);
            if (response.statusCode === 200) {
                //successful login
                console.log('Login successful');
                const token = response.data.token;
                const role = response.data.roles;
                const userName = response.data.userName;
                const email = response.data.email;
                const refreshTokenExpiration = response.data.refreshTokenExpiration;
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                localStorage.setItem('userName', userName);
                localStorage.setItem('email', email);
                localStorage.setItem('refreshTokenExpiration', refreshTokenExpiration);
                // Redirect to the home page
                navigate('/');
            } else {
                //unsuccessful login
                console.log(response);
                console.log(requestBody);
            }
        } catch (error) {
            // Handle any errors here
            console.log('An error occurred:', error);
        }
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
                        <Link to="/forgetpassword">نسيت كلمة المرور</Link>
                    </div>
                </form>
            </FormContainer>
        </div>
    );
}
