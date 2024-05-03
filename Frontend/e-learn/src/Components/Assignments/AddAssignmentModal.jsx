import { useRef, forwardRef, useImperativeHandle, useState, useCallback ,useEffect} from "react"
import classes from './AddAssignmentModal.module.css'
import FileUpload from "../File/FileUpload";
import FileList from "../File/FileList";
import InputSelect from "./InputSelect";
import { useTranslation } from "react-i18next";
import { log } from "../../log";
const AddAssignmentModal = forwardRef(function AddAssignmentModal(_, ref) {
    log("<AddAssignmentModal>")
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [formSubmitted,setFormSubmited]=useState(false)
    const [assignmentData, setassignmentData] = useState([{
        title: "",
        grade: "",
        startTime: "",
        endTime: "",
        startDate: "",
        endDate: "",
        description: "",
        files: [],
    }])

    function handlePoints(e) {
        e.preventDefault();
        setIsEditing((editing) => !editing);
    }

    let wrapperType = "select";
    if (isEditing) {
        wrapperType = "input";
    }

    const addAssignmentDialog = useRef();
    useImperativeHandle(ref, () => ({
        open: () => {
            addAssignmentDialog.current.showModal();
        },
        close: () => {
            addAssignmentDialog.current.close();
        }
    }));

    const [files, setFiles] = useState([])

    const removeFile = (filename) => {
        setFiles(files.filter(file => file.name !== filename))
    }

    const handleSubmit = useCallback(e => {
        const fd = new FormData(e.target);
        const assignmentData = Object.fromEntries(fd.entries());
        setassignmentData(prevData => ({
            ...prevData,
            title: assignmentData.title,
            grade: assignmentData.grade,
            endTime: assignmentData.endTime,
            endDate: assignmentData.endDate,
            description: assignmentData.description,
            files:files
        }));
        setFormSubmited(true)
        // Clear form inputs and files
        e.target.reset();
    }, []);

    useEffect(()=>{
        if(formSubmitted){
            console.log(assignmentData)
            setFormSubmited(false)
        }
    },[formSubmitted])

    return (
        <dialog ref={addAssignmentDialog} className={classes.modal} onSubmit={handleSubmit}>
            <form method="dialog" className={classes.form}>
                <div className={classes.input_container}>
                    <label htmlFor="title">{t("title")}</label>
                    <input type="text" id="title" dir='auto' name="title" />
                </div>
                <div className={classes.grade}>
                    <InputSelect
                        name="grade"
                        classs="player-name"
                        wrapper={wrapperType}>
                    </InputSelect>
                    <button onClick={handlePoints} className={classes.button}>add points</button>
                </div>
                <div className={classes.row}>
                    <div className={classes.input_container}>
                        <label htmlFor="time">{t("end-time")}</label>
                        <input type="time" id="time" dir='auto' name="endTime" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="date">{t("end-date")}</label>
                        <input type="date" dir='auto' name="endDate" />
                    </div>
                </div>
                <div className={classes.description}>
                    <label htmlFor="description">{t('description')}</label>
                    <textarea id="description" name="description"></textarea>
                </div>
                <FileUpload files={files} setFiles={setFiles}
                    removeFile={removeFile} name="files" />
                <FileList files={files} removeFile={removeFile} />
                <button type="submit" className={classes.button}>{t("Create")}</button>
            </form>
        </dialog>
    )
})

export default AddAssignmentModal