import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

// actions
import * as connectionsAction from '@client/actions/connections'

// selectors
import { connectionsSelector } from '@client/selectors'

// components
import { Button } from '@client/components/atoms'
import { SelfVideo } from '@client/components/molecules'

const Container = styled.div``

const VideoBox = styled.div`
  overflow: hidden;
  border-radius: 4px;
`

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

export const CreateRoomForm: React.FC = () => {
  const dispatch = useDispatch()
  const { stream } = useSelector(connectionsSelector)
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    dispatch(connectionsAction.connectSocket())
  }

  React.useEffect(() => {
    if (!stream) {
      dispatch(
        connectionsAction.getUserMedia({
          video: true,
          audio: true,
        }),
      )
    }
  }, [stream])

  return (
    <Container>
      <VideoBox>
        <SelfVideo />
      </VideoBox>
      <ButtonBox>
        <Button value="Create room!" onClick={handleClick} disabled={stream === null} />
      </ButtonBox>
    </Container>
  )
}
