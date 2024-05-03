import { useRef } from 'react';
import classes from './FileUpload.module.css';
import * as FaIcons from 'react-icons/fa6';

const FileUpload = ({ files, setFiles, removeFile }) => {
    const fileInputRef = useRef(null);

    const uploadHandler = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setFiles([...files, file]);
        openFileInBrowser(file);
    };

    const openFileInBrowser = (file) => {
        const reader = new FileReader();
      
        reader.onload = () => {
          if (file.type.startsWith('image/')) {
            const img = new Image();
            img.src = reader.result;
            document.body.appendChild(img);
          } else {
            const a = document.createElement('a');
            a.href = reader.result;
            a.download = file.name;
            a.textContent = 'Download ' + file.name;
            document.body.appendChild(a);
          }
        };
      
        reader.readAsDataURL(file);
      };
      

    return (
        <div className={classes.file_card}>
            <div className={classes.file_inputs}>
                <input type="file" onChange={uploadHandler} ref={fileInputRef} />
                <button onClick={() => fileInputRef.current.click()}>
                    <i>
                        <FaIcons.FaPlus />
                    </i>
                    Upload
                </button>
            </div>
            <p className={classes.main}>Supported files</p>
            <p className={classes.info}>PDF, JPG, PNG</p>
        </div>
    );
};

export default FileUpload;
