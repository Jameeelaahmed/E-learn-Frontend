import classes from './Voting.module.css';
import VotingNavBar from '../../Components/Voting/VotingNavBar';
import Vote from '../../Components/Voting/Vote';
import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { log } from '../../log';
export default function Voting() {
    log('<voting /> rendered', 2);
    const [selectedVote, setSelectedVote] = useState(null);
    const navigate = useNavigate();
    const { voteId } = useParams();
    const location = useLocation()
    const path = location.pathname;
    console.log(path)
    function handleVoteSelected(vote) {
        setSelectedVote(vote);
        navigate(`/voting/${vote.id}`);
    }

    if (path.includes('voting')) {
        console.log("voting path ")
    }

    return (
        <div className={classes.voting}>
            {path.includes('voting') &&
                <VotingNavBar onVoteSelected={handleVoteSelected} />
            }
            {selectedVote && <Vote vote={selectedVote} />}
            {!selectedVote && voteId && <Vote voteId={voteId} />} {/* Fetch vote if voteId is in the URL */}
        </div>
    );
}
