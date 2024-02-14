import "../assets/css/style.css";
import "../assets/css/responsive.css";

import avatar from "../assets/images/avatar.jpg";
import { lang } from '../base/lang';
import { useEffect, useState } from "react";

function Sidebar () {
  const [isOpen, setIsOpen] = useState(false);
  const [sideWidth, setsideWidth] = useState(300);
  useEffect(()=>{
    if (window.innerWidth > 768) {
      setIsOpen(true);
      setsideWidth(300);
    }
    
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
        setsideWidth(300);
      }else{
        setIsOpen(false);
        setsideWidth(62)
      }
    })
  },[])
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setsideWidth(62)

  };
  return (
    <div className={`sidebar${lang("lang") == "Ar" ? "Ar" : ""} ${isOpen ? "w-[300px]":"w-[62px]"}`}>
      <div className="arrow" style={{ display:"none" }} onClick={toggleSidebar}>
          <i className="fa-solid fa-arrow-left mx-[10px] mt-[30px]"></i>
      </div>
      <a href="#profile" className="profile">
        <img src={avatar} alt />
        <p>Jameela Ahmed</p>
      </a>
      <ul>
        <li>
          <a href="#">
            <i class="fa-solid fa-house"></i>
            <span className={!isOpen ? `hidden` : ``}>{ lang("main") }</span>
          </a>
        </li>
        <li>
          <a className="active" href="#">
            <i class="fa-solid fa-chalkboard-user"></i>
            <span className={!isOpen ? `hidden` : ``}>{ lang("classes") }</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa-solid fa-square-poll-vertical"></i>
            <span className={!isOpen ? `hidden` : ``}>{ lang("survey") }</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa-solid fa-check-to-slot"></i>
            <span className={!isOpen ? `hidden` : ``}>{ lang("voting") }</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa-solid fa-bullhorn" />
            <span className={!isOpen ? `hidden` : ``}>{ lang("announcements") }</span>
          </a>
        </li>
        {/* <li>
          <a href="chat.html">
            <i class="fa-solid fa-bullhorn"></i>
            <span>Chat</span>
          </a>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
