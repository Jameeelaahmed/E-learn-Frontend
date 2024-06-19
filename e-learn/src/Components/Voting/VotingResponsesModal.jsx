import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState, useEffect } from 'react';
import classes from './VotingResponsesModal.module.css';
import { useTranslation } from 'react-i18next';
import img from '../../assets/avatar.jpg';
import { httpRequest } from '../../HTTP';
import { useParams } from 'react-router-dom';

const VotingListModal = forwardRef(function VotingListModal(_, ref) {
    const { t } = useTranslation();
    const votingResponsesModal = useRef();
    const params = useParams();
    const voteId = params.votingId || 1003; // Use params.voteId if available
    const [responses, setResponses] = useState([]);

    useImperativeHandle(ref, () => ({
        open: () => {
            fetchVoteResponses();
            votingResponsesModal.current.showModal();
        },
        close: () => {
            votingResponsesModal.current.close();
        }
    }));

    const handleCancelClick = useCallback(() => {
        if (votingResponsesModal.current) {
            votingResponsesModal.current.close();
        }
    }, []);

    async function fetchVoteResponses() {
        try {
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Voting/GetVotingResponses/${voteId}`, localStorage.getItem('token'));
            console.log(response);
            if (response.statusCode === 200) {
                setResponses(response.data);
            } else {
                console.log('An error occurred:', response);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    }

    return (
        <>
            <dialog ref={votingResponsesModal} className={classes.modal} dir='ltr'>
                <form method='dialog'>
                    <ul>
                        {responses.map((response, index) => (
                            <li key={index}>
                                <p className={classes.option}>{response.option}</p>
                                <div className={classes.option_container}>
                                    <div className={classes.vote_data}>
                                        <img className={classes.img} src={img} alt="" />
                                        <span>{response.fullName}</span>
                                    </div>
                                    <div className={classes.vote_data}>
                                        <span>{new Date().toLocaleDateString()}</span> {/* Assuming date */}
                                        <span>{new Date().toLocaleTimeString()}</span> {/* Assuming time */}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button type="button" onClick={handleCancelClick}>
                        {t('Close')}
                    </button>
                </form>
            </dialog>
        </>
    );
});

export default VotingListModal;
