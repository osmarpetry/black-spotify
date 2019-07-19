import React, { useEffect, useState } from 'react'
import queryString from 'query-string'

import logo from './spotify-logo.svg'

import AlbumDetails from './components/AlbumDetails'
import AlbumBanner from './components/AlbumBanner'
import Search from './components/Search'

const App = () => {
    const [serverData, setServerData] = useState({})
    const [searchText, setSearchText] = useState('')
    const [selectedId, setSelectedId] = useState('')

    const accessToken = queryString.parse(location.search).access_token

    const handleSelectedId = selectedId => () => {
        setSelectedId(selectedId)
    }

    const handelSearch = event => {
        setSearchText(event.target.value)
    }

    const handleLogin = () => {
        window.location = 'https://black-spotify.herokuapp.com/login'
    }

    useEffect(() => {
        if (searchText !== '') {
            fetch(
                'https://api.spotify.com/v1/search?q=' +
                searchText +
                '&type=album&market=US&limit=10&offset=10', {
                    headers: { 'Authorization': 'Bearer ' + accessToken }
                })
                .then(res => res.json())
                .then(data => setServerData({
                    albums: data.albums.items
                }))

        }
    }, [searchText])

    useEffect(() => {
        if (selectedId !== '') {
            fetch(
                'https://api.spotify.com/v1/albums/' +
                selectedId, {
                    headers: { 'Authorization': 'Bearer ' + accessToken }
                })
                .then(res => res.json())
                .then(data => {
                    setServerData({
                        album: data
                    })
                })
        }
    }, [selectedId])

    return (
        <div className='App' style={ {
            display: 'grid',
            gridTemplateColumns: 'auto 1fr'
        } }>
            <header className='App-header' style={ {
                marginTop: '20px'
            } }>
                <a href={ window.location.href }>
                    <img
                        src={ logo }
                        name='App-logo'
                        alt='logo'
                        width='200'
                        height='70'
                    />
                </a>
            </header>
            <button onClick={ handleLogin }>Login</button>
            <section
                style={ {
                    display: 'grid',
                    gridTemplateColumns: 'auto 1ft auto'
                } }>
                <Search
                    onSearch={ handelSearch }
                    searchText={ searchText }
                />
                <div style={ {
                    display: 'flex',
                    flexWrap: 'wrap',
                    placeContent: 'center'
                } }>
                    { selectedId === ''
                        ? serverData.albums ? (
                            serverData.albums.map(res => (
                                <AlbumBanner
                                    src={ res.images[0].url }
                                    alt={ res.name }
                                    key={ res.id }
                                    onClick={ handleSelectedId(res.id) }
                                />
                            )
                            )) : <h2>Busque por algum álbum</h2>
                        : (
                            serverData.album && (
                                <AlbumDetails
                                    imageSrc={
                                        serverData.album.images[0].url
                                    }
                                    imageAlt={
                                        serverData.album.name
                                    }
                                    tracks={ serverData.album.tracks.items }
                                />
                            )
                        ) }
                </div>
            </section>
        </div>
    )
}

export default App
