import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
import { Button, Video } from '@client/components/atoms'
import { VideoMenu } from '@client/components/molecules'
import { Container, VideoBox } from './styles'

export const SelfVideo: React.FC = () => {
  const [isMouseEnter, setMouseEnter] = React.useState(false)
  const dispatch = useDispatch()
  const { stream } = useSelector(connectionsSelector)
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      dispatch(
        connectionsAction.getUserMedia({
          video: true,
          audio: true,
        }),
      )
    },
    [dispatch],
  )
  const handleMouseEnter = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setMouseEnter(true)
  }, [])
  const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setMouseEnter(false)
  }, [])

  React.useEffect(() => {
    if (stream) {
      // dispatch(connectionsAction.connectSocket())
    }
  }, [stream])

  return (
    <Container>
      {stream ? (
        <VideoBox onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Video autoplay width={640} height={360} srcObject={stream} />
          {isMouseEnter && <VideoMenu />}
        </VideoBox>
      ) : (
        <Button value="Connect!" onClick={handleClick} />
      )}
    </Container>
  )
}
