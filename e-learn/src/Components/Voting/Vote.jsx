import React, { useState, useEffect, useRef } from 'react';
import classes from './Vote.module.css';
import VotingListModal from './VotingResponsesModal';
import { useParams } from 'react-router-dom';
import { httpRequest } from '../../HTTP'; // Import httpRequest
import { useTranslation } from 'react-i18next';
export default function Vote({ vote, voteId: propVoteId }) {
    const [options, setOptions] = useState([]);
    const [voteData, setVoteData] = useState(vote);
    const { t } = useTranslation();
    const { voteId: paramVoteId } = useParams();
    const voteId = propVoteId || paramVoteId;

    useEffect(() => {
        async function fetchVote() {
            try {
                const token = localStorage.getItem('token');
                const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Voting/GetVoting/${voteId}`, token);
                if (response.statusCode === 200) {
                    setVoteData(response.data);
                }
            } catch (error) {
                console.log('An error occurred:', error);
            }
        }

        if (!vote && voteId) {
            fetchVote();
        }
    }, [vote, voteId]);

    useEffect(() => {
        if (voteData) {
            const voteOptions = [
                { id: 1, description: voteData.option1, percentage: 0 },
                { id: 2, description: voteData.option2, percentage: 0 },
                { id: 3, description: voteData.option3, percentage: 0 },
                { id: 4, description: voteData.option4, percentage: 0 },
                { id: 5, description: voteData.option5, percentage: 0 }
            ].filter(option => option.description !== null);
            setOptions(voteOptions);
            console.log('Vote received:', voteData);
            console.log('Vote Options:', voteOptions);
            console.log('Vote title:', voteData.title);
        } else {
            console.log('No vote data available');
        }
    }, [voteData]);

    const handleVote = (id) => {
        const totalPercentage = options.reduce((total, option) => total + option.percentage, 0);
        const newOptions = options.map(option => {
            if (option.id === id) {
                return { ...option, percentage: Math.min(100, option.percentage + 1) };
            } else {
                const decreasedPercentage = option.percentage - (100 - totalPercentage + option.percentage) / (options.length - 1);
                return { ...option, percentage: Math.max(0, decreasedPercentage) };
            }
        });
        setOptions(newOptions);
    };

    const ViewResponses = useRef();
    function handleOpenResponses() {
        ViewResponses.current.open();
    }

    return (
        <div className={classes.question_container}>
            {voteData ? (
                <>
                    <p className={classes.description}>{voteData.description}</p>
                    {options.map(option => (
                        <label key={option.id}>
                            <p>{option.description}</p>
                            <div className={classes.bar}>
                                <input type="radio" name="option" onClick={() => handleVote(option.id)} />
                                <div className={classes.radio_circle}></div>
                                <div className={classes.grey}>
                                    <span style={{ width: `${option.percentage}%` }} className={classes.main_color} data-progress={`${option.percentage}%`}></span>
                                </div>
                            </div>
                        </label>
                    ))}
                    <div className={classes.voting_list}>
                        <VotingListModal ref={ViewResponses} />
                        <p onClick={handleOpenResponses}>Open Responses</p>
                    </div>
                    <div className="date_question_container">
                        <p>{t("Start-Date")}: {new Date(voteData.start).toLocaleString()}</p>
                        <p>{t("End Date")}: {new Date(voteData.end).toLocaleString()}</p>
                    </div>
                </>
            ) : (

                <p>No vote selected </p>
            )}
        </div>
    );
}
