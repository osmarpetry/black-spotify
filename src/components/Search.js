import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAlbums } from '../redux/albums/actions'

const Search = props => {
    const [searchText, setSearchText] = useState('')

    const onSearch = event => {
        setSearchText(event.target.value)
    }

    useEffect(() => {
        if(searchText.trim() !== '') {
            props.onSearch(searchText)
        }
    }, [searchText])

    return (
        <section
            style={ {
                display: 'flex',
                flexWrap: 'wrap'
            } }>
            <h3 style={ {
                flex: '1 0 100%'
            } }>
                Busque por artistas, álbuns ou músicas
            </h3>
            <input
                style={ {
                    flex: '1 0 100%',
                    width: '400px'
                } }
                placeholder='Comece a escrever...'
                onChange={ onSearch }
            />
            { searchText.length > 0 && (
                <h3>Resultados encontradados para "{ searchText.trim() }"</h3>
            ) }
        </section>
    )
}

const mapDispatchProps = dispatch =>
    bindActionCreators(
        {
            getAlbums
        },
        dispatch
    )

export default connect(
    mapDispatchProps
)(Search)
