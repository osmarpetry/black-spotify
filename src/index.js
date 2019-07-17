import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as Sentry from '@sentry/browser'
import { version as appVersion } from './../package.json'
import App from './App'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration)
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError)
            })
    })
}

if (process.env.BLACK_SPOTIFY_ENV !== 'development') {
    Sentry.init({
        dsn: 'https://0bb78374092749bc821126a93b3d10fd@sentry.io/1506570',
        environment: process.env.BLACK_SPOTIFY_ENV,
        release: appVersion
    })
}

ReactDOM.render(<App />, document.getElementById('root'))

