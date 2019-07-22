import React, { useState } from 'react'
import styled from 'styled-components'

import { m, ms, s } from 'time-convert'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

const AlbumTrackLine = styled.div`
    display:grid;
    grid-template-columns: auto auto 1fr auto;
    grid-gap: 10px;
`

const AlbumTracks = props => {
    const [playingId, setPlayingId] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)

    const stopAudio = id => {
        document.getElementById(id).pause()
        document.getElementById(id).currentTime = 0
        setIsPlaying(false)
    }

    const handleAudio = trackId => () => {
        playingId !== '' && stopAudio(playingId)
        if(trackId !== playingId || !isPlaying) {
            document.getElementById(trackId).play()
            setPlayingId(trackId)
            setIsPlaying(true)
        }
    }

    const msToHms = durationMs => (
        ms.to(m,s)(durationMs)
            .map(n => n < 10? '0'+n : n.toString())
            .join(':')
    )

    return (
        props.tracks.map(track => (
            <ul style={ { margin: 0, padding: 0 } } key={ track.id }>
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
                            className='btn'
                            onClick={ handleAudio(track.id) }>
                            <FontAwesomeIcon style={ { paddingRight: '5px' } }
                                icon={ faPlayCircle }
                            />
                        </button>
                        <p>{ track.track_number }.</p>
                        <p>{ track.name }</p>
                        <p style={ {
                            gridColumn: 4
                        } }>{ msToHms(track.duration_ms) }</p>
                    </AlbumTrackLine>
                </li>
            </ul>
        ))
    )
}

export default AlbumTracks
