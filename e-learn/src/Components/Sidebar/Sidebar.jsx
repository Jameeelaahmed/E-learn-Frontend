import classes from './Sidebar.module.css'
import pro from '../../assets/avatar.jpg'
import { useState } from 'react'
import * as FaIcons from "react-icons/fa6";
// import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
export default function Sidebar() {
    //* LANG 
    const { t } = useTranslation();
    //* LANG 

    // * START CLOSESIDEBAR
    const [isOpen, setIsOpen] = useState(false);
    function handleClose() {
        setIsOpen((close) => !close);
    }
    // * END CLOSESIDEBAR

    function getRole() {
        return localStorage.getItem('role');
    }

    const role = getRole();

    const sidebarData = [
        {
            title: t('Main'),
            icon: <FaIcons.FaHouse className={classes.icon} />,
            link: role === 'Staff' ? '/InsMain' : '/stuMain'
        },
        {
            title: t('Groups'),
            icon: <FaIcons.FaBook className={classes.icon} />,
            link: 'groups'
        },
        {
            title: t('Survey'),
            icon: <FaIcons.FaSquarePollVertical className={classes.icon} />,
            link: '/voting'
        },
        {
            title: t('Voting'),
            icon: <FaIcons.FaSquarePollVertical className={classes.icon} />,
            link: '/survey'
        },
        {
            title: t('Announcements'),
            icon: <FaIcons.FaBullhorn className={classes.icon} />,
            link: '/announcements'
        },
        {
            title: t('Community'),
            icon: <FaIcons.FaUsers className={classes.icon} />,
            link: '/community'
        }
    ];

    // * START ACTIVE
    const [active, setActive] = useState("")
    function handleActive(selectedButton) {
        setActive(selectedButton);
    }
    // * START ACTIVE
    return (
        <div
            className={`${isOpen ? classes.sidebar : classes.sidebar_active}`}
        >
            <FaIcons.FaArrowLeftLong
                className={classes.icon}
                onClick={handleClose} />
            <Link
                to='/profile'
                className={classes.profile}>
                <img src={pro} alt=""></img>
                <p>Jameela Ahmed</p>
            </Link>
            <ul>
                {sidebarData.map((item) => (
                    <Link to={item.link} key={item.title} className={`${classes.link} ${(active === item.title) ? classes.active : undefined}`} onClick={() => handleActive(item.title)}>
                        <li>
                            {item.icon}
                            <span>{item.title}</span>
                        </li>
                    </Link>))
                }
            </ul>
        </div>
    )
}