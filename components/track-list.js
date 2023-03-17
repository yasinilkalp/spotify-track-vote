import { useSelector } from "react-redux";
import { deleteTrack } from "../lib/firebase";

const TrackList = (props) => {
    const { tracks, playTrack, setPlayTrack,listTracks } = props;
    const { user } = useSelector(((state) => state.auth));

    const removeTrack = async (track) => {
        let control = await deleteTrack(track, user);
        if (control) await listTracks();
      };

    return <div>
        {tracks && tracks.map((x, i) => {
            let item = x.track;

            return <div key={item.id} className="flex py-2 justify-between ">
                <div className='flex space-x-3'>
                    <div>
                        <img src={item.image} className="w-10 h-10" />
                    </div>
                    <div className='track-info'>
                        <div className='text-gray-800 text-sm'>{item.title}</div>
                        <div className='text-gray-400 text-xs'>{item.artist}</div>
                    </div>
                </div>
                <div className='flex space-x-3 items-center'>
                    <div>
                        <img src={x.user.photoURL} className="w-8 h-8 rounded-full" />
                    </div>
                </div>
                <div className='flex justify-center items-center space-x-4'>
                    {playTrack !== item.preview_url && <button onClick={() => setPlayTrack(item.preview_url)}> Başlat </button>}
                    {playTrack === item.preview_url && <button onClick={() => setPlayTrack(null)}> Durdur </button>}
                    <div>{item.duration}</div>
                    {user.uid === x.user.uid &&
                        <button onClick={() => removeTrack(item)}>-</button>}
                </div>
            </div>
        })}
    </div>
};

export default TrackList;