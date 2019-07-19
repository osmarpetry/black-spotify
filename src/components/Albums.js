import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAlbums } from '../redux/albums/actions'

import AlbumBanner from './AlbumBanner'

const Albums = props => {
    const { albums, isAlbumsLoaded, searchText } = props
    const [selectedId, setSelectedId] = useState('')
    const serverData = { albums: [] }

    const handleSelectedId = selectedId => () => {
        setSelectedId(selectedId)
    }

    useEffect(() => {
        if(searchText !== '') {
            props.getAlbums(searchText)
        }
    }, [searchText])

    if(searchText === '') {
        return <h1>Busque algo amigão</h1>
    }

    if(!isAlbumsLoaded) {
        return <h1>Loading...</h1>
    }

    if(albums.length === 0) {
        return <h1>Nada encontrado com "{ searchText }"</h1>
    }

    return (
        albums.map(res => (
            <AlbumBanner
                src={ res.images[0].url }
                alt={ res.name }
                key={ res.id }
                onClick={ handleSelectedId(res.id) }
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
