import {
    getAccessToken,
    refreshAccessToken,
    redirectToSpotifyAuth
} from '../../auth'

export const GET_ALBUMS = 'GET_ALBUMS'
export const GET_ALBUM = 'GET_ALBUM'
export const RESET_ALBUM = 'RESET_ALBUM'

const DEFAULT_MARKET = 'US'

async function fetchWithAuth(url) {
    let token = getAccessToken()
    let res = await fetch(url, {
        headers: { Authorization: 'Bearer ' + token }
    })

    if (res.status === 401) {
        const refreshed = await refreshAccessToken()
        if (refreshed) {
            token = getAccessToken()
            res = await fetch(url, {
                headers: { Authorization: 'Bearer ' + token }
            })
        } else {
            redirectToSpotifyAuth()
            return null
        }
    }

    return res
}

async function fetchTrackWithPreview(trackId, market = DEFAULT_MARKET) {
    const res = await fetchWithAuth(
        'https://api.spotify.com/v1/tracks/' + trackId + '?market=' + market
    )

    if (!res || !res.ok) return null

    return res.json()
}

async function hydrateAlbumTrackPreviews(album, market = DEFAULT_MARKET) {
    if (!album || !album.tracks || !album.tracks.items) return album

    const hydratedItems = await Promise.all(
        album.tracks.items.map(async track => {
            if (!track || !track.id) return track

            const fullTrack = await fetchTrackWithPreview(track.id, market)
            if (!fullTrack) return track

            return {
                ...track,
                preview_url: fullTrack.preview_url,
                is_playable: fullTrack.is_playable,
                restrictions: fullTrack.restrictions,
                available_markets: fullTrack.available_markets
            }
        })
    )

    return {
        ...album,
        tracks: {
            ...album.tracks,
            items: hydratedItems
        }
    }
}

export const getAlbums = searchText =>
    async function (dispatch) {
        if (searchText !== '') {
            const res = await fetchWithAuth(
                'https://api.spotify.com/v1/search?q=' +
                    searchText +
                    '&type=album&market=US&limit=10&offset=10'
            )

            if (!res) return

            const data = await res.json()

            return dispatch({
                type: 'GET_ALBUMS',
                data: data.albums.items || []
            })
        } else {
            return dispatch({
                type: 'GET_ALBUMS',
                data: []
            })
        }
    }

export const getAlbum = id =>
    async function (dispatch) {
        const res = await fetchWithAuth(
            'https://api.spotify.com/v1/albums/' +
                id +
                '?market=' +
                DEFAULT_MARKET
        )

        if (!res) return

        const data = await res.json()
        const hydratedAlbum = await hydrateAlbumTrackPreviews(
            data,
            DEFAULT_MARKET
        )

        return dispatch({
            type: 'GET_ALBUM',
            data: hydratedAlbum
        })
    }

export const resetAlbum = () => ({
    type: 'RESET_ALBUM'
})
