import { forwardRef, useImperativeHandle, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import classes from './VotingModal.module.css';
import CheckboxDropdown from "../MultipleChoiceCheckMark/CheckboxDropdown";
import { useTranslation } from 'react-i18next';
import { log } from "../../log";
import VotingQuestion from "./VotingQuestion";
import SubmitButton from '../Button/SubmitButton';
import { httpRequest } from "../../HTTP";
import { getAuthToken } from "../../Helpers/AuthHelper";

const VotingModal = forwardRef(function VotingModal({ collectFormData }, ref) {
    log('<ADDVSModal /> rendered');
    const { t } = useTranslation();
    const checkboxDropdownRef = useRef();
    const votingModal = useRef();
    
    const [options, setOptions] = useState(["", ""]);

    useImperativeHandle(ref, () => ({
        open: () => {
            votingModal.current.showModal();
        },
        close: () => {
            votingModal.current.close();
        }
    }));

    const handleCancelClick = useCallback(() => {
        if (ref && ref.current) {
            ref.current.close();
        }
    }, [ref]);

    async function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const formValues = Object.fromEntries(fd.entries());
        const selectedGroups = checkboxDropdownRef.current.selectedGroups.map(group => group.id);
        const endDate = new Date(`${formValues.endDate}T${formValues.endTime}:00Z`);
        const requestBody = {
            Text: formValues.title,
            groups: [1],
            Start: new Date().toISOString(),
            End: endDate.toISOString(),
            Options: options
        };

        try {
            const accessToken = getAuthToken();
            const response = await httpRequest('POST', 'https://elearnapi.runasp.net/api/Voting/CreateVoting', accessToken, requestBody);
            console.log(response);
            if (response.statusCode === 200) {
                console.log('Voting created successfully');
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    }

    const handleAddOption = () => {
        setOptions(prevOptions => {
            if (prevOptions.length < 5) {
                return [...prevOptions, ""];
            }
            return prevOptions;
        });
    };

    const handleDeleteOption = (optionIndex) => {
        setOptions(prevOptions => prevOptions.filter((_, index) => index !== optionIndex));
    };

    const handleOptionChange = (optionIndex, newOptionValue) => {
        setOptions(prevOptions => {
            const updatedOptions = [...prevOptions];
            updatedOptions[optionIndex] = newOptionValue;
            return updatedOptions;
        });
    };

    return createPortal(
        <dialog ref={votingModal} className={classes.modal}>
            <form method='dialog' onSubmit={handleSubmit}>
                <div className={classes.input_container}>
                    <label htmlFor="title">{t("title")}</label>
                    <input type="text" id="title" dir='auto' name="title" />
                </div>
                <div className={classes.input_container}>
                    <label htmlFor="group">{t("Group")}</label>
                    <CheckboxDropdown name="group" ref={checkboxDropdownRef}></CheckboxDropdown>
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
                <VotingQuestion
                    options={options}
                    onAddOption={handleAddOption}
                    onDeleteOption={handleDeleteOption}
                    onOptionChange={handleOptionChange}
                />
                <SubmitButton cancel={handleCancelClick} />
            </form>
        </dialog>,
        document.getElementById('vs-Modal')
    );
});

export default VotingModal;
