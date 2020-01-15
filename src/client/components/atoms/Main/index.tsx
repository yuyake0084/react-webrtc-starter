import * as React from 'react'
import styled from 'styled-components'

const MainComponent = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  padding: 20px;

  @media screen and(max-width: 375px) {
    display: block;
    height: auto;
  }
`

export const Main: React.FC = ({ children }) => {
  return <MainComponent>{children}</MainComponent>
}
