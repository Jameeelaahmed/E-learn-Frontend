import Page from "../Components/Pagee/Page"
import Sidebar from "../Components/Sidebar/Sidebar"
import PageContent from "../Components/PageContent/PageContent"
import Header from "../Components/Header/Header"
import MainSection from "../Components/MainSection/MainSection"
import AppBar from "../Components/AppBar/AppBar"
import { Outlet } from "react-router-dom"
import { useState } from "react"
export default function RootLayout() {

    const [isSidebarOpened, setIsSidebarOpened] = useState(false);
    function handleOpenSidebar(opened) {
        setIsSidebarOpened(opened)
    }
    return (
        <Page>
            <Sidebar isOpened={handleOpenSidebar}></Sidebar>
            <PageContent>
                <Header opened={isSidebarOpened}></Header>
                <MainSection>
                    <Outlet></Outlet>
                </MainSection>
            </PageContent>
            <AppBar></AppBar>
        </Page>
    )
}