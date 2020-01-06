import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from '@client/components/organisms'

export const GlobalStyle = createGlobalStyle`
  html, body {
    font-size: 12px;
    font-family: 'Nunito', sans-serif;
    background-color: #32393e;
  }

  html, body, #app {
    height: 100%;
  }

  a {
    text-decoration: none;
  }
`

const Container = styled.div`
  height: 100%;
`

export const App: React.FC = ({ children }) => (
  <Container>
    <GlobalStyle />
    <Header />
    {children}
  </Container>
)
