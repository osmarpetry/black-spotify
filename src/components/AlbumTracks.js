import React, { useState } from 'react'
import styled from 'styled-components'

const AlbumTrackLine = styled.div`
    display:grid;
    grid-template-columns: auto auto 1fr auto;
    grid-gap: 10px;
`

const AlbumTracks = props => {
    const [playingId, setPlayingId] = useState('')

    const stopAudio = id => {
        document.getElementById(id).pause()
        document.getElementById(id).currentTime = 0
    }

    const handleAudio = trackId => () => {
        playingId !== '' && stopAudio(playingId)
        document.getElementById(trackId).play()
        setPlayingId(trackId)
    }

    return (
        props.tracks.map(track => (
            <ul key={ track.id }>
                <li>
                    <audio
                        id={ track.id }
                        controls='controls'
                        style={ { display: 'none' } }>
                        <source
                            src={ track.preview_url }
                            type='audio/mpeg'
                        />
                    </audio>
                    <AlbumTrackLine>
                        <button
                            onClick={ handleAudio(track.id) }>
                            Play preview!
                        </button>
                        <p>{ track.track_number }.</p>
                        <p>{ track.name }</p>
                        <p style={ {
                            gridColumn: 4
                        } }>{ track.duration_ms / 60000 }</p>
                    </AlbumTrackLine>
                </li>
            </ul>
        ))
    )
}

export default AlbumTracks
