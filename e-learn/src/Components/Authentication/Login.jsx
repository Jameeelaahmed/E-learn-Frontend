import { useRef, useState } from 'react';
import classes from './authentication.module.css';
import FormContainer from './FormContainer';
import { useTranslation } from 'react-i18next';
import { httpRequest } from '../../HTTP';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import '../../App.css';
export default function Login() {
    const { t } = useTranslation();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true); // Set loading state to true
        setError(null); // Reset error state

        const username = email.current.value;
        const userPassword = password.current.value;

        if (!username || !userPassword) {
            console.error('Username and password are required');
            setIsLoading(false); // Reset loading state
            return;
        }

        const requestBody = {
            UserName: username,
            Password: userPassword
        };

        try {
            const response = await httpRequest('POST', 'https://elearnapi.runasp.net/api/Account/LogIn', null, requestBody);
            if (response.statusCode === 200) {
                // Successful login
                console.log('Login successful');
                console.log(response);
                const token = response.data.token;
                const role = response.data.role;
                const userName = response.data.userName;
                const fullName = response.data.fullName;
                const profilePicture = response.data.profilePictureName;

                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                localStorage.setItem('userName', userName);
                localStorage.setItem('fullName', fullName);
                localStorage.setItem('profilePicture', profilePicture);

                if (role === 'Student') {
                    navigate('/stuMain');
                    return redirect("/stuMain")
                } else if (role === 'Staff') {
                    return redirect("/InsMain")
                } else if (role === "Admin") {
                    return redirect("/users")
                }

            } else {
                // Unsuccessful login
                console.log(response);
                console.log(requestBody);
                setError('حدث خطأ اثناء عملية تسجيل الدخول, برجاء المحاولة مرة أخرى');
            }
        } catch (error) {
            // Handle any errors here
            console.log('An error occurred:', error);
            setError('حدث خطأ اثناء عملية تسجيل الدخول, برجاء المحاولة مرة أخرى');
        } finally {
            setIsLoading(false); // Reset loading state
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
                    {error && <p className='error'>{error}</p>}
                    <input
                        type="submit"
                        value={isLoading ? 'جاري التحميل...' : 'تسجيل دخول'}
                        className={classes.input}
                        disabled={isLoading}
                    />
                    <div className={classes.forget}>
                        <p>هل نسيت كلمة المرور؟</p>
                        <Link to="forgetpassword">نسيت كلمة المرور</Link>
                    </div>
                </form>
            </FormContainer>
        </div>
    );
}