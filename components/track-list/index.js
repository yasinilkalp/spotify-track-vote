import { Fragment } from "react";
import TrackItem from "./track-item";

const TrackList = (props) => {
    const { tracks, playTrack, setPlayTrack, listTracks } = props;

    return <div>
        {tracks && tracks.map((item, index) => {
            return <Fragment key={index}>
                <TrackItem {...{ item, index, playTrack, setPlayTrack, listTracks }} />
            </Fragment>
        })}
    </div>
};

export default TrackList;