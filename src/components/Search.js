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
        <div
            style={ {
                display: 'grid',
                gridTemplateColumns: '1fr'
            } }>
            <h3>
                Busque por artistas, álbuns ou músicas
            </h3>
            <input
                placeholder='Comece a escrever...'
                onChange={ onSearch }
            />
            { searchText.length > 0 && (
                <h3>Resultados encontradados para "{ searchText.trim() }"</h3>
            ) }
        </div>
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
