import classes from './Voting.module.css'
import VotingNavBar from './VotingNavBar'
import Vote from './Vote'
export default function Voting(){
    return(
        <div className={classes.voting}>
            <VotingNavBar></VotingNavBar>
            <Vote/>
        </div>
    )
} 