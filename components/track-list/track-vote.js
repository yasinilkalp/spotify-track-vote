import styles from "./track-vote.module.scss";

const TrackVote = (props) => {
    const { item } = props;
    return <div className={styles.trackVoteContent}>
        <div className={`${styles.trackVote} ${styles.trackVoteUp}`}>
            <img src="chevron-up.svg" />
            <span>45</span>
        </div> 
    </div>
};

export default TrackVote;