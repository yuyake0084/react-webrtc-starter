import * as React from 'react'
import { useSelector } from 'react-redux'
import { connectionsSelector } from '@client/selectors'
import { Video } from '@client/components/atoms'
import { VideoMenu } from '@client/components/molecules'
import { Container, VideoBox } from './styles'

export const SelfVideo: React.FC = () => {
  const [isMouseEnter, setMouseEnter] = React.useState(false)
  const { isConnecting, stream } = useSelector(connectionsSelector)

  const handleMouseEnter = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setMouseEnter(true)
  }, [])

  const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setMouseEnter(false)
  }, [])

  return (
    <Container>
      <VideoBox onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Video autoplay muted={false} width={960} height={540} srcObject={stream} />
        {isConnecting && isMouseEnter && <VideoMenu />}
      </VideoBox>
    </Container>
  )
}
