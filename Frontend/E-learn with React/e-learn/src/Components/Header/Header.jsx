import classes from './Header.module.css'
// import * as FaIcons from "react-icons/fa6";

export default function Header(){
    return(
        <header>
        <div className={classes.current_page}>
            <p>Classes</p>
        </div>
        <div className={classes.icons}>
            <a href="">
                {/* <FaIcons.FaMessage className={classes.icon}/> */}
                <i className={`${"fa-solid fa-message"} ${classes.icon}`}></i>
            </a>
            <a href="">
            <i className={`${"fa-solid fa-bell"} ${classes.icon}`}></i>
                {/* <FaIcons.FaBell className={classes.icon}/> */}
            </a>
            <a href="">
            <i className={`${"fa-solid fa-right-from-bracket"} ${classes.icon}`}></i>
                {/* <FaIcons.FaRightFromBracket className={classes.icon}/> */}
            </a>
        </div>
        </header>
        )
}