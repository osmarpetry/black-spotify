import React from 'react'

import styled from 'styled-components'

import { redirectToSpotifyAuth } from '../auth'

const StyledLoginPage = styled.main`
    display: flex;
    justify-content: center;
`

const LoginButton = styled.button`
    position: absolute;
    top: 50%;
    font-size: 48px;
    color: #999999;
`

const LoginPage = () => (
    <StyledLoginPage>
        <LoginButton
            style={ {
                position: 'absolute',
                top: '50%'
            } }
            onClick={ redirectToSpotifyAuth }>
            Realizar Login
        </LoginButton>
    </StyledLoginPage>
)

export default LoginPage
