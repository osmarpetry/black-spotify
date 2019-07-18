import React, { useEffect, useState } from 'react'
import logo from './spotify-logo.svg'
import queryString from 'query-string'

import Album from './components/Album'
import Banner from './components/Banner'
import Search from './components/Search'

const App = () => {
    const accessToken = queryString.parse(window.location.search).access_token

    const [serverData, setServerData] = useState({})
    const [searchText, setSearchText] = useState('')
    const [selectedId, setSelectedId] = useState('')

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
        fetch(
            'https://api.spotify.com/v1/recommendations?limit=10&market=BR' +
            '&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2' +
            'Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA', {
                headers: { 'Authorization': 'Bearer ' + accessToken }
            })
            .then(res => res.json())
            .then(data => {
                setServerData({
                    albums: data.tracks
                })
            })
    }, [])

    useEffect(() => {
        if(selectedId !== '') {
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

    useEffect(() => {
        if(searchText !== '') {
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

    return (
        <div className='App'>
            <header className='App-header'>
                <a href={ window.location.href }>
                    <img
                        src={ logo }
                        name='App-logo'
                        alt='logo'
                        width='200'
                        height='100'
                    />
                </a>
                Black Spotify
            </header>
            <Search
                onSearch={ handelSearch }
                searchText={ searchText }
            />
            <section
                style={ {
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                } }>
                { selectedId === ''
                    ? serverData.albums ? (
                        serverData.albums.map(res => {
                            if (res.album) {
                                return (
                                    <Banner
                                        src={ res.album.images[0].url }
                                        alt={ res.album.name }
                                        key={ res.album.id }
                                        onClick={
                                            handleSelectedId(res.album.id)
                                        }
                                    />
                                )
                            } else {
                                return (
                                    <Banner
                                        src={ res.images[0].url }
                                        alt={ res.name }
                                        key={ res.id }
                                        onClick={ handleSelectedId(res.id) }
                                    />
                                )
                            }
                        }
                        )) : <button onClick={ handleLogin }>Login</button>
                    : (
                        serverData.album && (
                            <div>
                                <Banner
                                    src={
                                        serverData.album.images[0].url
                                    }
                                    alt={ serverData.album.name }
                                />
                                <Album
                                    tracks={
                                        serverData.album.tracks.items
                                    }
                                />
                            </div>
                        )
                    ) }
            </section>
        </div>
    )
}

export default App
