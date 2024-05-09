import { forwardRef, useImperativeHandle, useRef, useState,useEffect ,useCallback} from "react";
import { createPortal } from "react-dom";
import classes from './VotingModal.module.css';
import CheckboxDropdown from "../MultipleChoiceCheckMark/CheckboxDropdown";
import { useTranslation } from 'react-i18next';
import { log } from "../../log";
import VotingQuestion from "./VotingQuestion";
import SubmitButton from '../Button/SubmitButton'
const VotingModal = forwardRef(function VotingModal({collectFormData}, ref) {
    log('<ADDVSModal /> rendered');
    const { t } = useTranslation();
    const checkboxDropdownRef = useRef();
    const votingModal = useRef();
    
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

    return createPortal(
        <dialog ref={votingModal} className={classes.modal}>
            <form method='dialog'>
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
                <VotingQuestion/>
                <SubmitButton cancel={handleCancelClick}/>
            </form>
        </dialog>,
        document.getElementById('vs-Modal')
    );
});

export default VotingModal;
