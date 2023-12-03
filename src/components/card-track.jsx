import { Typography } from "@mui/material"
import { Card, CardContent } from "framework7-react"
import PropTypes from 'prop-types'

export const CardTrack = ({ track }) => {
    return (
        <Card key={track.key}>
            <div className="grid grid-cols-2 medium-grid-cols-4 grid-gap">
                <CardContent>
                    <img src={track.album.images[0].url} alt={track.name} style={{ width: '80%' }} />
                </CardContent>
                <CardContent>
                    <div className="grid grid-cols-1 grid-gap">
                        <div>
                            <Typography className="text-size-1">
                                <b>{track.name}</b>
                            </Typography>
                        </div>
                        {track.artists.map((artist, index) => (
                            <div key={index}>
                                <Typography className="text-size-2">{artist.name}</Typography>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}

CardTrack.propTypes = {
    track: PropTypes.object.isRequired,
}
