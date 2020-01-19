import * as React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
import { Button, Card } from '@client/components/atoms'
import { RoomLinkInput, VideoList } from '@client/components/molecules'

const Wrapper = styled.div``

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`
const RoomLinkInputBox = styled.div`
  margin-bottom: 30px;
`

export const VideoWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const { roomId } = useParams()
  const { isConnecting } = useSelector(connectionsSelector)
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    if (roomId) {
      dispatch(connectionsAction.connectSocket(roomId))
    }
  }

  return (
    <Card width={1000}>
      <RoomLinkInputBox>
        <RoomLinkInput />
      </RoomLinkInputBox>
      <VideoList />
      {!isConnecting && (
        <ButtonBox>
          <Button value="Join!" onClick={handleClick} />
        </ButtonBox>
      )}
    </Card>
  )
}
