import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  border-radius: 14px;
  background-color: #000;

  ${({ width, height }: Pick<Props, 'width' | 'height'>) => `
    max-width: ${width}px;
    max-height: ${height}px;
  `}
`

const VideoComponent = styled.video`
  width: 100%;
  border-radius: 14px;
  vertical-align: bottom;
`

type Props = {
  autoplay?: HTMLVideoElement['autoplay']
  width: HTMLVideoElement['width']
  height: HTMLVideoElement['height']
  srcObject: HTMLVideoElement['srcObject']
}

export const Video: React.FC<Props> = ({ width, height, srcObject, ...rest }) => {
  const videoRef = React.createRef<HTMLVideoElement>()

  React.useEffect(() => {
    const video = videoRef?.current

    if (video && srcObject !== null) {
      video.srcObject = srcObject
      video.play()
    }
  }, [srcObject])

  return (
    <Wrapper width={width} height={height}>
      <VideoComponent ref={videoRef} {...rest} />
    </Wrapper>
  )
}
