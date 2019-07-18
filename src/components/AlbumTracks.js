import React, { useState } from 'react'

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
                    <button
                        onClick={ handleAudio(track.id) }>
                            Play preview!
                    </button>
                    { track.track_number } -
                    { track.name } -
                    { track.duration_ms / 60000 }
                </li>
            </ul>
        ))
    )
}

export default AlbumTracks
