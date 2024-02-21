// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'

import classes from './Components/Sidebar/Sidebar.module.css'
import * as FaIcons from "react-icons/fa6";
export const sidbarData=[
    {
        title:"Main",
        icon:<FaIcons.FaHouse className={classes.icon} />,
        // link:'./home'
    },
    {
        title:"Classes",
        icon:<FaIcons.FaBook className={classes.icon}/>,
        // link:'./home'
    },
    {
        title:"Survey",
        icon:<FaIcons.FaSquarePollVertical className={classes.icon}/>,
        // link:'./home'
    },
    {
        title:"Voting",
        icon:<FaIcons.FaSquarePollVertical className={classes.icon}/>,
        // link:'./home'
    },
    {
        title:"Announcements",
        icon:<FaIcons.FaBullhorn className={classes.icon}/>,
        // link:'./home'
    },
    {
        title:"Community",
        icon:<FaIcons.FaUsers className={classes.icon}/>,
        // link:'./home'
    }
]