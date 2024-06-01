import classes from './Voting.module.css'
import VotingNavBar from '../../Components/Voting/VotingNavBar'
import Vote from '../../Components/Voting/Vote'
export default function Voting() {
    return (
        <div className={classes.voting}>
            <VotingNavBar></VotingNavBar>
            <Vote />
        </div>
    )
} 