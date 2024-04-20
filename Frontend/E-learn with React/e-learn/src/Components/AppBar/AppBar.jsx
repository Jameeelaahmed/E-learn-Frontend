import  classes from "./AppBar.module.css";
import * as FaIcons from "react-icons/fa6";

export default function AppBar() {
    return (
    <ul className={classes.app_bar}>
        <li>
            <FaIcons.FaHouse className={classes.icon} />
        </li>
        <li>
            <FaIcons.FaBook className={classes.icon} />
        </li>
        <li>
            <FaIcons.FaSquarePollVertical className={classes.icon} />
        </li>
        <li>
            <FaIcons.FaSquarePollVertical className={classes.icon} />
        </li>
        <li>
            <FaIcons.FaBullhorn className={classes.icon} />
        </li>
        <li>
            <FaIcons.FaUsers className={classes.icon} />
        </li>
        <li>
            <FaIcons.FaUser className={classes.icon} />
        </li>
    </ul>
);
}
