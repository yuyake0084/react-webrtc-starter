import * as React from 'react'
import { Wrapper, VideoComponent } from './styles'

type Props = {
  autoplay?: HTMLVideoElement['autoplay']
  width: HTMLVideoElement['width']
  height: HTMLVideoElement['height']
  srcObject: HTMLVideoElement['srcObject']
}

export const Video: React.FC<Props> = ({ ...props }) => {
  const { srcObject } = { ...props }
  const videoRef = React.createRef<HTMLVideoElement>()

  React.useEffect(() => {
    const video = videoRef?.current

    if (video) {
      video.srcObject = srcObject
      video.play()
    }
  }, [srcObject])

  return (
    <Wrapper>
      <VideoComponent ref={videoRef} {...props} />
    </Wrapper>
  )
}
