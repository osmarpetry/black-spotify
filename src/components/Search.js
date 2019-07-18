import React from 'react'

const Search = props => {
    return (
        <section
            style={ {
                display: 'flex',
                flexWrap: 'wrap',
                placeContent: 'center'
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
                vaue={ props.searchText }
                onChange={ props.onSearch }
            />
            { props.searchText.length > 0 && (
                <h3>Resultados encontradados para "{ props.searchText }"</h3>
            ) }
        </section>
    )
}

export default Search
