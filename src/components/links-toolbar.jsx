import { Link } from 'framework7-react'
import PropTypes from 'prop-types'
import { logout } from '../js/userStorage'

export const LinksToolbar = ({ activeTab }) => {
    const playlist = JSON.parse(localStorage.getItem('playlist'))

    return (
        <>
            <Link
                tabLink="#tab-2"
                text="Recommendation"
                iconIos="f7:music_note_2"
                iconMd="material:music_note_2"
                tabLinkActive={activeTab === '#tab-2'}
                href={playlist !== null ? `/playlist-recommended/${playlist}` : '/'}
                routeProps={playlist}
            />
            <Link
                tabLink="#tab-1"
                tabLinkActive={activeTab === '#tab-1'}
                text="Accueil"
                iconIos="f7:house_fill"
                iconMd="material:house_fill"
                href="/"
            />
            <Link
                tabLink="#tab-4"
                text="Playlists"
                iconIos="f7:music_albums"
                iconMd="material:music_albums"
                tabLinkActive={activeTab === '#tab-4'}
                href="/playlists-user/"
            />
            <Link
                onClick={() => logout()}
                tabLink="#tab-3"
                text="Déconnexion"
                iconIos="f7:square_arrow_right"
                iconMd="material:logout"
                tabLinkActive={activeTab === '#tab-3'}
            />
        </>
    )
}

LinksToolbar.propTypes = {
    activeTab: PropTypes.string.isRequired,
}