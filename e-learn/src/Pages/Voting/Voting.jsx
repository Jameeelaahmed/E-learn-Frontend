import classes from './Voting.module.css';
import VotingNavBar from '../../Components/Voting/VotingNavBar';
import Vote from '../../Components/Voting/Vote';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Voting() {
    const [selectedVote, setSelectedVote] = useState(null);
    const navigate = useNavigate();
    const { voteId } = useParams();

    function handleVoteSelected(vote) {
        setSelectedVote(vote);
        navigate(`/voting/${vote.id}`);
    }

    return (
        <div className={classes.voting}>
            <VotingNavBar onVoteSelected={handleVoteSelected} />
            {selectedVote && <Vote vote={selectedVote} />}
            {!selectedVote && voteId && <Vote voteId={voteId} />} {/* Fetch vote if voteId is in the URL */}
        </div>
    );
}
