import styles from "./track-image.module.scss";

const TrackImage = (props) => {
    const { item, playTrack, setPlayTrack } = props;
    return <div className={styles.trackImageContent}>
        <div className={`${styles.trackAudio} ${playTrack === item.track.preview_url ? styles.played : ''}`}>
            <div className={styles.trackBackdrop}></div>
            <div className={styles.trackAudioControl}>
                {playTrack !== item.track.preview_url &&
                    <button onClick={() => setPlayTrack(item.track.preview_url)}>
                        <img src="play.svg" />
                    </button>}
                {playTrack === item.track.preview_url &&
                    <button onClick={() => setPlayTrack(null)}>
                        <img src="pause.svg" />
                    </button>}
            </div>
        </div>
        <img src={item.track.image} className={styles.trackImage} />
    </div>
};

export default TrackImage;