import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  border-radius: 14px;
  background-color: #000;
`

const VideoComponent = styled.video`
  vertical-align: bottom;
`

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

    if (video && srcObject !== null) {
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
