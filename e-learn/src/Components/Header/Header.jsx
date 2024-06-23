import classes from './Header.module.css';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import Logo from '../Logo/Logo';
import { httpRequest } from '../../HTTP';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../Helpers/AuthHelper';
import { Link } from 'react-router-dom';
export default function Header({ opened }) {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    // const handleLanguageChange = (lang) => {
    //     i18n.changeLanguage(lang);
    //     document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // };

    const handleLanguageChange = (lang) => {
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        i18n.changeLanguage(lang);
    };

    async function HandleLogOut() {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('userName');
            localStorage.removeItem('email');
            localStorage.removeItem('fullName');
            localStorage.removeItem('profilePicture');
            console.log('Logout successful');
            navigate('/auth');
        }
        catch (error) {
            console.log('An error occurred:', error);
        }
    }

    return (
        <div className={classes.header_wrapper}>
            <Logo open={opened} />
            <header>
                <div className={classes.current_page}>
                    <p>Classes</p>
                </div>
                <div className={classes.icons}>
                    {i18n.language === 'ar' ? (<button onClick={() => handleLanguageChange('en')}>
                        en
                    </button>) :
                        (<button onClick={() => handleLanguageChange('ar')}>
                            ar
                        </button>)}
                    <Link to="chat">
                        <i className={`${"fa-solid fa-message"} ${classes.icon}`}></i>
                    </Link>
                    <a href="">
                        <i className={`${"fa-solid fa-bell"} ${classes.icon}`}></i>
                    </a>
                    <button onClick={HandleLogOut} className={classes.icon}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                </div>
            </header>
        </div>
    );
}
