import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Circle } from './styles'

export const VideoMenu: React.FC = () => {
  return (
    <Container>
      <Circle color="#ff6865">
        <FontAwesomeIcon icon="phone-slash" />
      </Circle>
    </Container>
  )
}
