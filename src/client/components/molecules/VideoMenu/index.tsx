import * as React from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as connectionsAction from '@client/actions/connections'
import { Container, Circle } from './styles'

export const VideoMenu: React.FC = () => {
  const dispatch = useDispatch()
  const handleClickExit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    dispatch(connectionsAction.exitRoom())
  }

  return (
    <Container>
      <Circle color="#ff6865" onClick={handleClickExit}>
        <FontAwesomeIcon icon="phone-slash" />
      </Circle>
    </Container>
  )
}
