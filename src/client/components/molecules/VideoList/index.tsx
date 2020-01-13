import * as React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { connectionsSelector } from '@client/selectors'
import { Video } from '@client/components/atoms'
import { SelfVideo } from '@client/components/molecules'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const VideoBox = styled.div`
  width: 100%;
`

export const VideoList: React.FC = () => {
  const { streams } = useSelector(connectionsSelector)

  return (
    <Container>
      <VideoBox>
        <SelfVideo />
      </VideoBox>
      {streams.map(({ stream }) => (
        <VideoBox key={stream.id}>
          <Video srcObject={stream} />
        </VideoBox>
      ))}
    </Container>
  )
}
