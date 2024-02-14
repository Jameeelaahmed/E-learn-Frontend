import React from 'react';
import  per_img from '../assets/images/avatar.jpg';
const Announcements = () => {
  return ( 
    <div className='content-side'>
      <div className="container">
        <div className="boxes">
          <div className="box">
            <div className="avatar">
              <img style={{ width:"100px", height:"100px" }} src={per_img} alt="person_img" />
            </div>
            <div className='msg'>
              <p><b>Mad Jack</b> added you to the board <a>The trasure of the three witches</a> </p>
            </div>
            <div className='date'>
              <span>9:00 am</span>
            </div>
          </div>
          <div className="box">
            <div className="avatar">
              <img style={{ width:"100px", height:"100px" }} src={per_img} alt="person_img" />
            </div>
            <div className='msg'>
              <p><b>Snuck</b> commented on <a>Adventures on the high sees</a>
              "Can't wait to go on this adventure with you, captain. It's an honor and a privilege to serve as your first mate"</p>
            </div>
            <div className='date'>
              <span>9:00 am</span>
            </div>
          </div>

          <div className="box">
            <div className="avatar">
              <img style={{ width:"100px", height:"100px" }} src={per_img} alt="person_img" />
            </div>
            <div className='msg'>
              <p>
                Angus Dagnabbit moved <a>Prate's treasure</a> from  progress  to <a>Dome</a>
              </p>
            </div>
            <div className='date'>
              <span>9:00 am</span>
            </div>
          </div>

          <div className="box">
            <div className="avatar">
              <img style={{ width:"100px", height:"100px" }} src={per_img} alt="person_img" />
            </div>
            <div className='msg'>
              <p>
                  Flash Dashing uploaded 4 new screenshots to the board <a>Steal Mad Jack's trasure again</a>
              </p>
            </div>
            <div className='date'>
              <span>9:00 am</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Announcements;