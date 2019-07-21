import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAlbums } from '../redux/albums/actions'

import AlbumBanner from './AlbumBanner'

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
        albums.map(res => (
            <AlbumBanner
                src={ res.images[0].url }
                alt={ res.name }
                key={ res.id }
                id={ res.id }
                onClick={ onSelectId(res.id) }
            />
        ))
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
