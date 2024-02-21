import classes from './Sidebar.module.css'
import { sidbarData } from '../../sidebarData'
import pro from '../../assets/avatar.jpg'
import { useState } from 'react'
import * as FaIcons from "react-icons/fa6";

export default function Sidebar({opened,onClose}){
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
                {sidbarData.map((item)=>(
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