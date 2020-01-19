import * as React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

// actions
import * as connectionsAction from '@client/actions/connections'

// components
import { Button } from '@client/components/atoms'
import { SelfVideo } from '@client/components/molecules'

const Container = styled.div``

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

export const CreateRoomForm: React.FC = () => {
  const dispatch = useDispatch()
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    dispatch(connectionsAction.connectSocket())
  }

  React.useEffect(() => {
    dispatch(
      connectionsAction.getUserMedia({
        video: true,
        audio: true,
      }),
    )
  }, [])

  return (
    <Container>
      <SelfVideo />
      <ButtonBox>
        <Button value="Create!" onClick={handleClick} />
      </ButtonBox>
    </Container>
  )
}
