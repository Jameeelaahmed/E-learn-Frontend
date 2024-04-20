import classes from './Sidebar.module.css'
import pro from '../../assets/avatar.jpg'
import { useState } from 'react'
import * as FaIcons from "react-icons/fa6";
// import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// eslint-disable-next-line react/prop-types
export default function Sidebar({opened,onClose}){
    //* LANG 
    const { t} = useTranslation();
    //* LANG 

    const sidebarData = [
        {
            title: t('Main'),
            icon: <FaIcons.FaHouse className={classes.icon} />,
            // link:'./home'
        },
        {
            title: t('Groups'),
            icon: <FaIcons.FaBook className={classes.icon} />,
            // link:'./home'
        },
        {
            title: t('Survey'),
            icon: <FaIcons.FaSquarePollVertical className={classes.icon} />,
            // link:'./home'
        },
        {
            title: t('Voting'),
            icon: <FaIcons.FaSquarePollVertical className={classes.icon} />,
            // link:'./home'
        },
        {
            title: t('Announcements'),
            icon: <FaIcons.FaBullhorn className={classes.icon} />,
            // link:'./home'
        },
        {
            title: t('Community'),
            icon: <FaIcons.FaUsers className={classes.icon} />,
            // link:'./home'
        }
    ];

    // * START ACTIVE
    const [active,setActive]=useState("")
    function handleActive(selectedButton){
        setActive(selectedButton);
    }
      // * START ACTIVE
    return(
        <div 
        className={ `${opened ?classes.sidebar:classes.sidebar_active  }` }
        >
            <FaIcons.FaArrowLeftLong 
            className={classes.icon}
            onClick={onClose}/>
            <a 
            href="#profile" 
            className={classes.profile}>
                <img src={pro} alt=""></img>
                <p>Jameela Ahmed</p>
            </a>
            <ul>
                {sidebarData.map((item)=>(
                <li 
                className={(active===item.title)? 
                classes.active:undefined} 
                onClick={()=>handleActive(item.title)} 
                key={item.title}
                >
                    <a 
                    href="">
                        {item.icon}
                        <span>{item.title}</span>
                    </a>
                </li>))
                }
            </ul>
        </div>
    )
}