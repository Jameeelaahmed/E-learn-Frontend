import classes from './VotingNavBar.module.css';
import * as FaIcons from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import { useRef, useState, useEffect } from 'react';
import VotingModal from './VotingModal';
import { log } from '../../log';
import Delete from '../Button/Delete';
import Edit from '../Button/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import { httpRequest } from '../../HTTP';

export default function VSNavBar({ onVoteSelected }) { // Add onVoteSelected prop
    const [votes, setVotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedVote, setSelectedVote] = useState(null);

    const { voteId } = useParams();
    const navigate = useNavigate();
    const role = getRole();

    function getRole() {
        return localStorage.getItem('role');
    }

    log('<vsNavbar /> rendered');
    const { t } = useTranslation();
    const addVSDialog = useRef();

    function handleOpenAddVSModal() {
        addVSDialog.current.open();
    }

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 930);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    let wid = "";
    if (role === "Staff") {
        wid = "changeWidth";
    }

    async function GetUserGroupsVotes() {
        try {
            const response = await httpRequest('GET', 'https://elearnapi.runasp.net/api/Voting/GetUserGroupsVotes', localStorage.getItem('token'));

            console.log(response);
            if (response.statusCode === 200) {
                setVotes(response.data);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    }

    useEffect(() => {
        GetUserGroupsVotes();
    }, []);

    async function DeleteVote(id) {
        setLoading(true);
        setMessage('');
        try {
            const response = await httpRequest('DELETE', `https://elearnapi.runasp.net/api/Voting/DeleteVoting/${id}`, localStorage.getItem('token'));

            if (response.statusCode === 200) {
                setMessage('Vote deleted successfully.');
                GetUserGroupsVotes();
            } else {
                setMessage('Failed to delete vote.');
            }
        } catch (error) {
            setMessage('An error occurred while deleting the vote.');
            console.log('An error occurred:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleVoteClick(voteId) {
        try {
            const token = localStorage.getItem('token');
            console.log('Getting vote with id:', voteId);
            const response = await httpRequest('GET', `https://elearnapi.runasp.net/api/Voting/GetVoting/${voteId}`, token);
            console.log(response);
            if (response.statusCode === 200) {
                setSelectedVote(response.data);
                onVoteSelected(response.data); // Notify parent component about the selected vote
                navigate(`/voting/vote${voteId}`);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    }

    return (
        <div className={isMobile ? classes.vs_navigation_bar_responsive : classes.vs_navigation_bar}>
            {loading && <p>Deleting vote...</p>}
            {message && <p>{message}</p>}
            <VotingModal ref={addVSDialog} onVotingCreated={GetUserGroupsVotes} />
            {role === 'Staff' &&
                <div className={classes.add_survey} onClick={handleOpenAddVSModal}>
                    <FaIcons.FaPlus className={classes.icon} />
                    <p>{t("add-voting")}</p>
                </div>
            }
            <ul className={isMobile ? classes.titles_wrapper : ""}>
                {votes.map((vote) => (
                    <div key={vote.id} className={classes.box_wrapper}>
                        <li className={wid} onClick={() => handleVoteClick(vote.id)}>
                            {isMobile ? (
                                <div className={classes.box}>
                                    <p>{vote.title}</p>
                                    <p>{vote.creatorName}</p>
                                </div>
                            ) : (
                                <div className={classes.title_wrapper}>
                                    <FaIcons.FaSquare className={classes.icon_square} />
                                    <div className={classes.info}>
                                        <span className={classes.title}>{vote.title}</span>
                                        <span className={classes.name}>by {vote.creatorName}</span>
                                    </div>
                                </div>
                            )}
                        </li>
                        {role === 'Staff' && (
                            <div className={classes.edit_delete}>
                                <Edit icon={FaIcons.FaPenClip} />
                                <Delete onClick={() => DeleteVote(vote.id)} />
                            </div>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
}
