import classes from './FilesList.module.css'
import * as FaIcons from 'react-icons/fa6';
export default function FilesList({ files ,onDelete}) {
    return (
        <>
            {files.length > 0 && <ul className={classes.files_list}>
                {files.map((file, index) => (
                    <li key={index} className={classes.file}>
                        <button onClick={() => openFileInBrowser(file)} className={classes.button}>{file.name}</button>
                        <FaIcons.FaXmark onClick={() => onDelete(index)}></FaIcons.FaXmark>
                    </li>
                ))}
            </ul>
            }
        </>
    )
}