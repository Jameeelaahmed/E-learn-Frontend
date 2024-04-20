import { forwardRef, useImperativeHandle, useRef, useState,useEffect } from "react";
import { createPortal } from "react-dom";
import CheckboxDropdown from '../MultipleChoiceCheckMark/CheckboxDropdown';
import classes from './AddVsModal.module.css';
import Questions from "./Questions";
import { useTranslation } from 'react-i18next';
import InputContainer from './InputContainer';

const AddVsModal = forwardRef(function AddVsModal(_, ref) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        title:"",
        groups:[],
        startDate:"",
        endDate:"",
        questions:[
            {
                questionTitle:"",
                questionOptions:[]
            }
        ]
    });
    const checkboxDropdownRef = useRef();
    const addVSDialog = useRef();

    useImperativeHandle(ref, () => ({
        open: () => {
            addVSDialog.current.showModal();
        },
        close: () => {
            addVSDialog.current.close();
        }
    }));

    function handleCancelClick() {
        if (ref && ref.current) {
            ref.current.close();
        }
    };

    // function handleQuestionChange(questionId, answer) {
    //     setFormData(prevFormData => ({
    //         ...prevFormData,
    //         [questionId]: answer
    //     }));
    // }

    function handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const formValues = Object.fromEntries(fd.entries());
        const selectedGroups = checkboxDropdownRef.current.selectedGroups.map(group => group.value);
    
        
        setFormData(prevData => ({
            ...prevData,
            title: formValues.title,
            groups: selectedGroups,
            time: formValues.time,
            date: formValues.date,
            questions: [
                ...prevData.questions,
                {
                    questionTitle: formValues.description,
                    questionOptions: "put options for every question here"
                }
            ]
        }
    ));
    }

    // useEffect(() => {
    //     console.log(formData);
    // }, [formData]);
    

    return createPortal(
        <dialog ref={addVSDialog} className={classes.modal}>
            <form method='dialog' onSubmit={handleSubmit}>
                <div className={classes.col}>
                    <InputContainer label={t("survey-title")} type="text" nameFor="title" />
                    <div className={classes.input_container}>
                        <label htmlFor="group">{t("Group")}</label>
                        <CheckboxDropdown name="group" ref={checkboxDropdownRef}></CheckboxDropdown>
                    </div>
                    <InputContainer label={t("survey-end-time")} type="time" nameFor="time" />
                    <InputContainer label={t("survey-end-date")} type="date" nameFor="date" />
                </div>
                <Questions/>
                <div className={classes.actions}>
                    <button type="button" onClick={handleCancelClick}>{t("Cancel")}</button>
                    <button type="submit">{t("Create")}</button>
                </div>
            </form>
        </dialog>,
        document.getElementById('vs-Modal')
    );
});

export default AddVsModal;
