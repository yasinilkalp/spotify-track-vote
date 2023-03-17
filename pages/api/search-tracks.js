import { searchTracks } from '../../lib/spotify';

export default async (req, res) => {
    const response = await searchTracks(req.query.keyword);
    const { tracks: { items } } = await response.json();

    const tracks = items.slice(0, 10).map((track) => ({
        id: track.id,
        artist: track.artists.map((_artist) => _artist.name).join(', '),
        image: track.album.images[0].url,
        songUrl: track.external_urls.spotify,
        title: track.name,
        duration: parseFloat(track.duration_ms / 60000).toString().split('.')[0] + ':' + Math.floor(parseFloat(track.duration_ms / 1000 % 60)).toString(),
        preview_url: track.preview_url
    }));

    return res.status(200).json({ tracks });
};

function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}