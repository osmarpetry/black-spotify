# Development Guide

## Overview

Black Spotify is a frontend-only SPA. It no longer requires a backend server:

- **Auth**: Spotify Authorization Code + PKCE (runs entirely in the browser)
- **Hosting**: Netlify (replaced Firebase)

---

## How the auth flow works

```
User clicks "Realizar Login"
      ↓
App generates code_verifier (stored in localStorage) + code_challenge (SHA-256 hash)
      ↓
Redirect → accounts.spotify.com/authorize?code_challenge=...&response_type=code
      ↓
User logs in on Spotify
      ↓
Spotify redirects back to REDIRECT_URI/?code=xxx
      ↓
App detects ?code= → POSTs to accounts.spotify.com/api/token with code + code_verifier
      ↓
Receives access_token + refresh_token → stored in localStorage
      ↓
App cleans URL, shows authenticated view
      ↓
(Token expires in 1h) → silently refreshes using refresh_token
```

No backend, no client secret needed.

---

## Prerequisites

- Node.js (LTS)
- A Spotify developer account

---

## Local setup

### 1. Clone

```bash
git clone https://github.com/YOUR_GITHUB_USER/black-spotify.git
cd black-spotify
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Spotify Developer Dashboard

1. Go to [https://developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
2. Open your app → copy the **Client ID**
3. Click **Edit Settings** → under **Redirect URIs** add:
   - `http://localhost:8080`
4. Click **Save**

### 4. Create a `.env` file

Create a file named `.env` at the project root (never commit this):

```
SPOTIFY_CLIENT_ID=paste_your_client_id_here
SPOTIFY_REDIRECT_URI=http://localhost:8080
```

### 5. Start the dev server

```bash
npm start
```

Open [http://localhost:8080](http://localhost:8080).

---

## Deploying to Netlify

### Build settings

| Field | Value |
|---|---|
| Branch to deploy | `master` |
| Base directory | *(leave empty)* |
| Build command | `npm run release` |
| Publish directory | `dist` |
| Functions directory | *(leave empty)* |

### Environment variables

In Netlify → Site → **Environment variables**, add:

| Key | Value |
|---|---|
| `SPOTIFY_CLIENT_ID` | Your Client ID from Spotify Dashboard |
| `SPOTIFY_REDIRECT_URI` | `https://your-site.netlify.app` |

After adding the Netlify URL, also add it as a Redirect URI in the Spotify Dashboard (Edit Settings → Redirect URIs).

### Deploy

Push to `master` — Netlify auto-builds and deploys.

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start local dev server on port 8080 |
| `npm run release` | Production build to `dist/` |
| `npm test` | Run unit tests |
| `npm run lint` | Lint source files |
