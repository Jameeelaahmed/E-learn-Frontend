import "./App.css";
// import Login from './Components/Login/Login'
// import SemiBody from './Components/SemiBody/SemiBody'
import Sidebar from "./Components/Sidebar/Sidebar";
import PageContent from "./Components/PageContent/PageContent";
import Header from "./Components/Header/Header";
import Page from "./Components/Pagee/Page";
import MainSection from "./Components/MainSection/MainSection";
import { useState } from "react";
import Logo from "./Components/Logo/Logo";
import Classes from "./Components/Classes/Classes";
function App() {
  // * START CLOSESIDEBAR
  const [isOpen, setIsOpen] = useState(false);
  function handleClose() {
    setIsOpen((close) => !close);
  }
  // * END CLOSESIDEBAR
  return (
    <>
      <Logo opened={isOpen}></Logo>
      <Page>
        <Sidebar opened={isOpen} onClose={handleClose}></Sidebar>
        <PageContent>
          <Header></Header>
          <Classes></Classes>
          {/* <MainSection></MainSection> */}
        </PageContent>
      </Page>
    </>
  );
}

export default App;
