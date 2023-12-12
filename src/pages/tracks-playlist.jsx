import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Page, f7, Block, Toolbar, Navbar } from 'framework7-react'
import { callApiSpotify } from '../js/api'
import { LinksToolbar } from '../components/links-toolbar'
import { CardTrack } from '../components/card-track'
import { Typography } from '@mui/material'

const TracksPlaylist = (props) => {
    const playlist = JSON.parse(props.playlist)
    const [tracks, setTracks] = useState([])

    const showTracks = async () => {
        const tracksPlaylist = []

        for (const track of playlist.tracks) {
            const search = await callApiSpotify(`https://api.spotify.com/v1/search?q=${track.name}${track.artist}&type=track`, 'GET')
            const trackSearched = search.tracks.items[0]
            if (trackSearched) {
                tracksPlaylist.push(trackSearched)
            }
        }
        console.log(tracksPlaylist);
        setTracks(tracksPlaylist)
    }

    useEffect(() => {
        showTracks()
    }, [])

    return (
        <Page name="home" strong outlineIos>
            <Navbar title="Playlist" backLink="Retour" />
            <Block>
                <div className="item-content">
                    <Typography
                        variant='h4'
                        sx={{textAlign: 'center'}}
                    >
                        Playlist {playlist ? playlist.name : ''}
                    </Typography>
                </div>
                </Block>
                {
                    tracks.length >= 1 ? (
                        <>
                            {f7.preloader.hide()}
                            {tracks.map((track, index) => (
                                <CardTrack track={track} key={index}></CardTrack>
                            ))}
                        </>
                    ) : f7.preloader.show()
                }
            <Toolbar tabbar icons position="bottom">
                <LinksToolbar activeTab={'#tab-4'}/>
            </Toolbar>
        </Page>
    )
}

export default TracksPlaylist

TracksPlaylist.propTypes = {
    playlist: PropTypes.string.isRequired,
}