import React, { useEffect } from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAlbum } from '../redux/albums/actions'

import AlbumTracks from './AlbumTracks'
import AlbumBanner from './AlbumBanner'

const AlbumDetailsStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;
`

const AlbumDetails = props => {
    useEffect(() => {
        if (props.selectId !== '') {
            props.getAlbum(props.selectId)
        }
    }, [props.selectId])

    if (!props.album || props.selectId === '') {
        return <h1>Has no album Album on Album Details</h1>
    } else {
        return (
            <AlbumDetailsStyled>
                <AlbumBanner
                    src={
                        props.album.images[0].url
                    }
                    alt={ props.album.name }
                />
                <div>
                    <AlbumTracks
                        tracks={
                            props.album.tracks.items
                        }
                    />
                </div>
            </AlbumDetailsStyled>
        )
    }
}

const mapStateToProps = state => ({
    album: state.albums.album,
    isAlbumLoaded: state.isAlbumLoaded,
    albumLoadedAt: state.albumLoadedAt
})

const mapDispatchProps = dispatch =>
    bindActionCreators(
        {
            getAlbum
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchProps
)(AlbumDetails)
