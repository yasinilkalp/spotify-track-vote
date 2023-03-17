import { Fragment } from "react";
import TrackItem from "./track-item";

const TrackList = (props) => {
    const { tracks, playTrack, setPlayTrack, listTracks } = props;

    return <div>
        {tracks && tracks.map((item, i) => {
            return <Fragment key={i}>
                <TrackItem {...{ item, playTrack, setPlayTrack, listTracks }} />
            </Fragment>
        })}
    </div>
};

export default TrackList;