import { getAccessToken, refreshAccessToken, redirectToSpotifyAuth } from '../../auth'

export const GET_ALBUMS = 'GET_ALBUMS'
export const GET_ALBUM = 'GET_ALBUM'
export const RESET_ALBUM = 'RESET_ALBUM'

async function fetchWithAuth(url) {
    let token = getAccessToken()
    let res = await fetch(url, {
        headers: { 'Authorization': 'Bearer ' + token }
    })

    if (res.status === 401) {
        const refreshed = await refreshAccessToken()
        if (refreshed) {
            token = getAccessToken()
            res = await fetch(url, {
                headers: { 'Authorization': 'Bearer ' + token }
            })
        } else {
            redirectToSpotifyAuth()
            return null
        }
    }

    return res
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
        const res = await fetchWithAuth('https://api.spotify.com/v1/albums/' + id)

        if (!res) return

        const data = await res.json()

        return dispatch({
            type: 'GET_ALBUM',
            data
        })
    }

export const resetAlbum = () => ({
    type: 'RESET_ALBUM'
})
