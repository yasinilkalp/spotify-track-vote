import TrackVoteUsers from "../track-vote/track-vote-users";
import TrackImage from "./track-image";
import TrackInfo from "./track-info";
import TrackVote from "../track-vote/track-vote";

const TrackItem = (props) => {
    const { item, index, playTrack, setPlayTrack, listTracks } = props;

    return <div key={item.track.id} className="bg-white border rounded-md mt-2 overflow-hidden">
        <div className="flex justify-between p-3">
            <div className="flex">
                <TrackImage {...{ track: item.track, playTrack, setPlayTrack }} />
                <TrackInfo {...{ track: item.track, user: item.user }} />
            </div>
            <TrackVote {...{ item, listTracks }} />
        </div>
        <TrackVoteUsers {...{ item, index }} />
    </div>
};

export default TrackItem;