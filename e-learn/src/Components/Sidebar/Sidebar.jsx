import classes from './Sidebar.module.css';
import pro from '../../assets/avatar.jpg';
import { useState } from 'react';
import * as FaIcons from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { getFullName } from '../../Helpers/AuthHelper';
import logoimg from '../../assets/Untitled-65.png'
import logoimg2 from '../../assets/Untitled-4.png'
export default function Sidebar({ isOpened }) {
    //* LANG 
    const { t } = useTranslation();
    //* LANG 

    // * START CLOSESIDEBAR
    const [isOpen, setIsOpen] = useState(false);
    function handleClose() {
        setIsOpen((prev) => {
            const newState = !prev;
            isOpened(newState);
            return newState;
        });
    }
    // * END CLOSESIDEBAR

    function getRole() {
        return localStorage.getItem('role');
    }

    const role = getRole();
    const name = getFullName();
    const sidebarData = [
        {
            title: t('Main'),
            icon: <FaIcons.FaHouse className={classes.icon} />,
            link: role === 'Staff' ? '/InsMain' : '/stuMain',
            roles: ['Staff', 'Student'] // This item is visible to all roles
        },
        {
            title: t('Users'),
            icon: <FaIcons.FaUser className={classes.icon} />,
            link: '/users',
            roles: ['Admin'] // This item is visible to Admin
        },
        {
            title: t('Groups'),
            icon: <FaIcons.FaBook className={classes.icon} />,
            link: '/groups',
            roles: ['Staff', 'Student'] // This item is visible to Staff and Student
        },
        {
            title: t('Groups'),
            icon: <FaIcons.FaBook className={classes.icon} />,
            link: 'admingroups',
            roles: ['Admin']
        },
        {
            title: t('Voting'),
            icon: <FaIcons.FaSquarePollVertical className={classes.icon} />,
            link: '/voting',
            roles: ['Staff', 'Student'] // This item is visible to Staff and Student
        },
        {
            title: t('Survey'),
            icon: <FaIcons.FaClipboard className={classes.icon} />,
            link: '/survey',
            roles: ['Staff', 'Student'] // This item is visible to Staff and Student
        },
        {
            title: t('Announcements'),
            icon: <FaIcons.FaBullhorn className={classes.icon} />,
            link: '/announcements',
            roles: ['Staff', 'Student'] // This item is visible to Staff and Student
        },
        {
            title: t('Community'),
            icon: <FaIcons.FaUsers className={classes.icon} />,
            link: '/community',
            roles: ['Student', 'Admin'] // This item is visible only to Students and Admins
        }
    ];

    // * START ACTIVE
    const location = useLocation();
    const currentPath = location.pathname;

    const profilePictureName = localStorage.getItem('profilePicture');
    var profilePicture = `https://elearnapi.runasp.net/api/files/ViewFile/ProfilePictures/${profilePictureName}`;
    if (profilePictureName === 'null')
        profilePicture = pro;
    // * END ACTIVE

    return (
        <div className={`${classes.sidebar_container} ${isOpen ? "" : classes.sidebar_container_active}`}>
            <div className={classes.logo_img}>
                {isOpen ?
                    <img
                        className={classes.logo}
                        src={logoimg}
                        alt="Regular Logo"
                    /> : <img
                        className={classes.logo_responsive}
                        src={logoimg2}
                        alt="Responsive Logo"
                    />
                }
            </div>
            <div className={`${isOpen ? classes.sidebar : classes.sidebar_active}`}>
                <FaIcons.FaArrowLeftLong
                    className={classes.icon}
                    onClick={handleClose} />
                <NavLink
                    to='profile'
                    className={classes.profile}>
                    <img src={profilePicture} alt="Profile Picture"></img>
                    <p>{name}</p>
                </NavLink>
                <ul>
                    {sidebarData
                        .filter(item => item.roles.includes(role))
                        .map(item => (
                            <NavLink
                                to={item.link}
                                key={item.title}
                                className={({ isActive }) => `${classes.link} ${isActive ? classes.active : ''}`}
                                exact
                            >
                                <li>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </li>
                            </NavLink>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}
