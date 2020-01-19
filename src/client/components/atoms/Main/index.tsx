import * as React from 'react'
import styled from 'styled-components'
import { media } from '@client/utils/theme/media'

const MainComponent = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  padding: 20px;
  overflow: scroll;
  box-sizing: border-box;

  ${media.phone`
    display: block;
    height: auto;
  `};
`

export const Main: React.FC = ({ children }) => {
  return <MainComponent>{children}</MainComponent>
}
