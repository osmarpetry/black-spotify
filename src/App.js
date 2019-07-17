import React, { Component } from 'react'
import logo from './spotify-logo.svg'
import queryString from 'query-string'

class App extends Component {
    constructor() {
        super()
        this.state = {
            serverData: {},
            filterString: ''
        }
    }

    renderImg = (src, alt, uri) => {
        return (
            <a href={ uri } >
                <img
                    src={ src }
                    alt={ alt }
                    width='300'
                    height='300'
                    style={ {
                        margin: '15px'
                    } }
                />
            </a>
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

    componentDidUpdate(prevState) {
        const accessToken = queryString.parse(window.location.search).access_token

        if (prevState.filterString !== this.state.filterString) {
            console.log('diferente')

            fetch(
                'https://api.spotify.com/v1/search?q=' +
                this.state.filterString +
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

        console.log('aqui: ', this.state.serverData)

        return (
            <div className='App'>
                <header className='App-header'>
                    <img
                        src={ logo }
                        name='App-logo'
                        alt='logo'
                        width='200'
                        height='100'
                    />
                    Black Spotify
                    <button onClick={ () => window.location = 'http://localhost:8888/login' }>Login</button>
                </header>
                <section
                    style={ {
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    } }>
                    <h3 style={ { flex: '1 0 100%', textAlign: 'center' } }>Busque por artis, álbuns ou músicas</h3>
                    <input
                        style={ {
                            flex: '1 0 100%',
                            width: '400px'
                        } }
                        vaue={ this.state.filterString }
                        onChange={ value => this.setState({
                            filterString: value.target.value
                        }) }
                    />
                    { this.state.filterString.length > 0 && (
                        <h3>Resultados encontradados para "{ this.state.filterString }"</h3>
                    ) }
                </section>
                <section
                    style={ {
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    } }>
                    { this.state.serverData.albums ? this.state.serverData.albums.map(res => {
                        if (res.album) {
                            return this.renderImg(res.album.images[0].url, res.album.name, res.album.uri)
                        } else {
                            return this.renderImg(res.images[0].url, res.name, res.uri)
                        }
                    }
                    ) : <h1>Nada</h1> }
                </section>
            </div>
        )
    }
}

export default App
