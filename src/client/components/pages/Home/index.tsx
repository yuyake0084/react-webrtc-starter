import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

// actions
import * as connectionsAction from '@client/actions/connections'

// selectors
import { connectionsSelector } from '@client/selectors'

// components
import { Head } from '@client/components/atoms'
import { CreateRoomForm } from '@client/components/organisms'

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const Home: React.FC = () => {
  const { roomId, stream } = useSelector(connectionsSelector)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (roomId && stream === null) {
      dispatch(
        connectionsAction.getUserMedia({
          video: true,
          audio: true,
        }),
      )
    }
  }, [roomId])

  return (
    <>
      {roomId && stream ? (
        <Redirect to={roomId} />
      ) : (
        <>
          <Head title="Home" />
          <Box>
            <CreateRoomForm />
          </Box>
        </>
      )}
    </>
  )
}
