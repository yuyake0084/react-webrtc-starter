import * as React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
import { Button } from '@client/components/atoms'
import { SelfVideo } from '@client/components/molecules'

const Wrapper = styled.div`
  position: relative;
  padding: 50px 0;
`

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

export const VideoWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const { roomId } = useParams()
  const { pc } = useSelector(connectionsSelector)
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    if (roomId) {
      // dispatch(connectionsAction.callRoom(roomId))
      dispatch(connectionsAction.connectSocket(roomId))
    }
  }

  return (
    <Wrapper>
      <SelfVideo />
      {!pc && (
        <ButtonBox>
          <Button value="Join!" onClick={handleClick} />
        </ButtonBox>
      )}
    </Wrapper>
  )
}
