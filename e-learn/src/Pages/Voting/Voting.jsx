import classes from './Voting.module.css';
import VotingNavBar from '../../Components/Voting/VotingNavBar';
import Vote from '../../Components/Voting/Vote';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add useNavigate hook

export default function Voting() {
    const [selectedVote, setSelectedVote] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook

    function handleVoteSelected(vote) {
        setSelectedVote(vote);
        navigate(`/voting/${vote.id}`); // Navigate to the selected vote's ID
    }

    return (
        <div className={classes.voting}>
            <VotingNavBar onVoteSelected={handleVoteSelected} /> {/* Pass callback to VotingNavBar */}
            {selectedVote && <Vote vote={selectedVote} />} {/* Render Vote component if a vote is selected */}
        </div>
    );
}
