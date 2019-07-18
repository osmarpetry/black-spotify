import React from 'react'

const Banner = props =>
    <img
        onClick={ props.onClick }
        src={ props.src }
        alt={ props.alt }
        width='300'
        height='300'
        style={ {
            margin: '15px'
        } }
    />

export default Banner
