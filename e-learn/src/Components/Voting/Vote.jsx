import React, { useState, useEffect, useRef } from 'react';
import classes from './Vote.module.css';
import VotingListModal from './VotingResponsesModal';
import { useParams } from 'react-router-dom';
export default function Vote({ vote }) {
    const [options, setOptions] = useState([]);

    const { voteId } = useParams()
    useEffect(() => {
        if (vote) {
            const voteOptions = [
                { id: 1, description: vote.option1, percentage: 0 },
                { id: 2, description: vote.option2, percentage: 0 },
                { id: 3, description: vote.option3, percentage: 0 },
                { id: 4, description: vote.option4, percentage: 0 },
                { id: 5, description: vote.option5, percentage: 0 }
            ].filter(option => option.description !== null);
            setOptions(voteOptions);
            console.log('Vote received:', vote);
            console.log('Vote Options:', voteOptions);
            console.log('Vote title:', vote.title);
        } else {
            console.log('No vote data available');
        }
    }, [vote]);

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
            {vote ? (
                <>
                    <p className={classes.description}>{vote.description}</p>
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
                        <p>{t("Start-Date")}: {new Date(vote.start).toLocaleString()}</p>
                        <p>{t("End Date")}: {new Date(vote.end).toLocaleString()}</p>
                    </div>
                </>
            ) : (

                <p>No vote selected </p>
            )}
        </div>
    );
}
