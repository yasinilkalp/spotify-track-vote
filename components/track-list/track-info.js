import styles from "./track-info.module.scss";

const TrackInfo = (props) => {
    const { track, user } = props;
    return <div className={styles.trackInfo}>
        <div className={styles.trackTitle}>{track.title}</div>
        <div className={styles.trackArtist}>{track.artist}</div>
        {user && <div className={styles.trackInfoUser}>
            <img src={user.photoURL} className={styles.trackUserImage} />
            <div className={styles.trackUserName}>{user.displayName}</div>
        </div>}
        {!user && <div className="text-xs text-gray-500">
            {track.duration}
        </div>}
    </div>
};

export default TrackInfo;