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
import AppBar from "./Components/AppBar/AppBar";
import { QuestionContext } from "./Context/Question-view-context";
import AddAssignment from "./Components/Assignments/Add-Assignment";
import VSQContainer from "./Components/VS/VSQContainer";
import Profile from "./Components/Profile/Profile";
import ResponsesList from "./Components/VS/ResponsesList";
import FileBrowser from "./Components/test";
// import AssignmentDetails from "./Components/Assignments/AssignmnetDetails";
import * as FaIcons from "react-icons/fa6"
import GroupsSlider from "./Components/StuMain/GroupsSlider";
import StuMain from "./Components/StuMain/StuMain";
import Voting from "./Components/Voting/Voting";
import Container from "./Components/Announcement-Chat/Container"
import Otp from "./Components/Authentication/Otp";
import RoutesPage from "./Routes/RoutesPage";
function App() {
  return (
    <>
      <RoutesPage></RoutesPage>
      {/* <SemiBody> */}
      {/* <Login></Login> */}
      {/* <ForgetPassword></ForgetPassword> */}
      {/* <SetNewPassword></SetNewPassword> */}
      {/* <Otp/> */}
      {/* </SemiBody> */}

      {/* <Page>
        <Sidebar></Sidebar>
        <PageContent>
          <Header></Header>
          <MainSection> */}
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
            {/* <Voting /> */}
            {/* <Container/> */}
          {/* </MainSection>
        </PageContent>
        <AppBar></AppBar>
      </Page> */}
    </>
  );
}

export default App;
