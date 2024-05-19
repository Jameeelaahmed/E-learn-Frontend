import { forwardRef, useImperativeHandle, useRef, useState,useEffect ,useCallback} from "react";
import { createPortal } from "react-dom";
import CheckboxDropdown from '../MultipleChoiceCheckMark/CheckboxDropdown';
import classes from './AddVsModal.module.css';
import Questions from "./Questions";
import { useTranslation } from 'react-i18next';
import InputContainer from './InputContainer';
import { log } from "../../log";
const AddVsModal = forwardRef(function AddVsModal({collectFormData}, ref) {
    log('<ADDVSModal /> rendered');
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        title:"",
        groups:[],
        startTime:"",
        endTime:"",
        startDate:"",
        endDate:"",
        questions:[
            {
                questionTitle:"",
                questionOptions:[]
            }
        ]
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

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

    const handleCancelClick = useCallback(() => {
        if (ref && ref.current) {
            ref.current.close();
        }
    }, [ref]);

    const handleQuestions = useCallback(updatedQuestions => {
        setFormData(prevData => ({
            ...prevData,
            questions: updatedQuestions.map(question => ({
                questionTitle: question.description,
                questionOptions: question.options
            }))
        }));
    }, []);

    const handleSubmit = useCallback(e => {
        const fd = new FormData(e.target);
        const formValues = Object.fromEntries(fd.entries());
        const selectedGroups = checkboxDropdownRef.current.selectedGroups.map(group => group.value);
        setFormData(prevData => ({
            ...prevData,
            title: formValues.title,
            groups: selectedGroups,
            endTime: formValues.time,
            endDate: formValues.date,
        }));
        e.target.reset();
        setFormSubmitted(true)
    }, []);

    useEffect(() => {
        if(formSubmitted){
            collectFormData(formData)
            console.log(formData)
            setFormSubmitted(false)
        }
    }, [formSubmitted]);

    return createPortal(
        <dialog ref={addVSDialog} className={classes.modal}>
            <form method='dialog' onSubmit={handleSubmit}>
                <div className={classes.col}>
                    <InputContainer label={t("survey-title")} type="text" nameFor="title" />
                    <div className={classes.input_container}>
                        <label htmlFor="group">{t("Group")}</label>
                        <CheckboxDropdown name="group" ref={checkboxDropdownRef}></CheckboxDropdown>
                    </div>
                    <InputContainer label={t("end-time")} type="time" nameFor="time" />
                    <InputContainer label={t("end-date")} type="date" nameFor="date" />
                </div>
                <Questions onQuestionChange={handleQuestions} onStateChange={setFormData}/>
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
