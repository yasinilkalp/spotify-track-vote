import React from 'react';
import axios from "axios";
import { useSelector } from "react-redux";
import { addTrack } from "../lib/firebase";
import ReactAudioPlayer from 'react-audio-player';

const SearchTrackBox = (props) => {
    const { playTrack } = props;
    const { user } = useSelector(((state) => state.auth));
    const [loading, setLoading] = React.useState(false);
    const [searchTracks, setSearchTracks] = React.useState([]);

    const onChange = async (e) => {
        if (e.target.value && e.target.value.length > 3) {
            setLoading(true);
            var response = await axios.get('/api/search-tracks?keyword=' + e.target.value);
            if (response && response.status === 200) {
                setSearchTracks(response.data.tracks);
            }
            setLoading(false);
        }

        if (!e.target.value) setSearchTracks([]);
    };

    const insertTrack = async (track) => {
        let control = await addTrack(track, user);
        if (control) await listTracks();
    };

    return <>
        <input type="text" className='border h-12 rounded-xl w-full px-6' placeholder='Ne dinlemek istiyorsun?' onChange={onChange} />
        {playTrack && <ReactAudioPlayer src={playTrack} autoPlay="auto" />}
        {loading && <div>Yükleniyor...</div>}
        {searchTracks && searchTracks.length > 0 && !loading &&
            <div className='absolute w-full divide-y bg-white mt-2 p-4 rounded-md border'>

                {searchTracks.map((item) => {
                    return <div key={item.id} className="flex py-2 justify-between ">
                        <div className='flex space-x-3'>
                            <div>
                                <img src={item.image} className="w-10 h-10" />
                            </div>
                            <div className=''>
                                <div className='text-gray-800 text-sm'>{item.title}</div>
                                <div className='text-gray-400 text-xs'>{item.artist}</div>
                            </div>
                        </div>
                        <div className='flex justify-center items-center space-x-4'>
                            {playTrack !== item.preview_url && <button onClick={() => setPlayTrack(item.preview_url)}> Başlat </button>}
                            {playTrack === item.preview_url && <button onClick={() => setPlayTrack(null)}> Durdur </button>}
                            <div>{item.duration}</div>
                            {user.uid &&
                                <button onClick={() => insertTrack(item)}>+</button>}
                        </div>
                    </div>
                })}
            </div>}
    </>
};

export default SearchTrackBox;