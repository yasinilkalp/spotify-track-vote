import styles from "./track-vote.module.scss";
import { deleteTrack } from "../../lib/firebase";
import { useSelector } from "react-redux";

const TrackVote = (props) => {
    const { item, listTracks } = props;
    const { user } = useSelector(((state) => state.auth));

    const removeTrack = async (track) => {
        let control = await deleteTrack(track, user);
        if (control) await listTracks();
    };

    return <div className={styles.trackVoteContent}>
        {user.uid === item.user.uid &&
            <button onClick={() => removeTrack(item.track)} className={styles.removeTrack}>
                <img src="trash.svg" />
            </button>}
        <div className={`${styles.trackVote} ${styles.trackVoteUp}`}>
            <img src="chevron-up.svg" />
            <span>45</span>
        </div>
    </div>
};

export default TrackVote;