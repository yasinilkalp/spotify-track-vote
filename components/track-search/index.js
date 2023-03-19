import React from 'react';
import axios from "axios";
import { useSelector } from "react-redux";
import { addTrack } from "../../lib/firebase";
import ReactAudioPlayer from 'react-audio-player';
import TrackImage from '../track-list/track-image';
import TrackInfo from '../track-list/track-info';
import TrackSuggest from '../track-suggest';
import Loading from '../loading';

const TrackSearch = (props) => {
    const { listTracks, playTrack, setPlayTrack } = props;
    const { user } = useSelector(((state) => state.auth));
    const [loading, setLoading] = React.useState(false);
    const [searchTracks, setSearchTracks] = React.useState([]);

    const onChange = async (e) => {
        if (e.target.value && e.target.value.length > 3) {
            setLoading(true);
            var response = await axios.get('/api/search-tracks?keyword=' + e.target.value+'&limit=5');
            if (response && response.status === 200) {
                setSearchTracks(response.data.tracks);
            }
            setLoading(false);
        }
        setPlayTrack(null);

        if (!e.target.value) setSearchTracks([]);
    };

    const insertTrack = async (track) => {
        let control = await addTrack(track, user);
        if (control) {
            setSearchTracks(null);
            setPlayTrack(null);
            await listTracks();
        }
    };

    return <>
        <div className='relative'>
            <div className='flex space-x-3'>
                <div className='grow relative'>
                    <img src='svg/spotify.svg' className=' absolute z-50 left-4 top-3 w-8 stroke-gray-800' />
                    <input type="text"
                        className='border relative z-40 h-14 rounded-md w-full px-6 pl-14'
                        placeholder='Ne dinlemek istiyorsun?' onChange={onChange} />
                    {loading && <Loading style="absolute z-50 right-1 top-1" />}
                </div>
                <TrackSuggest {...{ user, playTrack, setPlayTrack,insertTrack }} />
            </div>

            {playTrack && <ReactAudioPlayer src={playTrack} autoPlay="auto" />}

            {searchTracks && searchTracks.length > 0 &&
                <>
                    <div className='fixed bg-black opacity-40 w-full h-full left-0 top-0 z-30' onClick={() => {
                        setSearchTracks(null);
                        setPlayTrack(null);
                    }} />
                    <div className='absolute z-40 w-full divide-y bg-white mt-2 p-4 rounded-md border'>
                        {searchTracks.map((item) => {
                            return <div key={item.id} className="flex py-2 justify-between ">
                                <div className='flex space-x-3 w-full'>
                                    <TrackImage {...{ track: item, playTrack, setPlayTrack }} />
                                    <TrackInfo {...{ track: item }} />
                                </div>
                                <div className='flex justify-center items-center space-x-4'>
                                    {user.uid &&
                                        <button onClick={() => insertTrack(item)}>
                                            <img src='svg/square-plus.svg' />
                                        </button>}
                                </div>
                            </div>
                        })}
                    </div>
                </>
            }
        </div>
    </>
};

export default TrackSearch;