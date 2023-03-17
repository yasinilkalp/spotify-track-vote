import styles from "./track-info.module.scss";

const TrackInfo = (props) => {
    const { item } = props;
    return <div className={styles.trackInfo}>
        <div className={styles.trackTitle}>{item.track.title}</div>
        <div className={styles.trackArtist}>{item.track.artist}</div>
        <div className={styles.trackInfoUser}>
            <img src={item.user.photoURL} className={styles.trackUserImage} />
            <div className={styles.trackUserName}>{item.user.displayName}</div>
        </div>
    </div>
};

export default TrackInfo;