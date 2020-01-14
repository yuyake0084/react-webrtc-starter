import * as React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { connectionsSelector } from '@client/selectors'
import { Video } from '@client/components/atoms'
import { SelfVideo } from '@client/components/molecules'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
`

const VideoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98%;
  height: 100%;
  min-height: 200px;
  background-color: #000;
  border-radius: 8px;
  margin: 1%;
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
