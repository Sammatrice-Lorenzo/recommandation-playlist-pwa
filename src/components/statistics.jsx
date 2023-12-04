import { callApiSpotify } from '../js/api'
import { calculateGenreCounts, getPercentageGenres } from '../js/statistics'
import React, { useEffect, useState } from 'react'
import { Block, BlockTitle, f7 } from 'framework7-react'
import { PieChartGenresMusic } from './pie-chart'
import { Typography } from '@mui/material'
import { CardTrack } from './card-track'

const Statistics = () => {
    const [genresMusic, setGenresMusic] = useState([])
    const [genresMusicTrack, setGenresMusicTrack] = useState([])
    const [genresTot, setTotGenres] = useState({})
    const [topGenres, setTopGenres] = useState([])
    const [dataPie, setDataPie] = useState([])
    const [topThreeTracks, setTopThreeTracks] = useState([])

    const extractGenres = (items, key) => {
        return items.map((item) => item[key][0])
    }

    const informationsGenresMusicUser = async () => {
        const data= await callApiSpotify('https://api.spotify.com/v1/me/top/artists', 'GET')
        const genres = extractGenres(data.items, 'genres')
        
        setGenresMusic(genres)
    }

    const informationsArtist = async (artist) => {
        const data = await callApiSpotify(`https://api.spotify.com/v1/artists/${artist}`, 'GET')

        return data
    }

    const informationsTopTracksUser = async () => {
        const data = await callApiSpotify(`https://api.spotify.com/v1/me/top/tracks`, 'GET')

        let genres = []
        let topsTracks = []
        for (const [index, tracks] of data.items.entries()) {
            for (const artist of tracks.album.artists) {
                let artistData = await informationsArtist(artist.id)
                if (artistData.genres[0]) {
                    genres.push(artistData.genres[0])
                }
            }
            if (index <= 2) {
                topsTracks.push(tracks)
            }
        }
        setTopThreeTracks(topsTracks)
        setGenresMusicTrack(genres)
    }

    const informationsGenres = async () => {
        if (genresMusic.length > 0 && genresMusicTrack.length > 0 && Object.keys(genresTot).length === 0) {
            let genresCounts = calculateGenreCounts(genresMusicTrack.concat(genresMusic))
            setTotGenres(genresCounts)

            const sortedGenres = Object.keys(genresCounts).sort((a, b) => genresCounts[b] - genresCounts[a])
            const top = sortedGenres.slice(0, 2)

            const firstGenreData = [
                { value: getPercentageGenres(genresCounts, top[0]) },
                { value: 100 - getPercentageGenres(genresCounts, top[0]) },
            ]

            const secondGenreData = [
                { value: getPercentageGenres(genresCounts, top[1]) },
                { value: 100 - getPercentageGenres(genresCounts, top[1]) },
            ]

            setTopGenres(top)
            setDataPie([firstGenreData, secondGenreData])
        }
    }

    useEffect(() => {
        informationsGenresMusicUser()
        informationsTopTracksUser()
    }, [])

    useEffect(() => {
        informationsGenres()
    }, [genresMusic, genresMusicTrack])

    const renderTopTracks = () => {
        return topThreeTracks.map((track, index) => (
            <CardTrack key={index} track={track}></CardTrack>
        ))
    }

    return (
        <Block>
            <Typography>Les top 3 des chansons que vous avez écoutées</Typography>
            {renderTopTracks()}
            <BlockTitle>Vos statistiques</BlockTitle>
            <div className="grid grid-cols-2 medium-grid-cols-4 grid-gap">
                {dataPie && dataPie[0] && dataPie[1] ? (
                    <>
                        {f7.preloader.hide()}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <PieChartGenresMusic
                                data={dataPie[0]}
                                colors={['purple', 'white']}
                                width={140}
                                height={140}
                            />
                            <h3 style={{ textAlign: 'center', marginTop: '5px' }}>{topGenres[0]}</h3>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <PieChartGenresMusic
                                data={dataPie[1]}
                                colors={['green', 'white']}
                                width={140}
                                height={140}
                            />
                            <h3 style={{ textAlign: 'center', marginTop: '5px' }}>{topGenres[1]}</h3>
                        </div>
                    </>
                ) : (
                    f7.preloader.show()
                )}
            </div>
        </Block>
    )
}

export default Statistics
