import React, { useState } from 'react'
import logo from './spotify-logo.svg'

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { load, save } from 'redux-localstorage-simple'

import Albums from './components/Albums'
import Search from './components/Search'

import rootReducer from './rootReducer'

const App = () => {
    const [searchText, setSearchText] = useState('')

    const middleware = [thunk]

    const store = createStore(
        rootReducer, load(),
        applyMiddleware(...middleware, save())
    )

    const handelSearch = event => {
        setSearchText(event.target.value)
    }

    const handleLogin = () => {
        window.location = 'https://black-spotify.herokuapp.com/login'
    }

    // this.props.getAlbum(selectedId)
    /*
     * fetch(
     * 'https://api.spotify.com/v1/albums/' +
     * selectedId, {
     * headers: { 'Authorization': 'Bearer ' + accessToken }
     * })
     * .then(res => res.json())
     * .then(data => {
     * setServerData({
     * album: data
     * })
     * })
     */

    return (
        <Provider store={ store }>
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
                        <Albums searchText={ searchText } />
                    </div>
                </section>
            </div>
            <button onClick={ handleLogin }>Login</button>
        </Provider>
    )
}

export default App
