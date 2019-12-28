import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserMedia } from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
import { Button, Video } from '@client/components/atoms'
import { Container } from './styles'

export const SelfVideo: React.FC = () => {
  const dispatch = useDispatch()
  const { stream } = useSelector(connectionsSelector)
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      dispatch(
        getUserMedia({
          video: true,
          audio: true,
        }),
      )
    },
    [dispatch],
  )
  const handleMouseEnter = React.useCallback(
    (e: React.MouseEvent<HTMLVideoElement>) => {
      e.preventDefault()
      console.log('enter')
    },
    [dispatch],
  )
  const handleMouseLeave = React.useCallback(
    (e: React.MouseEvent<HTMLVideoElement>) => {
      e.preventDefault()
      console.log('leave')
    },
    [dispatch],
  )

  return (
    <Container>
      {stream ? (
        <Video
          autoplay
          width={640}
          height={360}
          srcObject={stream}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ) : (
        <Button value="Connect!" onClick={handleClick} />
      )}
    </Container>
  )
}
