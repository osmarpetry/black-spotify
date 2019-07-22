import React, { Fragment } from 'react'

const AlbumBannerDetails = props => (
    <div style={ { textAlign: 'center' } }>
        <h4>{ props.albumName } </h4>
        <p>
            { props.albumArtists.map(artist => (
                <Fragment key={ artist.id }>
                    <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={ artist.external_urls.spotify }>
                        { artist.name }
                    </a> <br />
                </Fragment>
            )) }
        </p>
    </div>
)

export default AlbumBannerDetails
