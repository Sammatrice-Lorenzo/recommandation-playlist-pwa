import React, { useEffect, useState } from 'react'
import { Page, f7, Block, BlockTitle, List, ListItem, Toolbar } from 'framework7-react'
import { getPlaylistsByUser } from '../js/playlist'
import { LinksToolbar } from '../components/links-toolbar';

const PlaylistUser = () => {
    const [playlists, setPlaylists] = useState([]);

    const fetchPlaylistsUser = async () => {
        const data = await getPlaylistsByUser()
        setPlaylists(data)
    }

    useEffect(() => {
        fetchPlaylistsUser()
    }, [])

    const showPlaylists = () => {
        f7.preloader.hide()

        return (
            <List dividersIos outlineIos strongIos strong inset>
                {playlists.map((playlist, index) => (
                    <ListItem
                        key={index}
                        title={playlist.name}
                        link={`/tracks-playlist/${JSON.stringify(playlist)}`}
                        style={{ marginTop: '5%'}}
                    />
                ))}
            </List>
        )
    }

    return (
        <Page name="home" strong outlineIos>
            <BlockTitle>Vos playlist</BlockTitle>
            {playlists && <Block>
                <div className="my-playlists">
                    {playlists.length >= 1 ? showPlaylists() : f7.preloader.show()}
                </div>
            </Block>}
            <Toolbar tabbar icons position="bottom">
                <LinksToolbar activeTab={'#tab-4'}/>
            </Toolbar>
        </Page>
    )
}

export default PlaylistUser
