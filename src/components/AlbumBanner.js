import React from 'react'

const AlbumBanner = props =>
    <img
        src={ props.src }
        alt={ props.alt }
        width='300'
        height='300'
        style={ {
            margin: '15px'
        } }
        onClick={ props.onClick }
    />

export default AlbumBanner
