import * as React from 'react'
import styled from 'styled-components'
import { media } from '@client/utils/theme/media'

const Container = styled.div`
  ${media.phone`
    padding: 40px 15px;
  `}

  position: relative;
  width: 100%;
  padding: 50px 100px;
  background-color: #fff;
  text-align: center;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

export const Card: React.FC = ({ children }) => {
  return <Container>{children}</Container>
}
