import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Page, Toolbar, f7, Block, Button } from 'framework7-react'
import { CardTrack } from '../components/card-track'
import { callApiSpotify } from '../js/api'
import { Box, Typography } from '@mui/material'
import { LinksToolbar } from '../components/links-toolbar'
import { addPlaylistByUser } from '../js/playlist'
import { getUserIdStored } from '../js/userStorage'

const PlaylistRecommended = (props) => {
    const playlist = JSON.parse(props.playlist)[0]
    const [tracks, setTracks] = useState([])
    const [typePlaylist, setTypePlaylist] = useState('')
    const [namePlaylist, setNamePlaylist] = useState('')

    const playlistRecommended = async () => {
        const tracksPlaylist = []
        
        for (const track of playlist.tracks) {
            const search = await callApiSpotify(`https://api.spotify.com/v1/search?q=${track.name}${track.artist}&type=track`, 'GET')
            const trackSearched = search.tracks.items[0]
            if (trackSearched) {
                tracksPlaylist.push(trackSearched)
            }
        }
        setTracks(tracksPlaylist)
        setTypePlaylist(playlist.type)

        setNamePlaylist(`PulsePlayPlaylist ${playlist.type}`)
        addPlaylistByUser(`PulsePlayPlaylist ${playlist.type}`, playlist)
    }

    useEffect(() => {
        playlistRecommended()
    }, [])

    const savePlaylistInSpotify = async () => {
        const userId = getUserIdStored()
        const body = {
            name: namePlaylist,
            description: 'Playlist crée selon vous mouvements',
            public: true
        }

        const playlist = await callApiSpotify(`https://api.spotify.com/v1/users/${userId}/playlists`, 'POST', body)
        const tracksUri = tracks.map((track) => track.uri)

        await callApiSpotify(
            `https://api.spotify.com/v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
            'POST'
        ).then(() => f7.dialog.alert('Votre playlist a été correctement ajouté'))
        .catch(() => f7.dialog.alert('La playlist n\'a pas ou être sauvegardé sur Spotify'))
    }

    return (
        <Page name="home" strong outlineIos>
            <Block>
                <div className="item-content">
                    <Typography variant='h4' sx={{textAlign: 'center'}}>Playlist {typePlaylist}</Typography>
                </div>
            </Block>
            {tracks.length >= 1 ? tracks.map((track, index) => (
                <CardTrack track={track} key={index}></CardTrack>
            )): null}
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Button small fill round onClick={savePlaylistInSpotify}>Ajouter la playlist à Spotify</Button>
            </Box>
            <Toolbar tabbar icons position="bottom">
                <LinksToolbar activeTab={'#tab-2'}/>
            </Toolbar>
        </Page>
    )
}

export default PlaylistRecommended

PlaylistRecommended.propTypes = {
    playlist: PropTypes.string.isRequired,
}
