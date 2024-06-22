import { forwardRef, useImperativeHandle, useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import CheckboxDropdown from '../MultipleChoiceCheckMark/CheckboxDropdown';
import classes from './AddQSModal.module.css';
import Questions from "./Questions";
import { useTranslation } from 'react-i18next';
import InputContainer from './InputContainer';
import { log } from "../../log";
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';

const AddQSModal = forwardRef(function AddQSModal({ collectFormData }, ref) {
    log('<ADDVSModal /> rendered');
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        title: "",
        groups: [],
        startTime: "",
        endTime: "",
        startDate: "",
        endDate: "",
        questions: [
            {
                questionTitle: "",
                questionOptions: []
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

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const formValues = Object.fromEntries(fd.entries());

        const selectedGroups = checkboxDropdownRef.current.getSelectedGroups().map(group => group.value);

        if (!formValues.title || formValues.title.trim() === '') {
            console.error('Validation Error: Title is required.');
            return;
        }

        if (!formValues.date || !formValues.time) {
            console.error('Validation Error: End date and time are required.');
            return;
        }

        if (selectedGroups.length === 0) {
            console.error('Validation Error: At least one group must be selected.');
            return;
        }

        const formattedQuestions = formData.questions.map(question => {
            const options = question.questionOptions;
            return {
                text: question.questionTitle || 'Untitled Question',
                option1: options[0] || "",
                option2: options[1] || "",
                option3: options[2] || "",
                option4: options[3] || "",
                option5: options[4] || ""
            };
        });

        const requestBody = {
            text: formValues.title,
            start: new Date().toISOString(),
            end: `${formValues.date}T${formValues.time}`,
            groupIds: selectedGroups,
            questions: formattedQuestions
        };

        try {
            const token = getAuthToken();
            const response = await httpRequest('POST', 'https://elearnapi.runasp.net/api/Survey/CreateSurvey', token, requestBody);
            console.log(requestBody);
            console.log(response);
            if (response.statusCode === 200) {
                console.log('Survey created successfully', response.data);
                ref.current.close();
            } else {
                console.error('Failed to create survey', response);
                if (response.statusCode === 400 && response.errors) {
                    console.error('Validation Errors:', response.errors);
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }

        setFormData(prevData => ({
            ...prevData,
            title: formValues.title,
            groups: selectedGroups,
            endTime: formValues.time,
            endDate: formValues.date,
        }));
        e.target.reset();
        setFormSubmitted(true);
    }, [formData, checkboxDropdownRef]);


    useEffect(() => {
        if (formSubmitted) {
            collectFormData(formData);
            console.log(formData);
            setFormSubmitted(false);
        }
    }, [formSubmitted]);

    return createPortal(
        <dialog ref={addVSDialog} className={classes.modal}>
            <form method='dialog' onSubmit={handleSubmit}>
                <div className={classes.row}>
                    <div className={classes.input_container}>
                        <label htmlFor="title">{t("title")}</label>
                        <input type="text" id="title" dir='auto' name="title" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="group">{t("Group")}</label>
                        <CheckboxDropdown name="group" ref={checkboxDropdownRef}></CheckboxDropdown>
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
                <Questions onQuestionChange={handleQuestions} onStateChange={setFormData} />

                <div className={classes.actions}>
                    <button type="button" onClick={handleCancelClick}>{t("Cancel")}</button>
                    <button type="submit">{t("Create")}</button>
                </div>
                {/* <div className={classes.col}>
                    <InputContainer label={t("survey-title")} type="text" nameFor="title" />
                    <div className={classes.input_container}>
                        <label htmlFor="group">{t("Group")}</label>
                        <CheckboxDropdown name="group" ref={checkboxDropdownRef}></CheckboxDropdown>
                    </div>
                    <InputContainer label={t("end-time")} type="time" nameFor="time" />
                    <InputContainer label={t("end-date")} type="date" nameFor="date" />
                </div> */}
            </form>
        </dialog >,
        document.getElementById('vs-Modal')
    );
});

export default AddQSModal;
