import avatar from '../assets/images/avatar.jpg';
function RightSidebar(){
    return(
        <div className="right-sidebar">
        <p className="title">Computer Theory</p>
        <div className="instructor-profile">
            <img src={avatar} alt="" />
            <p>Dr Nagwa</p>
        </div>
        <div className="section">
            <a href="material.html">Material</a>
            <a href="assignment.html">Assignment</a>
            <a href="quiz.html">Quiz</a>
            <a href="participants.html">Participants</a>
        </div>
    </div>
    )
}

export default RightSidebar;