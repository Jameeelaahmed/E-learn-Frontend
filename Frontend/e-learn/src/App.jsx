import "./App.css";
import Login from './Components/Authentication/Login'
import ForgetPassword from "./Components/Authentication/ForgetPassword";
import SetNewPassword from "./Components/Authentication/setNewPassword";
import SemiBody from './Components/SemiBodyLogin/SemiBody'
import Sidebar from "./Components/Sidebar/Sidebar";
import PageContent from "./Components/PageContent/PageContent";
import Header from "./Components/Header/Header";
import Page from "./Components/Pagee/Page";
import MainSection from "./Components/MainSection/MainSection";
import { useState } from "react";
import Logo from "./Components/Logo/Logo";
import Classes from "./Components/Classes/Classes";
import Weeks from "./Components/Weeks/Weeks";
import Class from "./Components/Class/class";
import Assignments from "./Components/Assignments/Assignments";
import GroupNavCard from "./Components/group-navigation-card/GroupNavCard";
import GroupNavCardRespo from "./Components/group-nav-card-responsive/GroupNavCardRespo";
import AppBar from "./Components/AppBar/AppBar";
import { QuestionContext } from "./Context/Question-view-context";
import AddAssignment from "./Components/Assignments/Add-Assignment";
import VSQContainer from "./Components/VS/VSQContainer";
import Profile from "./Components/Profile/Profile";
import ResponsesList from "./Components/VS/ResponsesList";
import FileBrowser from "./Components/test";
// import AssignmentDetails from "./Components/Assignments/AssignmnetDetails";
import Card from "./Components/InsMain/Card";
import * as FaIcons from "react-icons/fa6"
import InsMain from "./Components/InsMain/InsMain";
import GroupsSlider from "./Components/StuMain/GroupsSlider";
import StuMain from "./Components/StuMain/StuMain";
function App() {
  // * START CLOSESIDEBAR
  const [isOpen, setIsOpen] = useState(false);
  function handleClose() {
    setIsOpen((close) => !close);
  }
  // * END CLOSESIDEBAR

  
  return (
    <>
       <SemiBody>
      <Login></Login>
      {/* <ForgetPassword></ForgetPassword> */}
      {/* <SetNewPassword></SetNewPassword> */}
      </SemiBody>

      {/* <Logo opened={isOpen}></Logo> */}
      {/* <Page> */}
        {/* <Sidebar opened={isOpen} onClose={handleClose}></Sidebar> */}
        {/* <PageContent> */}
          {/* <Header></Header> */}
          {/* <MainSection> */}
            {/* <Profile></Profile> */}
            {/* <FileBrowser></FileBrowser> */}
            {/* <VSQContainer></VSQContainer> */}
            {/* <Assignments/> */}
            {/* <GroupNavCardRespo></GroupNavCardRespo> */}
            {/* <AssignmentDetails></AssignmentDetails> */}
            {/* <GroupNavCard></GroupNavCard> */}
            {/* <InsMain/> */}
            {/* <StuMain/> */}
            {/* <Assignments/> */}
          {/* </MainSection> */}
        {/* </PageContent> */}
        {/* <AppBar></AppBar> */}
      {/* </Page> */}
    </>
  );
}

export default App;
