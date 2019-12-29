import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Header } from '@client/components/organisms'

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    font-size: 12px;
    background-color: #32393e;
  }
`

const Container = styled.div``

export const App: React.FC = ({ children }) => (
  <Container>
    <GlobalStyle />
    <Header />
    {children}
  </Container>
)
