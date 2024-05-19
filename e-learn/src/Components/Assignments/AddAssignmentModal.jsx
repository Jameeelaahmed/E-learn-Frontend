import { useRef, forwardRef, useImperativeHandle, useState, useCallback, useEffect } from "react"
import classes from './AddAssignmentModal.module.css'
import FileUpload from "../Files/FileUpload";
import { useTranslation } from "react-i18next";
import { log } from "../../log";
import SubmitButton from "../Button/SubmitButton";
const AddAssignmentModal = forwardRef(function AddAssignmentModal(_, ref) {
    log("<AddAssignmentModal>")
    const { t } = useTranslation();
    const [formSubmitted, setFormSubmited] = useState(false)
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

    const addAssignmentDialog = useRef();
    useImperativeHandle(ref, () => ({
        open: () => {
            addAssignmentDialog.current.showModal();
        },
        close: () => {
            addAssignmentDialog.current.close();
        }
    }));

    function handleCollectFiles(files) {
        setassignmentData((prevData) => ({
            ...prevData,
            files: files,
        }));
    }

    const handleCancelClick = useCallback((e) => {
        if (ref && ref.current) {
            ref.current.close();
            e.target.form.reset(); // Resetting the form

            //! FILES NOT RESETED
            // setassignmentData((prevData) => ({
            //     ...prevData,
            //     files: [], // Clearing files
            // }));
        }

    }, [ref]);

    const handleSubmit = useCallback(e => {
        const fd = new FormData(e.target);
        const assignmentData = Object.fromEntries(fd.entries());
        setassignmentData(prevData => ({
            ...prevData,
            title: assignmentData.title,
            grade: assignmentData.grade || "Ungraded",
            endTime: assignmentData.endTime,
            endDate: assignmentData.endDate,
            description: assignmentData.description,
        }));
        setFormSubmited(true)
        // Clear form inputs and files
        e.target.reset();
    }, []);

    useEffect(() => {
        if (formSubmitted) {
            console.log(assignmentData)
            setFormSubmited(false)
        }
    }, [formSubmitted])

    return (
        <dialog ref={addAssignmentDialog} className={classes.modal} onSubmit={handleSubmit}>
            <form method="dialog" className={classes.form}>
                <div className={classes.input_container}>
                    <label htmlFor="title">{t("title")}</label>
                    <input type="text" id="title" dir='auto' name="title" />
                </div>
                <div className={classes.input_container}>
                    <label htmlFor="grade">{t("grade")}</label>
                    <input type="number" id="grade" dir='auto' name="grade" />
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
                <FileUpload collectFiles={handleCollectFiles}></FileUpload>
                <SubmitButton cancel={handleCancelClick}></SubmitButton>
                {/* <button type="submit" className={classes.button}>{t("Create")}</button> */}
            </form>
        </dialog>
    )
})

export default AddAssignmentModal