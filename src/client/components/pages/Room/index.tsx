import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
import { Head, Main } from '@client/components/atoms'
import { VideoWrapper } from '@client/components/organisms'

export const Room: React.FC = () => {
  const { roomId } = useParams()
  const { isEnded, stream } = useSelector(connectionsSelector)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (roomId && stream === null) {
      dispatch(connectionsAction.setRoomId(roomId))
      dispatch(
        connectionsAction.getUserMedia({
          video: true,
          audio: true,
        }),
      )
    }
  }, [])

  return (
    <>
      {isEnded ? (
        <Redirect to="/thanks" />
      ) : (
        <>
          <Head title="Private room" />
          <Main>
            <VideoWrapper />
          </Main>
        </>
      )}
    </>
  )
}

export default Room
