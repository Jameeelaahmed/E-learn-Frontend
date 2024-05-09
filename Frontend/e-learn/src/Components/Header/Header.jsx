import classes from './Header.module.css';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import Logo from '../Logo/Logo';

export default function Header({ opened }) {
    const { i18n } = useTranslation();

    // const handleLanguageChange = (lang) => {
    //     i18n.changeLanguage(lang);
    //     document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // };

    const handleLanguageChange = (lang) => {
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        i18n.changeLanguage(lang);
    };


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
                    <a href="">
                        <i className={`${"fa-solid fa-message"} ${classes.icon}`}></i>
                    </a>
                    <a href="">
                        <i className={`${"fa-solid fa-bell"} ${classes.icon}`}></i>
                    </a>
                    <a href="">
                        <i className={`${"fa-solid fa-right-from-bracket"} ${classes.icon}`}></i>
                    </a>
                </div>
            </header>
        </div>
    );
}
