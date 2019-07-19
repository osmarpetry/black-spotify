import queryString from 'query-string'

export const GET_ALBUMS = 'GET_ALBUMS'
export const GET_ALBUM = 'GET_ALBUM'
export const RESET_ALBUM = 'RESET_ALBUM'

const accessToken = queryString.parse(window.location.search).access_token

export const getAlbums = searchText =>
    async function (dispatch) {
        if(searchText !== '') {
            const res = await fetch(
                'https://api.spotify.com/v1/search?q=' +
            searchText +
            '&type=album&market=US&limit=10&offset=10', {
                    headers: { 'Authorization': 'Bearer ' + accessToken }
                })

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
        const res = await fetch(
            'https://api.spotify.com/v1/albums/' + id, {
                headers: { 'Authorization': 'Bearer ' + accessToken }
            })

        const data = await res.json()

        return dispatch({
            type: 'GET_ALBUM',
            data
        })
    }

export const resetAlbum = () => ({
    type: 'RESET_ALBUM'
})
