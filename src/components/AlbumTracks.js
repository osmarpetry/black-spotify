import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { m, ms, s } from 'time-convert'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

const AlbumTrackLine = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    grid-gap: 10px;
`

const AlbumTracks = props => {
    const [playingId, setPlayingId] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        setPlayingId(null)
        setIsPlaying(false)
    }, [props.tracks])

    const getAudio = id => document.getElementById(String(id))

    const stopAudio = id => {
        const audio = getAudio(id)
        if (!audio) return

        audio.pause()
        audio.currentTime = 0
    }

    const handleAudio = (trackId, previewUrl) => async () => {
        if (!previewUrl) return

        const audio = getAudio(trackId)
        if (!audio) return

        const isSameTrack = playingId === trackId

        if (isSameTrack && isPlaying) {
            stopAudio(trackId)
            setPlayingId(null)
            setIsPlaying(false)
            return
        }

        if (playingId !== null && !isSameTrack) {
            stopAudio(playingId)
        }

        try {
            await audio.play()
            setPlayingId(trackId)
            setIsPlaying(true)
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Unable to play audio preview', error)
            }
        }
    }

    const getPreviewTooltip = track => {
        if (track.preview_url) return 'Play 30 second preview'

        if (track.restrictions && track.restrictions.reason === 'market') {
            return 'Preview unavailable in this market'
        }

        if (track.restrictions && track.restrictions.reason === 'product') {
            return 'Preview unavailable for this Spotify account'
        }

        if (track.restrictions && track.restrictions.reason === 'explicit') {
            return 'Preview unavailable because explicit playback is restricted'
        }

        if (track.is_playable === false) {
            return 'Track is not playable from Spotify'
        }

        return 'Preview unavailable from Spotify'
    }

    const msToHms = durationMs =>
        ms
            .to(
                m,
                s
            )(durationMs)
            .map(n => (n < 10 ? '0' + n : n.toString()))
            .join(':')

    return props.tracks.map((track, key) => {
        const audioId = track.id || key

        return (
            <ul style={{ margin: 0, padding: 0 }} key={audioId}>
                <li>
                    {track.preview_url && (
                        <audio
                            id={audioId}
                            controls='controls'
                            style={{ display: 'none' }}
                            onEnded={() => {
                                setPlayingId(null)
                                setIsPlaying(false)
                            }}>
                            <source src={track.preview_url} type='audio/mpeg' />
                        </audio>
                    )}
                    <AlbumTrackLine>
                        <span
                            title={getPreviewTooltip(track)}
                            style={{
                                display: 'inline-block',
                                cursor: track.preview_url
                                    ? 'pointer'
                                    : 'not-allowed'
                            }}>
                            <button
                                type='button'
                                onClick={handleAudio(
                                    audioId,
                                    track.preview_url
                                )}
                                disabled={!track.preview_url}
                                aria-label={getPreviewTooltip(track)}
                                style={{
                                    opacity: track.preview_url ? 1 : 0.3,
                                    cursor: track.preview_url
                                        ? 'pointer'
                                        : 'not-allowed'
                                }}>
                                <FontAwesomeIcon
                                    style={{ paddingRight: '5px' }}
                                    icon={faPlayCircle}
                                />
                            </button>
                        </span>
                        <p>{track.track_number}.</p>
                        <p>{track.name}</p>
                        <p
                            style={{
                                gridColumn: 4
                            }}>
                            {msToHms(track.duration_ms)}
                        </p>
                    </AlbumTrackLine>
                </li>
            </ul>
        )
    })
}

export default AlbumTracks
