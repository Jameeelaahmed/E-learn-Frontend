import { createContext } from "react";

export const QuestionContext=createContext({
    title:"",
    groups:[],
    startDate:"",
    endDate:"",
    questions:[
        {
            questionTitle:"",
            questionOptions:[]
        }
    ]
},
);