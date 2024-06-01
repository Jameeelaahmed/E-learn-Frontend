// FileUpload.js
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FilesList from "./FilesList";
import classes from "./FileUpload.module.css";
import UpButton from "../Button/UpButton";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function FileUpload({ collectFiles }) {
    const { t } = useTranslation();
    const { assignmentId, groupId } = useParams();
    const location = useLocation();
    const path = location.pathname;
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const files = [...event.target.files];
        setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files]);
        // collectFiles(selectedFiles)
        // console.log(selectedFiles)
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    const handleDelete = (index) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    useEffect(() => {
        collectFiles(selectedFiles);
    }, [selectedFiles]);

    return (
        <>
            {/* <div className={classes.upload_card}>
                <UpButton onClick={handleButtonClick}>{t("upload")}</UpButton>
                <input
                    ref={fileInputRef}
                    id="fileInput"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className={classes.fileInput}
                />
            </div> */}
            {/* <FilesList files={selectedFiles} onDelete={handleDelete} /> */}

            {(path === `/${groupId}/assignments/${assignmentId}`) &&
                <div className={classes.wid}>
                    <FilesList files={selectedFiles} onDelete={handleDelete} />
                    <div className={classes.upload_click}>
                        <div className={`${classes.space}`}>
                            <UpButton classwid="wid" onClick={handleButtonClick}>{t("upload")}</UpButton>
                            <input
                                ref={fileInputRef}
                                id="fileInput"
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className={classes.fileInput}
                            />
                        </div>
                        <button className={classes.submit}>{t("submit")}</button>
                    </div>
                </div>
            }
        </>
    );
};
