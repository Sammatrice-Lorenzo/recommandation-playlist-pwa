
import Home from '../pages/home.jsx'
import NotFoundPage from '../pages/404.jsx'
import PlaylistRecommended from '../pages/playlist-recommended.jsx'
import PlaylistUser from '../pages/playlists-user.jsx';
import TracksPlaylist from '../pages/tracks-playlist.jsx';

const routes = [
    {
        path: '/',
        component: Home,
        props: {
            f7: app
        }
    },
    {
        name: 'playlist-recommended',
        path: '/playlist-recommended/:playlist',
        component: PlaylistRecommended,
        options: {
            props: true,
        },
    },
    {
        name: 'playlists-user',
        path: '/playlists-user/',
        component: PlaylistUser,
    },
    {
        name: 'tracks-playlist',
        path: '/tracks-playlist/:playlist',
        component: TracksPlaylist,
        options: {
            props: true,
        }
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];

export default routes;
