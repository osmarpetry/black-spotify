import { GET_ALBUM, GET_ALBUMS, RESET_ALBUM } from './actions'

const initialState = {
    albums: [],
    isAlbumsLoaded: false,
    albumsLoadedAt: null,
    album: {},
    isAlbumLoaded: false
}

export default (state = initialState, action) => {
    const { type, data } = action

    switch (type) {
    case GET_ALBUMS:
        return {
            ...state,
            albums: data,
            isAlbumsLoaded: true,
            albumsLoadedAt: new Date()
        }
    case GET_ALBUM:
        return { ...state, album: data, isAlbumLoaded: true }
    case RESET_ALBUM:
        return { ...state, album: {}, isAlbumLoaded: false }
    default:
        return state
    }
}
