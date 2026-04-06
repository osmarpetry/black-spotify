const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI

const STORAGE_KEY_VERIFIER = 'pkce_code_verifier'
const STORAGE_KEY_TOKEN = 'spotify_access_token'
const STORAGE_KEY_REFRESH = 'spotify_refresh_token'
const STORAGE_KEY_EXPIRY = 'spotify_token_expiry'

function generateRandomString(length = 64) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
    const array = new Uint8Array(length)
    crypto.getRandomValues(array)
    return Array.from(array, byte => chars[byte % chars.length]).join('')
}

async function generateCodeChallenge(verifier) {
    const encoder = new TextEncoder()
    const data = encoder.encode(verifier)
    const digest = await crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
}

export async function redirectToSpotifyAuth() {
    const verifier = generateRandomString()
    const challenge = await generateCodeChallenge(verifier)

    localStorage.setItem(STORAGE_KEY_VERIFIER, verifier)

    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        code_challenge_method: 'S256',
        code_challenge: challenge,
        scope: 'user-read-private user-read-email'
    })

    window.location.href = `https://accounts.spotify.com/authorize?${params}`
}

export async function exchangeCodeForToken(code) {
    const verifier = localStorage.getItem(STORAGE_KEY_VERIFIER)

    const body = new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: verifier
    })

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    })

    if (!res.ok) {
        throw new Error('Failed to exchange code for token')
    }

    const data = await res.json()
    storeTokens(data)
    localStorage.removeItem(STORAGE_KEY_VERIFIER)
}

export async function refreshAccessToken() {
    const refreshToken = localStorage.getItem(STORAGE_KEY_REFRESH)
    if (!refreshToken) {
        return false
    }

    const body = new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: refreshToken
    })

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    })

    if (!res.ok) {
        clearTokens()
        return false
    }

    const data = await res.json()
    storeTokens(data)
    return true
}

export function getAccessToken() {
    const expiry = parseInt(localStorage.getItem(STORAGE_KEY_EXPIRY) || '0', 10)
    if (Date.now() > expiry) {
        return null
    }
    return localStorage.getItem(STORAGE_KEY_TOKEN)
}

export function clearTokens() {
    localStorage.removeItem(STORAGE_KEY_TOKEN)
    localStorage.removeItem(STORAGE_KEY_REFRESH)
    localStorage.removeItem(STORAGE_KEY_EXPIRY)
}

function storeTokens({ access_token, refresh_token, expires_in }) {
    localStorage.setItem(STORAGE_KEY_TOKEN, access_token)
    if (refresh_token) {
        localStorage.setItem(STORAGE_KEY_REFRESH, refresh_token)
    }
    localStorage.setItem(STORAGE_KEY_EXPIRY, String(Date.now() + expires_in * 1000))
}
