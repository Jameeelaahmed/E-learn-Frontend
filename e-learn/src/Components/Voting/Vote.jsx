import React, { useState, useEffect, useRef } from 'react';
import classes from './Vote.module.css';
import VotingListModal from './VotingResponsesModal';
import { useParams } from 'react-router-dom';
import { httpRequest } from '../../HTTP';
import { useTranslation } from 'react-i18next';

export default function Vote({ vote, voteId: propVoteId }) {
    const [options, setOptions] = useState([]);
    const [voteData, setVoteData] = useState(vote);
    const [hasVoted, setHasVoted] = useState(false);
    const [userVote, setUserVote] = useState(null);
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
                    setHasVoted(response.data.hasVoted);
                    setUserVote(response.data.userVote);
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
                { id: 1, description: voteData.optionPercentages[0].text, percentage: voteData.optionPercentages[0].percentage },
                { id: 2, description: voteData.optionPercentages[1].text, percentage: voteData.optionPercentages[1].percentage },
                { id: 3, description: voteData.optionPercentages[2]?.text, percentage: voteData.optionPercentages[2]?.percentage },
                { id: 4, description: voteData.optionPercentages[3]?.text, percentage: voteData.optionPercentages[3]?.percentage },
                { id: 5, description: voteData.optionPercentages[4]?.text , percentage: voteData.optionPercentages[4]?.percentage }
            ].filter(option => option.description !== undefined);
            setOptions(voteOptions);
            console.log('Vote received:', voteData);
            console.log('Vote Options:', voteOptions);
            console.log('Vote title:', voteData.title);
        } else {
            console.log('No vote data available');
        }
    }, [voteData]);

    const handleVote = async (id) => {
        if (hasVoted) return;

        const chosenOption = options.find(option => option.id === id);
        console.log('Chosen option:', chosenOption.description);
        try {
            const token = localStorage.getItem('token');
            const reqBody = chosenOption.description;
            console.log('Request body:', reqBody);
            const response = await httpRequest('POST', `https://elearnapi.runasp.net/api/Voting/SubmitResponse/${voteData.id}`, token, reqBody);
            console.log('Response:', response);
            if(response.statusCode === 201) {
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
                setHasVoted(true);
                setUserVote(chosenOption.option);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
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
                                <input 
                                    type="radio" 
                                    name="option" 
                                    onClick={() => handleVote(option.id)} 
                                    disabled={hasVoted} 
                                />
                                <div className={`${classes.radio_circle} ${hasVoted && userVote === option.description? classes.voted : ''}`}></div>
                                <div className={classes.grey}>
                                    <span 
                                        style={{ width: `${option.percentage}%` }}
                                        className={classes.main_color} 
                                        data-progress={`${option.percentage}%`}
                                    ></span>
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
                        <p>{t("end-date")}: {new Date(voteData.end).toLocaleString()}</p>
                    </div>
                </>
            ) : (
                <p>No vote selected</p>
            )}
        </div>
    );
}
