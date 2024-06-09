import React, { useState } from 'react';
import classes from './Vote.module.css';
import VotingListModal from './VotingResponsesModal'
import { useRef } from 'react';
import { httpRequest } from '../../HTTP';
import { getAuthToken } from '../../Helpers/AuthHelper';

export default function Vote() {
    const [options, setOptions] = useState();

    const voteId = 11; //change it to be fetched from the url 
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

    async function fetchVote(){
        try{
            var token = getAuthToken();
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Voting/GetVoting/${voteId}`, token);
            if(response.statusCode === 200){
                const options = [
                    { id: 1, percentage: response.data.option1 },
                    { id: 2, percentage: response.data.option2 },
                    { id: 3, percentage: response.data.option3 },
                    { id: 4, percentage: response.data.option4 },
                    { id: 5, percentage: response.data.option5}
                ]
                setOptions(options);
            }

        }
        catch(error){
            console.log('an error occurred, ', error);
        }
    }
    return (
        <div className={classes.question_container}>
            <p className={classes.description}>Description</p>
            {options.map(option => (
                <label key={option.id}>
                    <p>Description</p>
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
                <p>Start Date: Date</p>
                <p>End Date: Date</p>
            </div>
        </div>
    );
}
