import React, { useEffect } from 'react'

import styled from 'styled-components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAlbums } from '../redux/albums/actions'

import AlbumBanner from './AlbumBanner'
import AlbumBannerDetails from './AlbumBannerDetails'

const StyledAlbum = styled.div`
    display: flex;
    flex-flow: column;
    flex-direction: center;
    width: 20%;


    @media(max-width: 1333px) {
        width: 33.33%;
    }
    @media(max-width: 1073px) {
        width: 33.33%;

    }
    @media(max-width: 815px) {
        width: 50%;
    }
    @media(max-width: 555px) {
        width: 100%;

    }
`

const StyledAlbums = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    justify-content: space-around;

    .grid-item {
        flex-basis: 20%;
        position: relative;
        padding: 10px;
        box-sizing: border-box;
    }}

    @media(max-width: 1333px) {
        .grid-item {
            flex-basis: 33.33%;
        }
    }

    @media(max-width: 1073px) {
        .grid-item {
            flex-basis: 33.33%;
        }
    }

    @media(max-width: 815px) {
        .grid-item {
            flex-basis: 50%;
        }
    }

    @media(max-width: 555px) {
        .grid-item {
            flex-basis: 100%;
        }
    }
`

const Albums = props => {
    const { albums = [], isAlbumsLoaded, searchText = '' } = props

    const onSelectId = selectedId => () => {
        props.onSelectId(selectedId)
    }

    useEffect(() => {
        if (searchText !== '') {
            props.getAlbums(searchText)
        }
    }, [searchText])

    if (!isAlbumsLoaded) {
        return <h1>Loading...</h1>
    }

    return (
        <StyledAlbums>
            { albums.map((album, key) => (
                <StyledAlbum key={ key }>
                    <AlbumBanner
                        src={ album.images[0].url }
                        alt={ album.name }
                        key={ key }
                        id={ album.id }
                        onClick={ onSelectId(album.id) }
                    />
                    <AlbumBannerDetails
                        albumName={ album.name }
                        albumArtists={ album.artists }
                    />
                </StyledAlbum>
            )) }
        </StyledAlbums>
    )
}

const mapStateToProps = state => ({
    albums: state.albums.albums,
    isAlbumsLoaded: state.albums.isAlbumsLoaded,
    albumsLoadedAt: state.albums.albumsLoadedAt
})

const mapDispatchProps = dispatch =>
    bindActionCreators(
        {
            getAlbums
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchProps
)(Albums)
