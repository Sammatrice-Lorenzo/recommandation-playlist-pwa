import { Avatar } from '@mui/material'
import { LogoSpotify } from './logo-spotify'
import React, { useState, useEffect } from 'react'
import { Block } from 'framework7-react'
import Statistics from './statistics'
import { callApiSpotify } from '../js/api'
import { storeEmailUser, storeUserId } from '../js/userStorage'

const UserProfile = () => {
    const [user, setUser] = useState('');

    const showInformationUser = async () => {
        const data = await callApiSpotify('https://api.spotify.com/v1/me', 'GET')
        setUser(data)
        storeUserId(data.id)
        storeEmailUser(data.email)
    };

    useEffect(() => {
        showInformationUser()
    }, [])

    return (
        user && <Block>
            <div className="item-content">
                {
                    user.images['url']
                    ?
                        <Avatar
                            src={user.images['url'] } alt="Image profile"
                            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}
                            sx={{ width: 80, height: 80 }}
                        />
                    : 
                    <Avatar
                        style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}
                        sx={{ width: 80, height: 80 }}
                    >
                        <LogoSpotify></LogoSpotify>
                    </Avatar>
                }

                <h2>Bienvenu {user.display_name}</h2>
                <Statistics></Statistics>
            </div>
        </Block>
    );
};

export default UserProfile
