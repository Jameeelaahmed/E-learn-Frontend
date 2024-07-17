// VotingModal Component:
import React, { forwardRef, useImperativeHandle, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import classes from './VotingModal.module.css';
import CheckboxDropdown from '../MultipleChoiceCheckMark/CheckboxDropdown';
import { useTranslation } from 'react-i18next';
import VotingQuestion from './VotingQuestion';
import SubmitButton from '../Button/SubmitButton';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';

const VotingModal = forwardRef(function VotingModal({ onVotingCreated }, ref) {
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const endDate = formData.get('endDate');
        const endTime = formData.get('endTime');
        const selectedGroups = checkboxDropdownRef.current.getSelectedGroups().map(group => group.value);

        console.log("Selected groups: ", selectedGroups);
        console.log("Options: ", options);

        const end = `${endDate}T${endTime}:00`;

        const start = new Date();
        start.setSeconds(start.getMinutes() + 1);

        const requestBody = {
            title,
            description,
            start: start.toISOString(),
            end,
            groups: selectedGroups,
            options
        };

        try {
            const token = getAuthToken();
            const response = await httpRequest('POST', 'https://elearnapi.runasp.net/api/Voting/CreateVoting', token, requestBody);
            if (response.statusCode === 201) {
                console.log('Voting created successfully');
                ref.current.close();
                onVotingCreated();

            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
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
                    <CheckboxDropdown name="group" ref={checkboxDropdownRef} />
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
                <VotingQuestion options={options} setOptions={setOptions} /> {/* Pass options and setOptions as props */}
                <SubmitButton cancel={handleCancelClick} />
            </form>
        </dialog>,
        document.getElementById('vs-Modal')
    );
});

export default VotingModal;
