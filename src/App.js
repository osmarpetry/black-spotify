import React, { useState } from 'react'
import { Link, BrowserRouter as Router } from 'react-router-dom'

import stlyed from 'styled-components'

import queryString from 'query-string'

import logo from './spotify-logo.svg'

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { load, save } from 'redux-localstorage-simple'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import LoginPage from './components/LoginPage'
import Albums from './components/Albums'
import Search from './components/Search'
import AlbumDetails from './components/AlbumDetails'

import rootReducer from './rootReducer'

const StyledApp = stlyed.div`
    display: grid;
    grid-template-columns: auto 1fr 5%;

    @media(max-width: 815px) {
        grid-template-columns: 1fr;
        .App-logo {
            display: none;
        }
    }
`

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
        if (typeof id === 'string') {
            setSelectId(id)
        } else {
            setSelectId('')
        }
    }

    return (
        <Router>
            <Provider store={ store }>
                { accessToken ? (
                    <StyledApp>
                        <header className='App-header' style={ {
                            marginTop: '20px'
                        } }>
                            <Link
                                to={ `/?access_token=${accessToken}` }
                                onClick={ handleSelectId }>
                                <img
                                    src={ logo }
                                    className='App-logo'
                                    alt='logo'
                                    width='200'
                                    height='70'
                                />
                            </Link>
                        </header>
                        <main
                            style={ {
                                display: 'grid',
                                gridTemplateColumns: '1fr'
                            } }>
                            { selectId === '' ? (
                                <Search onSearch={ handelSearch } />
                            ) : (
                                <button
                                    style={ { textAlign: 'start' } }
                                    className='btn'
                                    onClick={ handleSelectId }>
                                    <FontAwesomeIcon style={ { paddingRight: '5px' } }
                                        icon={ faAngleLeft }
                                    />
                                        Voltar
                                </button>
                            ) }
                            <div style={ { marginTop: '10px' } }>
                                { selectId === '' ?
                                    (
                                        <Albums
                                            searchText={ searchText }
                                            onSelectId={ handleSelectId }
                                        />
                                    )
                                    : (
                                        <AlbumDetails
                                            selectId={ selectId }
                                        />
                                    )
                                }
                            </div>
                        </main>
                    </StyledApp>
                ) : (<LoginPage />)
                }
            </Provider>
        </Router>
    )
}

export default App
