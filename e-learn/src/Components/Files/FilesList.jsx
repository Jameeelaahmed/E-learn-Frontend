import FileButton from './FileButton';
import classes from './FilesList.module.css'
import * as FaIcons from 'react-icons/fa6';
export default function FilesList({ files, onDelete }) {
    const openFileInBrowser = (file) => {
        const fileUrl = URL.createObjectURL(file);
        window.open(fileUrl, '_blank');
    };
    return (
        <>
            {files.length > 0 && <ul className={classes.files_list}>
                {files.map((file, index) => (
                    <li key={index} className={classes.file}>
                        <button onClick={() => openFileInBrowser(file)} className={classes.button}>{file.name}</button>
                        {/* <FileButton onSelect={()=> openFileInBrowser(file)}></FileButton> */}
                        <FaIcons.FaXmark className={classes.delete} onClick={() => onDelete(index)}></FaIcons.FaXmark>
                    </li>
                ))}
            </ul>
            }
        </>
    )
}