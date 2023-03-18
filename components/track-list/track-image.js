import styles from "./track-image.module.scss";

const TrackImage = (props) => {
    const { track, playTrack, setPlayTrack } = props;
    
    return <div className={styles.trackImageContent}>
        <div className={`${styles.trackAudio} ${playTrack === track.preview_url ? styles.played : ''}`}>
            <div className={styles.trackBackdrop}></div>
            <div className={styles.trackAudioControl}>
                {playTrack !== track.preview_url &&
                    <button onClick={() => setPlayTrack(track.preview_url)}>
                        <img src="svg/play.svg" />
                    </button>}
                {playTrack === track.preview_url &&
                    <button onClick={() => setPlayTrack(null)}>
                        <img src="svg/pause.svg" />
                    </button>}
            </div>
        </div>
        <img src={track.image} className={styles.trackImage} />
    </div>
};

export default TrackImage;