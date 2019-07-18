import React from 'react'

import AlbumTracks from './AlbumTracks'
import AlbumBanner from './AlbumBanner'

const AlbumDetails = props => (
    <div>
        <AlbumBanner
            src={
                props.imageSrc
            }
            alt={ props.imageAlt }
        />
        <AlbumTracks
            tracks={
                props.tracks
            }
        />
    </div>
)

export default AlbumDetails
