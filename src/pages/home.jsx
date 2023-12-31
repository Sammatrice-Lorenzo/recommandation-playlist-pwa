import React, { useState, useEffect } from 'react'
import { LogoComponent } from '../components/logo'
import UserProfile from '../components/user-profile'
import { LinksToolbar } from '../components/links-toolbar'
import { Button, Page, Toolbar, List, Card, LoginScreenTitle, BlockFooter, CardContent } from 'framework7-react'

const Home = () => {
    const redirectUri = encodeURIComponent(URL_SITE)
    const scopes = 'user-read-private playlist-read-private user-top-read user-read-recently-played user-read-email '
        + 'playlist-modify-public playlist-modify-private'

    const [token, setToken] = useState('')
    
    const authorizeSpotify = () => {
        const authorizeUrl =
            `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}` +
            `&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}&response_type=token`

        window.location.href = authorizeUrl
    }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem('token')

        if (!token && hash) {
            token = hash
                .substring(1)
                .split('&')
                .find((elem) => elem.startsWith('access_token'))
                .split('=')[1]

            window.location.hash = ''
            window.localStorage.setItem('token', token)
        }

        setToken(token)
    }, [])

    return (
        <Page name="home" strong outlineIos>
            {!token ? (
                <Page loginScreen strong outlineIos>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LogoComponent height="50px" width="280"></LogoComponent>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Card
                            className="card-with-margin"
                            style={{
                                width: '65%',
                                height: '400px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <CardContent>
                                <LoginScreenTitle>Pulse IA</LoginScreenTitle>
                                <List inset>
                                    <div
                                        className="text-center"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: '50%',
                                        }}
                                    >
                                        <Button small fill round onClick={authorizeSpotify}>
                                            Connexion Spotify
                                        </Button>
                                    </div>
                                    <BlockFooter className="text-center">Recommandation Playlist</BlockFooter>
                                </List>
                            </CardContent>
                        </Card>
                    </div>
                </Page>
            ) : (
                <Page strong outline>
                    <UserProfile></UserProfile>
                    <Toolbar tabbar icons position="bottom">
                        <LinksToolbar activeTab={'#tab-1'}/>
                    </Toolbar>
                </Page>
            )}
        </Page>
    )
}

export default Home
