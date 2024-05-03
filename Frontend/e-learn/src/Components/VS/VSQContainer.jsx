import QuestionView from "./QuestionView"
import VSNavBar from "./vsNavBar"
import { useState } from "react"
export default function VSQContainer(){
    const [VSQData,setVSQData]=useState([])
    function collectData(data) {
        setVSQData(prevData => [...prevData, data]);
    }
    return(
    <>
    <VSNavBar VSQData={collectData}></VSNavBar>
    <QuestionView questionData={VSQData}></QuestionView>
    </>
    )
}