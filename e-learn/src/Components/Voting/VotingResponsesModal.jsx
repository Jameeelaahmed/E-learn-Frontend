import classes from './VotingResponsesModal.module.css';
import { useTranslation } from 'react-i18next';
import { forwardRef } from 'react';
import img from '../../assets/avatar.jpg'
import { useCallback, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';
import { useParams } from 'react-router-dom';

const VotingListModal = forwardRef(function VotingListModal(_, ref) {
    const { t } = useTranslation();
    const votingResponsesModal = useRef();

    useImperativeHandle(ref, () => ({
        open: () => {
            votingResponsesModal.current.showModal();
        },
        close: () => {
            votingResponsesModal.current.close();
        }
    }));

    const handleCancelClick = useCallback(() => {
        if (ref && ref.current) {
            ref.current.close();
        }
    }, [ref]);
    const respones = [
        {
            id: 1,
            option: 'option1',
            students: [
                { id: 1, name: 'student1', date: "1/1/2021", time: "12:00" },
                { id: 2, name: 'student2', date: "1/1/2021", time: "12:00" },
                { id: 3, name: 'student3', date: "1/1/2021", time: "12:00" },
            ]
        },
        {
            id: 2,
            option: 'option1',
            students: [
                { id: 4, name: 'student1', date: "1/1/2021", time: "12:00" },
                { id: 5, name: 'student2', date: "1/1/2021", time: "12:00" },
                { id: 6, name: 'student3', date: "1/1/2021", time: "12:00" },
            ]
        },
        {
            id: 3,
            option: 'option1',
            students: [
                { id: 7, name: 'student1', date: "1/1/2021", time: "12:00" },
                { id: 8, name: 'student2', date: "1/1/2021", time: "12:00" },
                { id: 9, name: 'student3', date: "1/1/2021", time: "12:00" },
            ]
        },
    ]
    return (
        <>
            <dialog ref={votingResponsesModal} className={classes.modal} dir='ltr'>
                <form method='dialog'>
                    <ul>
                        {respones.map((response) => (
                            <li key={respones.id}>
                                <p className={classes.option}>{response.option}</p>
                                {response.students.map((student) => (
                                    <div key={student.id} className={classes.option_container}>
                                        <div className={classes.vote_data}>
                                            <img className={classes.img} src={img} alt="" />
                                            <span>{student.name}</span>
                                        </div>
                                        <div className={classes.vote_data}>
                                            <span>{student.date}</span>
                                            <span>{student.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                </form>
            </dialog>,
        </>
    )
})

export default VotingListModal;