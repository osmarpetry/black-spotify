import React, { useEffect } from 'react'

import styled from 'styled-components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAlbums } from '../redux/albums/actions'

import AlbumBanner from './AlbumBanner'

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
            { albums.map(res => (
                <AlbumBanner
                    src={ res.images[0].url }
                    alt={ res.name }
                    key={ res.id }
                    id={ res.id }
                    onClick={ onSelectId(res.id) }
                />
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
