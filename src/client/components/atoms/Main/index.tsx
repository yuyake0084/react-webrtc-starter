import * as React from 'react'
import styled from 'styled-components'

const MainComponent = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
`

export const Main: React.FC = ({ children }) => {
  return <MainComponent>{children}</MainComponent>
}
