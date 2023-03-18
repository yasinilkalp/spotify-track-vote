import styles from "./track-vote.module.scss";
import { deleteTrack, voteTrack } from "../../lib/firebase";
import { useSelector } from "react-redux";

const TrackVote = (props) => {
    const { item, listTracks } = props;
    const { user } = useSelector(((state) => state.auth));

    const removeTrack = async (track) => {
        let control = await deleteTrack(track, user);
        if (control) await listTracks();
    };

    const toVote = async () => {
        let control = await voteTrack(item.track, user);
        if (control) await listTracks();
    };

    return <div className={styles.trackVoteContent}>
        {user.uid === item.user.uid &&
            <button onClick={() => removeTrack(item.track)} className={styles.removeTrack}>
                <img src="trash.svg" />
            </button>}
        <button className={`${styles.trackVote} ${styles.trackVoteUp}`} onClick={toVote}>
            <img src="chevron-up.svg" />
            <span>{item.votes.length}</span>
        </button>
    </div>
};

export default TrackVote;