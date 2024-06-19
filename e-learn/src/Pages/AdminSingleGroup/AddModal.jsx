import { useRef, forwardRef, useImperativeHandle, useState } from "react"
import classes from './AddModal.module.css'
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FileUpload from "../../Components/Files/FileUpload";
import Button from "../../Components/Button/Button";
import SubmitButton from "../../Components/Button/SubmitButton";
const AddModal = forwardRef(function AddModal(_, ref) {

    const { admingroupID } = useParams();
    const { t } = useTranslation();
    const [materialData, setMaterialData] = useState({
        files: [],
    })

    function handleCollectFiles(files) {
        setMaterialData((prevData) => ({
            ...prevData,
            files: files,
        }));
    }

    const AddModalRef = useRef();
    const location = useLocation();
    const path = location.pathname;
    console.log(path)
    useImperativeHandle(ref, () => ({
        open: () => {
            AddModalRef.current.showModal();
        },
        close: () => {
            AddModalRef.current.close();
        }
    }))
    return (
        <dialog ref={AddModalRef} className={classes.modal}>
            <form>
                {path === `/admingroups/${admingroupID}` &&
                    <>
                        <div className={classes.row}>
                            <div className={classes.input_container}>
                                <label htmlFor="filetype">{t("File Type")}</label>
                                <select>
                                    <option value="lecture">{t("lecture")}</option>
                                    <option value="section">{t("section")}</option>
                                </select>
                            </div>
                            <div className={classes.input_container}>
                                <label htmlFor="WeekNum">{t("Week Num")}</label>
                                <input type="number" />
                            </div>
                        </div>
                        <FileUpload collectFiles={handleCollectFiles}></FileUpload>
                    </>
                }
                {path === `/admingroups/${admingroupID}/assignments` &&
                    <>
                        <div className={classes.row}>
                            <div className={classes.input_container}>
                                <label htmlFor="title">{t("title")}</label>
                                <input type="text" id="title" dir='auto' name="title" />
                            </div>
                            <div className={classes.input_container}>
                                <label htmlFor="grade">{t("grade")}</label>
                                <input type="number" id="grade" dir='auto' name="grade" />
                            </div>
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
                    </>
                }

                <div className={classes.submit_button}>
                    {path === `/admingroups/${admingroupID}` &&
                        <SubmitButton></SubmitButton>}
                    {path === `/admingroups/${admingroupID}/assignments` &&
                        <SubmitButton />
                    }
                </div>
            </form>
        </dialog>
    )
})

export default AddModal;
