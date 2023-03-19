import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';
import { suggestToSong } from '@/lib/openai';
import Loading from '../loading';
import axios from "axios";
import TrackImage from '../track-list/track-image';
import TrackInfo from '../track-list/track-info';


const Fade = React.forwardRef(function Fade(props, ref) {
    const {
        children,
        in: open,
        onClick,
        onEnter,
        onExited,
        ownerState,
        ...other
    } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter(null, true);
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited(null, true);
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {React.cloneElement(children, { onClick })}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element.isRequired,
    in: PropTypes.bool,
    onClick: PropTypes.any,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    ownerState: PropTypes.any,
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const moods = [{
    id: 'happy',
    title: 'Mutlu',
    icon: 'svg/mood/happy.svg'
},
{
    id: 'sad',
    title: 'Üzgün',
    icon: 'svg/mood/sad.svg'
},
{
    id: 'confuzed',
    title: 'Karışık',
    icon: 'svg/mood/confuzed.svg'
},
{
    id: 'cry',
    title: 'Ağlamaklı',
    icon: 'svg/mood/cry.svg'
},
{
    id: 'suprised',
    title: 'Şaşırmış',
    icon: 'svg/mood/suprised.svg'
}];

const musicTypes = [{
    id: 'turkish',
    title: 'Türkçe'
},
{
    id: 'other',
    title: 'Yabancı'
}];


export default function TrackSuggest(props) {
    const { user, playTrack, setPlayTrack, insertTrack } = props;
    const [open, setOpen] = React.useState(false);
    const [mood, setMood] = React.useState("");
    const [musicType, setMusicType] = React.useState('');
    const [result, setResult] = React.useState(null);

    const [loading, setLoading] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setMood("");
        setMusicType("");
        setLoading(false);
        setResult(null);
        setOpen(false);
    }

    const addTrack = async (item)=>{
        await insertTrack(item);
        handleClose();
    };

    const onSearch = async () => {
        setLoading(true);
        let m = moods.find(x => x.id === mood);
        let t = musicType === "turkish";
        let response = await suggestToSong(m.title, t);
        if (response) {
            let content = response.choices?.[0].message.content;
            let contents = content.split(/\r?\n/).filter(x => x !== '');
            let song = (contents[0]);
            let tracks = await axios.get('/api/search-tracks?keyword=' + song + '&limit=1');
            setResult({
                content: contents[contents.length - 1],
                tracks
            });
        }
        setLoading(false);
    };

    return (
        <div>
            <button className='flex-none relative z-50 w-16 h-full bg-white border rounded-md' onClick={handleOpen}>
                <img src='svg/question.svg' className='w-8 m-auto' />
            </button>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        TransitionComponent: Fade,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className='text-base font-medium'>Merhaba {user?.displayName ?? 'Yabancı'}, </div>
                        {!result && !loading && <>
                            <div className='text-sm'>Bugün nasıl hissettiğini seç modunu yakalamana yardımcı olayım :)</div>
                            <div className='flex items-center mt-2 space-x-2'>
                                {moods.map(m => {
                                    return <button key={m.id} className={`text-center p-2 rounded-md hover:bg-gray-100 ${m.id === mood ? "bg-indigo-50" : ""}`}
                                        onClick={() => setMood(m.id)}>
                                        <img src={m.icon} className="w-12" />
                                        <span className='text-xs'>{m.title}</span>
                                    </button>
                                })}
                            </div>
                            {mood !== "" && <div className='mt-4'>
                                <div className='text-sm'>Ne tür müzikler dinlersin?</div>
                                <div className='flex space-x-3 mt-2'>
                                    {musicTypes.map(t => {
                                        return <button key={t.id}
                                            onClick={() => setMusicType(t.id)}
                                            className={`flex items-center rounded-md px-3 py-2 pr-4 bg-gray-100 ${musicType === t.id ? "bg-indigo-50" : ""}`}>
                                            <img src={`svg/circle-${musicType === t.id ? "check" : "dashed"}.svg`} className='w-4 mr-2' />
                                            <span className='text-xs'>{t.title}</span>
                                        </button>
                                    })}
                                </div>
                            </div>}
                            {musicType !== "" &&
                                <button onClick={onSearch} className='mt-4 p-3 text-sm rounded-md bg-red-500 hover:bg-red-600 text-white w-full'>
                                    Aramayı Başlat!
                                </button>}
                        </>}
                        {loading &&
                            <div className='relative mt-4 bg-red-50 border p-4 border-red-300 rounded-md flex flex-col justify-center items-center'>
                                <Loading />
                                <span className='text-xs'>
                                    Senin için en iyisini arıyorum. Bu biraz zaman alabilir. Lütfen bekle.
                                </span>
                            </div>}
                        {result && !loading && <div>
                            <div style={{ whiteSpace: "pre-wrap" }}>
                                <div>
                                    {result.tracks && result.tracks.data.tracks.map((item) => {
                                        return <div key={item.id} className="flex py-5 justify-between">
                                            <div className='flex space-x-3 w-full'>
                                                <TrackImage {...{ track: item, playTrack, setPlayTrack }} />
                                                <TrackInfo {...{ track: item }} />
                                            </div>
                                            <div className='flex justify-center items-center space-x-4'>
                                                {user.uid &&
                                                    <button onClick={() => addTrack(item)}>
                                                        <img src='svg/square-plus.svg' />
                                                    </button>}
                                            </div>
                                        </div>
                                    })}
                                </div>
                                <div>{result.content}</div>
                            </div>
                        </div>}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}