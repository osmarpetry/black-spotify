import React from 'react'

const AlbumBannerDetails = props => (
    <div style={ { textAlign: 'center' } }>
        <h4>{ props.albumName } </h4>
        <p>
            { props.albumArtists.map(artist => ( <>
                <a
                    target='_blank'
                    rel='noopener noreferrer'
                    key={ artist.id }
                    href={ artist.external_urls.spotify }>
                    { artist.name }
                </a> <br />
            </>)) }
        </p>
    </div>
)

export default AlbumBannerDetails
