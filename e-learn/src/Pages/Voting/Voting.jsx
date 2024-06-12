import classes from './Voting.module.css';
import VotingNavBar from '../../Components/Voting/VotingNavBar';
import Vote from '../../Components/Voting/Vote';
import { useState } from 'react';

export default function Voting() {
    const [selectedVote, setSelectedVote] = useState(null);

    function handleVoteSelected(vote) {
        setSelectedVote(vote);
    }

    return (
        <div className={classes.voting}>
            <VotingNavBar onVoteSelected={handleVoteSelected} /> {/* Pass callback to VotingNavBar */}
            {selectedVote && <Vote vote={selectedVote} />} {/* Render Vote component if a vote is selected */}
        </div>
    );
}
