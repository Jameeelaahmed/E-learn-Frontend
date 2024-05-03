import classes from './LecSec.module.css'
import * as FaIcons from "react-icons/fa6";
export default function LecSec({ materialType }) {
    return (
        <div className={classes.lec_sec}>
            <p>{materialType}</p>
            <div className={classes.icons}>
                <div className="div">
                    <label htmlFor="fileInput" className={classes.customFileInput}>
                        <FaIcons.FaCirclePlus className={classes.leftIcon} />
                    </label>
                    <input type="file" id="fileInput" className={classes.fileInput} />
                </div>
                <FaIcons.FaCaretDown className={classes.icon} />
            </div>
        </div>
    )
}