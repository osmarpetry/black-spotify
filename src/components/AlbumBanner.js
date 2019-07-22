import React from 'react'

const AlbumBanner = props =>
    <img
        className='grid-item'
        src={ props.src }
        alt={ props.alt }
        width='300'
        height='300'
        onClick={ props.onClick }
    />

export default AlbumBanner
