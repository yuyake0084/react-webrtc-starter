import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
import { Head, Main } from '@client/components/atoms'
import { VideoWrapper } from '@client/components/organisms'

export const Room: React.FC = () => {
  const { roomId } = useParams()
  const [isEnded, setIsEnded] = React.useState(false)
  const { pc, stream, streams } = useSelector(connectionsSelector)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (roomId && stream === null) {
      dispatch(
        connectionsAction.getUserMedia({
          video: true,
          audio: false,
        }),
      )
    }
  }, [])

  React.useEffect(() => {
    if (pc && !stream && !streams.length) {
      setIsEnded(true)
    }
  }, [stream, streams])

  return (
    <>
      {isEnded ? (
        <Redirect to="/" />
      ) : (
        <>
          <Head title={`${roomId}'s room`} />
          <Main>
            <VideoWrapper />
          </Main>
        </>
      )}
    </>
  )
}
