import { forwardRef, useImperativeHandle, useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import CheckboxDropdown from '../MultipleChoiceCheckMark/CheckboxDropdown';
import classes from './AddQSModal.module.css';
import Questions from "./Questions";
import { useTranslation } from 'react-i18next';
import { log } from "../../log";
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import { useLocation, useParams } from "react-router-dom";

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
    const location = useLocation();
    const path = location.pathname;
    const params = useParams();
    const groupId = params.groupId;

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
                questionOptions: question.options.map(option => option.value),
                correctOption: question.options.find(option => option.isCorrect)?.value || "",
                grade: question.mark ? parseFloat(question.mark) : null // Ensure grade is a number or null
            }))
        }));
    }, []);
    

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const formValues = Object.fromEntries(fd.entries());

        const selectedGroups = path.endsWith("/quizzes") ? 0 : checkboxDropdownRef.current.getSelectedGroups().map(group => group.value);

        if (!formValues.title || formValues.title.trim() === '') {
            console.error('Validation Error: Title is required.');
            return;
        }

        if (!formValues.endDate || !formValues.endTime) {
            console.log(formValues.endDate, formValues.endTime);
            console.error('Validation Error: End date and time are required.');
            return;
        }

        if (selectedGroups.length === 0 && !path.endsWith("/quizzes")) { // Modified line
            console.error('Validation Error: At least one group must be selected.');
            return;
        }

        const formattedQuestions = formData.questions.map(question => {
            const options = question.questionOptions;
            return {
                text: question.questionTitle || 'Untitled Question',
                option1: options[0] || "", // Modified line
                option2: options[1] || "", // Modified line
                option3: options[2] || "", // Modified line
                option4: options[3] || "", // Modified line
                option5: options[4] || "", // Modified line
                correctOption: question.correctOption, // Added line
                grade: question.grade ? parseFloat(question.grade) : null // Ensure grade is a number or null
            };
        });

        const requestBody = {
            title: formValues.title,
            start: `${formValues.endDate}T${formValues.startTime}`,
            end: `${formValues.endDate}T${formValues.endTime}`,
            questions: formattedQuestions
        };

        if (!path.endsWith("/quizzes")) { // Modified line
            requestBody.groupIds = selectedGroups; // Modified line
        } else { // Added block
            requestBody.grade = formValues["total-mark"];
        }

        try {
            const token = getAuthToken();
            const url = path.endsWith("/quizzes") // Modified line
                ? `https://elearnapi.runasp.net/api/Quiz/CreateNewQuiz?groupID=${groupId}` // Modified line
                : 'https://elearnapi.runasp.net/api/Survey/CreateSurvey';
            const response = await httpRequest('POST', url, token, requestBody);
            console.log(requestBody);
            console.log(response);
            if (response.statusCode === 200 || response.statusCode === 201) {
                console.log('Survey/Quiz created successfully', response.data); // Modified line
                ref.current.close();
            } else {
                console.error('Failed to create survey/quiz', response); // Modified line
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
            endTime: formValues.endTime,
            endDate: formValues.endDate,
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
                        <label htmlFor="endDate">{t("end-date")}</label>
                        <input type="date" id="endDate" dir='auto' name="endDate" />
                    </div>

                </div>
                <div className={classes.row}>
                    <div className={classes.input_container}>
                        <label htmlFor="startTime">{t("start-time")}</label>
                        <input type="time" id="startTime" dir='auto' name="startTime" />
                    </div>
                    <div className={classes.input_container}>
                        <label htmlFor="endTime">{t("end-time")}</label>
                        <input type="time" id="endTime" dir='auto' name="endTime" />
                    </div>
                </div>
                {path.includes("/survey") &&
                <div className={classes.input}>
                    <label htmlFor="group">{t("Group")}</label>
                    <CheckboxDropdown name="group" ref={checkboxDropdownRef}></CheckboxDropdown>
                </div>}
                {path.includes("/quizzes") &&
                    <div className={classes.mark}>
                        <label htmlFor="total-mark">{t("total-mark")}</label>
                        <input type="number" name="total-mark" />
                    </div>}
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
