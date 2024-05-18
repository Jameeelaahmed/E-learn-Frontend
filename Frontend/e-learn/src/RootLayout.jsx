import Page from "./Components/Pagee/Page"
import Sidebar from "./Components/Sidebar/Sidebar"
import PageContent from "./Components/PageContent/PageContent"
import Header from "./Components/Header/Header"
import MainSection from "./Components/MainSection/MainSection"
import AppBar from "./Components/AppBar/AppBar"
import { Outlet } from "react-router-dom"
export default function RootLayout() {
    return (
        <Page>
            <Sidebar></Sidebar>
            <PageContent>
                <Header></Header>
                <MainSection>
                    <Outlet></Outlet>
                </MainSection>
            </PageContent>
            <AppBar></AppBar>
        </Page>
    )
}