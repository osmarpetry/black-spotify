import React from 'react'
import styled from 'styled-components'

import AlbumTracks from './AlbumTracks'
import AlbumBanner from './AlbumBanner'

const AlbumDetailsStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;
`

const AlbumDetails = props => (
    <AlbumDetailsStyled>
        <AlbumBanner
            src={
                props.imageSrc
            }
            alt={ props.imageAlt }
        />
        <div>
            <AlbumTracks
                tracks={
                    props.tracks
                }
            />
        </div>
    </AlbumDetailsStyled>
)

export default AlbumDetails
