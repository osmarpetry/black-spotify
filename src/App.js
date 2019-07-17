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

    componentDidMount() {
        const accessToken = queryString.parse(window.location.search).access_token

        fetch('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        })
            .then(res => res.json())
            .then(data => this.setState({
                serverData: {
                    user: {
                        name: data.display_name
                    }
                }
            }))
            .catch(console.log)

    }

    render() {
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
                    <button onClick={ () => window.location = 'https://black-spotify.herokuapp.com/login' }>Login</button>
                </header>
                <section>
                    { this.state.serverData.user
                        ? <h1>{ this.state.serverData.user.name }</h1>
                        : <h1>Anonymous</h1>
                    }
                </section>
            </div>
        )
    }
}

export default App
