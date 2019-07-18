import React, { Component } from 'react'
import logo from './spotify-logo.svg'
import queryString from 'query-string'

import Album from './components/Album'
import Banner from './components/Banner'
import Search from './components/Search'

class App extends Component {
    constructor() {
        super()
        this.state = {
            serverData: {},
            searchText: '',
            selectedId: ''
        }
    }

    handleSelectedId = selectedId => () => {
        this.setState({ selectedId })
    }

    handelSearch = event => {
        this.setState({ searchText: event.target.value })
    }

    handleLogin = () => {
        window.location = 'https://black-spotify.herokuapp.com/login'
    }

    renderAlbum = (src, alt, tracks) => {
        return (
            <div>
                <Banner
                    src={ src }
                    alt={ alt }
                />
                <Album tracks={ tracks } />
            </div>
        )
    }

    componentDidMount() {
        const accessToken = queryString.parse(window.location.search).access_token

        fetch(
            'https://api.spotify.com/v1/recommendations?limit=10&market=BR' +
            '&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2' +
            'Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA', {
                headers: { 'Authorization': 'Bearer ' + accessToken }
            })
            .then(res => res.json())
            .then(data => this.setState({
                serverData: {
                    albums: data.tracks
                }
            }))
            .catch(console.log)
    }

    componentDidUpdate(prevProps, prevState) {
        const accessToken = queryString.parse(window.location.search).access_token

        if (
            this.state.selectedId !== '' &&
            prevState.selectedId !== this.state.selectedId
        ) {
            console.log('entrei: ', this.state.selectedId)
            fetch(
                'https://api.spotify.com/v1/albums/' +
                this.state.selectedId, {
                    headers: { 'Authorization': 'Bearer ' + accessToken }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.setState({
                        serverData: {
                            album: data
                        }
                    })
                })
        }

        if (
            this.state.searchText !== '' &&
            prevState.searchText !== this.state.searchText
        ) {
            fetch(
                'https://api.spotify.com/v1/search?q=' +
                this.state.searchText +
                '&type=album&market=US&limit=10&offset=10', {
                    headers: { 'Authorization': 'Bearer ' + accessToken }
                })
                .then(res => res.json())
                .then(data => this.setState({
                    serverData: {
                        albums: data.albums.items
                    }
                }))
        }

    }

    render() {
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
                    onSearch={ this.handelSearch }
                    searchText={ this.state.searchText }
                />
                <section
                    style={ {
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    } }>
                    { this.state.selectedId === ''
                        ? this.state.serverData.albums ? (
                            this.state.serverData.albums.map(res => {
                                if (res.album) {
                                    return (
                                        <Banner
                                            src={ res.album.images[0].url }
                                            alt={ res.album.name }
                                            key={ res.album.id }
                                            onClick={
                                                this.handleSelectedId(res.album.id)
                                            }
                                        />
                                    )
                                } else {
                                    return (
                                        <Banner
                                            src={ res.images[0].url }
                                            alt={ res.name }
                                            key={ res.id }
                                            onClick={ this.handleSelectedId(res.id) }
                                        />
                                    )
                                }
                            }
                            )) : <button onClick={ this.handleLogin }>Login</button>
                        : (
                            this.state.serverData.album && (
                                <div>
                                    <Banner
                                        src={
                                            this.state.serverData.album.images[0].url
                                        }
                                        alt={ this.state.serverData.album.name }
                                    />
                                    <Album
                                        tracks={
                                            this.state.serverData.album.tracks.items
                                        }
                                    />
                                </div>
                            )
                        ) }
                </section>
            </div>
        )
    }
}

export default App
