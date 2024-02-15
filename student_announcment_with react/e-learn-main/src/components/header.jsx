import { lang } from "../base/lang";


function Header(){
    const switchLang = () =>{
        let lang = localStorage.getItem("lang");
        if(lang == "en"){
            localStorage.setItem("lang", 'ar');
        }else{
            localStorage.setItem("lang", 'en');
        }
        window.location.reload();
    }
    return(
    <header>
        <div className="current-page">
            <p>{lang("Announcements")}</p>
        </div>
        <div className="icons">
            <a onClick={switchLang}>
                <i>
                    {lang("lang")}
                </i>
            </a>
            <a href="messages.html">
                <i className="fa-solid fa-message"></i>
            </a>
            <a href="announcements.html">
                <i className="fa-solid fa-bell"></i>
            </a>
            <a href="">
                <i className="fa-solid fa-right-from-bracket"></i>
            </a>
        </div>
    </header>
    )
}

export default Header;