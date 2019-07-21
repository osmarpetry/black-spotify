import React, { useState } from 'react'
import { Link, BrowserRouter as Router } from 'react-router-dom'

import queryString from 'query-string'

import logo from './spotify-logo.svg'

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { load, save } from 'redux-localstorage-simple'

import Albums from './components/Albums'
import Search from './components/Search'
import AlbumDetails from './components/AlbumDetails'

import rootReducer from './rootReducer'

const App = () => {
    const [searchText, setSearchText] = useState('')
    const [selectId, setSelectId] = useState('')

    const accessToken = queryString.parse(window.location.search).access_token

    const middleware = [thunk]

    const store = createStore(
        rootReducer, load(),
        applyMiddleware(...middleware, save())
    )

    const handelSearch = event => {
        setSearchText(event)
    }

    const handleSelectId = id => {
        setSelectId(id)
    }

    const handleLogin = () => {
        window.location = 'https://black-spotify.herokuapp.com/login'
    }

    return (
        <Router>
            <Provider store={ store }>
                <div className='App' style={ {
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr'
                } }>
                    <header className='App-header' style={ {
                        marginTop: '20px'
                    } }>
                        <Link to={ `/?access_token=${accessToken}` }>
                            <img
                                src={ logo }
                                name='App-logo'
                                alt='logo'
                                width='200'
                                height='70'
                            />
                        </Link>
                    </header>
                    <section
                        style={ {
                            display: 'grid',
                            gridTemplateColumns: 'auto 1ft auto'
                        } }>
                        <Search onSearch={ handelSearch } />
                        <div style={ {
                            display: 'flex',
                            flexWrap: 'wrap',
                            placeContent: 'center'
                        } }>
                            <Albums
                                searchText={ searchText }
                                onSelectId={ handleSelectId }
                            />
                            <AlbumDetails
                                selectId={ selectId }
                            />
                        </div>
                    </section>
                </div>
                <button onClick={ handleLogin }>Login</button>
            </Provider>
        </Router>
    )
}

export default App
