import { useSelector } from "react-redux";
import { deleteTrack } from "../../lib/firebase";
import TrackImage from "./track-image";
import TrackInfo from "./track-info";
import TrackVote from "./track-vote";

const TrackItem = (props) => {
    const { item, playTrack, setPlayTrack, listTracks } = props;
    const { user } = useSelector(((state) => state.auth));

    const removeTrack = async (track) => {
        let control = await deleteTrack(track, user);
        if (control) await listTracks();
    };

    return <div key={item.track.id} className="flex justify-between bg-white border rounded-md p-3 mt-2">
        <div className="flex">
            <TrackImage {...{ item, playTrack, setPlayTrack }} />
            <TrackInfo {...{ item }} />
        </div>
        <TrackVote {...{ item }} />
    </div>

    // return <div key={item.track.id} className="flex py-2 justify-between ">
    //     <div className='flex space-x-3'>
    //         <div>
    //             <img src={item.track.image} className="w-10 h-10" />
    //         </div>
    //         <div className='track-info'>
    //             <div className='text-gray-800 text-sm'>{item.track.title}</div>
    //             <div className='text-gray-400 text-xs'>{item.track.artist}</div>
    //         </div>
    //     </div>
    //     <div className='flex space-x-3 items-center'>
    //         <div>
    //             <img src={item.user.photoURL} className="w-8 h-8 rounded-full" />
    //         </div>
    //     </div>
    //     <div className='flex justify-center items-center space-x-4'>
    //         {playTrack !== item.track.preview_url && <button onClick={() => setPlayTrack(item.track.preview_url)}> Başlat </button>}
    //         {playTrack === item.track.preview_url && <button onClick={() => setPlayTrack(null)}> Durdur </button>}
    //         <div>{item.track.duration}</div>
    //         {user.uid === item.user.uid &&
    //             <button onClick={() => removeTrack(item)}>-</button>}
    //     </div>
    // </div>
};

export default TrackItem;